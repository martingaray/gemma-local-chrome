import { loadSettings, saveSettings } from '../src/settings.js';
import { t, initLocale, setLocale, getLocale, applyLocale } from '../src/i18n.js';

const $ = (id) => document.getElementById(id);

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

const STYLES = ['default', 'professional', 'friendly', 'candid', 'quirky', 'efficient', 'cynical'];
const LEVELS = ['more', 'default', 'less'];
const CHARACTERISTICS = ['warm', 'enthusiastic', 'emoji', 'lists'];

const fillSelects = () => {
  const fill = (el, values, prefix) => {
    const current = el.value;
    el.innerHTML = '';
    for (const v of values) {
      const opt = document.createElement('option');
      opt.value = v;
      opt.textContent = t(`${prefix}_${v}`);
      el.appendChild(opt);
    }
    if (current) el.value = current;
  };
  fill($('style'), STYLES, 'style');
  for (const c of CHARACTERISTICS) fill($(c), LEVELS, 'level');
};

const setStatus = (text) => {
  $('status').hidden = !text;
  $('status').textContent = text || '';
};

$('save-btn').addEventListener('click', lockButton($('save-btn'), async () => {
  await saveSettings({
    style: $('style').value,
    warm: $('warm').value,
    enthusiastic: $('enthusiastic').value,
    emoji: $('emoji').value,
    lists: $('lists').value,
    custom: $('custom').value,
  });
  setStatus(t('saved'));
}));

const markActiveLang = () => {
  $('lang-en').classList.toggle('active', getLocale() === 'en');
  $('lang-es').classList.toggle('active', getLocale() === 'es');
};

for (const l of ['en', 'es']) {
  const btn = $(`lang-${l}`);
  btn.addEventListener('click', lockButton(btn, async () => {
    await setLocale(l);
    applyLocale();
    fillSelects();
    markActiveLang();
  }));
}

initLocale().then(async () => {
  applyLocale();
  fillSelects();
  markActiveLang();
  const s = await loadSettings();
  $('style').value = s.style;
  for (const c of CHARACTERISTICS) $(c).value = s[c];
  $('custom').value = s.custom;
});
