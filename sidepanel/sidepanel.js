import { availability, streamReply, resetSession, getUsage, listModels } from '../src/llm.js';
import { getPageContext, withPageContext } from '../src/page-context.js';
import { createDonut } from '../src/donut.js';
import { t, initLocale, setLocale, getLocale, applyLocale } from '../src/i18n.js';

const $ = (id) => document.getElementById(id);
const chatEl = $('chat');
const inputEl = $('input');
const sendBtn = $('send-btn');
const newChatBtn = $('new-chat-btn');
const progressEl = $('progress');

/** Anti rage-click: locks a button for the whole duration of its handler. */
const lockButton = (btn, fn) => async (...args) => {
  if (btn.disabled) return;
  btn.disabled = true;
  btn.classList.add('busy');
  try {
    await fn(...args);
  } finally {
    btn.disabled = false;
    btn.classList.remove('busy');
  }
};

const setStatus = (text) => {
  $('status').hidden = !text;
  $('status').textContent = text || '';
};

// --- Processing log: visible trace of what happens while Gemma "thinks" ---
let logStart = 0;
const logClear = () => {
  $('log').textContent = '';
  $('log-box').hidden = false;
  logStart = performance.now();
};
const log = (msg) => {
  const ms = Math.round(performance.now() - logStart);
  $('log').textContent += `+${String(ms).padStart(5)}ms  ${msg}\n`;
  $('log').scrollTop = $('log').scrollHeight;
};

const donut = createDonut({ size: 34, stroke: 4, label: 'Context window used' });
$('ctx-donut').appendChild(donut.el);

const updateUsage = () => {
  const u = getUsage();
  donut.set(u ? u.pct : 0);
};

const HELP_URLS = {
  en: 'https://github.com/martingaray/gemma-local-chrome/blob/main/docs/HELP.md',
  es: 'https://github.com/martingaray/gemma-local-chrome/blob/main/docs/AYUDA.md',
};
const updateHelpLink = () => {
  $('help-link').href = HELP_URLS[getLocale()];
};

const addBubble = (role, text) => {
  const div = document.createElement('div');
  div.className = `msg ${role}`;
  div.textContent = text;
  chatEl.appendChild(div);
  chatEl.scrollTop = chatEl.scrollHeight;
  return div;
};

const showWelcome = () => {
  chatEl.innerHTML = '';
  addBubble('ai', t('welcome'));
};

let lastContextUrl = null; // avoid resending the same page in every message

const send = async () => {
  const text = inputEl.value.trim();
  if (!text) return;
  inputEl.value = '';
  addBubble('user', text);
  logClear();
  log(`message: ${text.length} chars`);

  let promptText = text;
  if ($('include-page').checked) {
    try {
      log('capturing active tab…');
      const ctx = await getPageContext();
      if (ctx && ctx.url !== lastContextUrl) {
        promptText = withPageContext(ctx, text);
        lastContextUrl = ctx.url;
        setStatus(`📄 ${ctx.title}`.slice(0, 80));
        log(`page context attached: "${ctx.title}" (${ctx.text.length} chars)`);
      } else if (ctx) {
        log('same page as before — context already in session, not re-sent');
      } else {
        log('no page context (non-http page or access not granted)');
      }
    } catch (e) {
      log(`page context failed: ${e.message} — continuing without it`);
    }
  } else {
    log('page context off');
  }

  const bubble = addBubble('ai', '…');
  setStatus(t('thinking'));
  log(`prompt sent: ${promptText.length} chars — waiting for first token…`);
  let firstToken = true;
  let chunks = 0;
  try {
    const reply = await streamReply(
      promptText,
      (full) => {
        if (firstToken) {
          firstToken = false;
          log('first token received — streaming…');
        }
        chunks += 1;
        bubble.textContent = full;
        chatEl.scrollTop = chatEl.scrollHeight;
      },
      (p) => {
        progressEl.hidden = false;
        progressEl.value = p;
        setStatus(t('downloading'));
        log(`model download: ${Math.round(p * 100)}%`);
      },
    );
    log(`done: ${reply.length} chars in ${chunks} chunks`);
    const u = getUsage();
    if (u) log(`context window: ${u.usage}/${u.quota} tokens (${Math.round(u.pct)}%)`);
    setStatus('');
  } catch (e) {
    log(`error: ${e.message}`);
    bubble.textContent = `Error: ${e.message}`;
    bubble.classList.add('error');
    setStatus('');
  } finally {
    progressEl.hidden = true;
    updateUsage();
    inputEl.focus();
  }
};

sendBtn.addEventListener('click', lockButton(sendBtn, send));

inputEl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendBtn.click();
  }
});

newChatBtn.addEventListener('click', lockButton(newChatBtn, async () => {
  resetSession();
  lastContextUrl = null;
  showWelcome();
  updateUsage();
  setStatus(t('newChatDone'));
  inputEl.focus();
}));

// --- Header: menu + language ---
$('menu-btn').addEventListener('click', () => {
  $('drawer').hidden = !$('drawer').hidden;
});

const markActiveLang = () => {
  $('lang-en').classList.toggle('active', getLocale() === 'en');
  $('lang-es').classList.toggle('active', getLocale() === 'es');
};

for (const l of ['en', 'es']) {
  const btn = $(`lang-${l}`);
  btn.addEventListener('click', lockButton(btn, async () => {
    await setLocale(l);
    applyLocale();
    markActiveLang();
    resetSession(); // system prompt and output language follow the locale
    lastContextUrl = null;
    showWelcome();
    updateUsage();
    updateHelpLink();
  }));
}

initLocale().then(async () => {
  applyLocale();
  markActiveLang();
  updateHelpLink();
  showWelcome();
  const state = await availability();
  if (state === 'unavailable') {
    setStatus(t('notAvailable'));
    sendBtn.disabled = true;
  }
  // Model selector: shown only when more than one local model is available.
  const models = await listModels();
  const select = $('model-select');
  for (const m of models) {
    const opt = document.createElement('option');
    opt.value = m.id;
    opt.textContent = m.label;
    select.appendChild(opt);
  }
  select.hidden = models.length <= 1;
  select.addEventListener('change', () => {
    resetSession();
    lastContextUrl = null;
    showWelcome();
    updateUsage();
  });
  inputEl.focus();
});
