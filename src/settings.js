/**
 * Personalization settings, persisted in chrome.storage.local ('settings').
 * They shape the system prompt built in llm.js; changing them takes effect
 * on the next session (new chat / next page load).
 */

export const DEFAULTS = {
  style: 'default',       // default | professional | friendly | candid | quirky | efficient | cynical
  warm: 'default',        // more | default | less
  enthusiastic: 'default',
  emoji: 'default',
  lists: 'default',
  custom: '',             // free-form custom instructions
};

export const loadSettings = async () => {
  try {
    const stored = (await chrome.storage.local.get('settings')).settings;
    return { ...DEFAULTS, ...(stored || {}) };
  } catch {
    return { ...DEFAULTS };
  }
};

export const saveSettings = async (settings) => {
  try {
    await chrome.storage.local.set({ settings });
  } catch { /* outside extension context */ }
};

const STYLE = {
  professional: {
    en: 'Use a polished, precise, professional tone.',
    es: 'Usá un tono pulido, preciso y profesional.',
  },
  friendly: {
    en: 'Use a warm, chatty, friendly tone.',
    es: 'Usá un tono cálido, conversador y amigable.',
  },
  candid: {
    en: 'Be direct and encouraging; say things straight.',
    es: 'Sé directa y alentadora; decí las cosas sin vueltas.',
  },
  quirky: {
    en: 'Be playful and imaginative in your answers.',
    es: 'Sé juguetona e imaginativa en tus respuestas.',
  },
  efficient: {
    en: 'Be concise and plain; shortest useful answer wins.',
    es: 'Sé concisa y simple; gana la respuesta útil más corta.',
  },
  cynical: {
    en: 'Be critical and lightly sarcastic, but stay helpful.',
    es: 'Sé crítica y levemente sarcástica, pero siempre útil.',
  },
};

const CHARACTERISTIC = {
  warm: {
    more: { en: 'Be notably warm and personable.', es: 'Sé notablemente cálida y cercana.' },
    less: { en: 'Keep a neutral, factual tone.', es: 'Mantené un tono neutro y factual.' },
  },
  enthusiastic: {
    more: { en: 'Show enthusiasm in your replies.', es: 'Mostrá entusiasmo en tus respuestas.' },
    less: { en: 'Avoid exclamations and hype.', es: 'Evitá exclamaciones y efusividad.' },
  },
  emoji: {
    more: { en: 'Use emoji freely where they help.', es: 'Usá emojis con libertad cuando sumen.' },
    less: { en: 'Do not use emoji.', es: 'No uses emojis.' },
  },
  lists: {
    more: { en: 'Prefer headers and bullet lists to structure answers.', es: 'Preferí títulos y listas para estructurar respuestas.' },
    less: { en: 'Prefer flowing prose over lists and headers.', es: 'Preferí prosa corrida en vez de listas y títulos.' },
  },
};

/** Builds the personalization block appended to the base system prompt. */
export const personalizationPrompt = (settings, lang) => {
  const parts = [];
  const style = STYLE[settings.style];
  if (style) parts.push(style[lang]);
  for (const key of ['warm', 'enthusiastic', 'emoji', 'lists']) {
    const mod = CHARACTERISTIC[key][settings[key]];
    if (mod) parts.push(mod[lang]);
  }
  if (settings.custom.trim()) {
    parts.push((lang === 'es' ? 'Instrucciones del usuario: ' : 'User instructions: ') + settings.custom.trim());
  }
  return parts.join(' ');
};
