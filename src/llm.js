/**
 * Gemini Nano chat session (Prompt API).
 * The session keeps the conversation history internally; "new chat" destroys it.
 * Output language is declared per UI locale (required by Chrome).
 */
import { getLocale } from './i18n.js';
import { loadSettings, personalizationPrompt } from './settings.js';

const SYSTEM = {
  en: 'You are Gemma, a helpful AI agent running 100% locally inside Google Chrome. Be concise, warm and practical. Answer in English unless the user asks otherwise. When a [Page context] block is included in a message, it contains the title, URL and text of the page the user is currently viewing in the browser — use it to answer questions about that page.',
  es: 'Sos Gemma, un agente de IA útil que corre 100% local dentro de Google Chrome. Sé concisa, cálida y práctica. Respondé en español salvo que el usuario pida otro idioma. Cuando un mensaje incluya un bloque [Page context], contiene el título, URL y texto de la página que el usuario está viendo en el navegador — usalo para responder preguntas sobre esa página.',
};

let session = null;
let sessionLang = null;

export const availability = async () => {
  if (!('LanguageModel' in self)) return 'unavailable';
  return self.LanguageModel.availability();
};

export const ensureSession = async (onProgress = () => {}) => {
  const lang = getLocale();
  if (session && sessionLang === lang) return session;
  session?.destroy();
  const settings = await loadSettings();
  const system = [SYSTEM[lang], personalizationPrompt(settings, lang)]
    .filter(Boolean).join(' ');
  session = await self.LanguageModel.create({
    initialPrompts: [{ role: 'system', content: system }],
    expectedInputs: [{ type: 'text', languages: ['en', 'es'] }],
    expectedOutputs: [{ type: 'text', languages: [lang] }],
    monitor(m) {
      m.addEventListener('downloadprogress', (e) => onProgress(e.loaded));
    },
  });
  sessionLang = lang;
  return session;
};

/** Streams a reply; onChunk receives the accumulated text on every chunk. */
export const streamReply = async (text, onChunk, onProgress = () => {}) => {
  const s = await ensureSession(onProgress);
  const stream = s.promptStreaming(text);
  let full = '';
  for await (const chunk of stream) {
    full += chunk;
    onChunk(full);
  }
  return full;
};

export const resetSession = () => {
  session?.destroy();
  session = null;
  sessionLang = null;
};

/** Context-window usage of the live session, as {usage, quota, pct} or null. */
export const getUsage = () => {
  if (!session || !session.inputQuota) return null;
  const usage = session.inputUsage ?? 0;
  return { usage, quota: session.inputQuota, pct: (usage / session.inputQuota) * 100 };
};

/**
 * Local models roster. Today Chrome exposes a single built-in text model
 * (Gemini Nano via LanguageModel); the list is future-proof for when more
 * become available. Each entry is probed before being offered.
 */
export const listModels = async () => {
  const candidates = [
    { id: 'gemini-nano', label: 'Gemma · Gemini Nano', probe: availability },
  ];
  const found = [];
  for (const m of candidates) {
    try {
      if ((await m.probe()) !== 'unavailable') found.push({ id: m.id, label: m.label });
    } catch { /* not available */ }
  }
  return found;
};
