/**
 * Minimal i18n (EN/ES). Locale persisted in chrome.storage.local ('locale').
 * Static texts: data-i18n / data-i18n-ph attributes. JS strings: t(key).
 */

const DICT = {
  en: {
    appTitle: 'Gemma Local Chrome',
    help: 'Help',
    website: "Author's website",
    composerPlaceholder: 'Ask Gemma',
    includePage: 'Include the current page as context',
    send: 'Send',
    resetChat: 'Clear and restart',
    contextUsed: 'Context window used',
    model: 'Model',
    welcome: 'Hi! I am Gemma, running 100% locally inside your Chrome. Nothing you write leaves this computer. What are we working on?',
    thinking: 'Thinking…',
    downloading: 'Preparing the local model…',
    notAvailable: 'Gemini Nano is not available in this Chrome. Use a recent desktop Chrome and enable the built-in AI (chrome://flags/#prompt-api-for-gemini-nano).',
    newChatDone: 'New conversation started.',
    footerLicense: 'MIT License',
    settings: 'Settings',
    personalization: 'Personalization',
    baseStyle: 'Base style and tone',
    baseStyleHint: "How Gemma responds to you. This doesn't change what it can do.",
    characteristics: 'Characteristics',
    warm: 'Warm',
    enthusiastic: 'Enthusiastic',
    emoji: 'Emoji',
    lists: 'Headers & lists',
    customInstructions: 'Custom instructions',
    customPh: 'e.g. Act as a digital marketing expert. Always give one concrete example.',
    save: 'Save',
    saved: 'Saved. It applies from the next chat (↻).',
    style_default: 'Default — preset style and tone',
    style_professional: 'Professional — polished and precise',
    style_friendly: 'Friendly — warm and chatty',
    style_candid: 'Candid — direct and encouraging',
    style_quirky: 'Quirky — playful and imaginative',
    style_efficient: 'Efficient — concise and plain',
    style_cynical: 'Cynical — critical and sarcastic',
    level_more: 'More',
    level_default: 'Default',
    level_less: 'Less',
    logLabel: 'Processing log',
  },
  es: {
    appTitle: 'Gemma Local Chrome',
    help: 'Ayuda',
    website: 'Web del Autor',
    composerPlaceholder: 'Preguntale a Gemma',
    includePage: 'Incluir la página actual como contexto',
    send: 'Enviar',
    resetChat: 'Borrar y Reiniciar',
    contextUsed: 'Ventana de contexto utilizada',
    model: 'Modelo',
    welcome: '¡Hola! Soy Gemma, corriendo 100% local dentro de tu Chrome. Nada de lo que escribas sale de esta computadora. ¿En qué trabajamos?',
    thinking: 'Pensando…',
    downloading: 'Preparando el modelo local…',
    notAvailable: 'Gemini Nano no está disponible en este Chrome. Usá un Chrome de escritorio reciente y activá la IA integrada (chrome://flags/#prompt-api-for-gemini-nano).',
    newChatDone: 'Nueva conversación iniciada.',
    footerLicense: 'Licencia MIT',
    settings: 'Configuración',
    personalization: 'Personalización',
    baseStyle: 'Estilo y tono base',
    baseStyleHint: 'Cómo te responde Gemma. No cambia sus capacidades.',
    characteristics: 'Características',
    warm: 'Calidez',
    enthusiastic: 'Entusiasmo',
    emoji: 'Emojis',
    lists: 'Títulos y listas',
    customInstructions: 'Instrucciones personalizadas',
    customPh: 'ej. Actuá como experto en marketing digital. Siempre dá un ejemplo concreto.',
    save: 'Guardar',
    saved: 'Guardado. Aplica desde el próximo chat (↻).',
    style_default: 'Default — estilo y tono predefinidos',
    style_professional: 'Profesional — pulido y preciso',
    style_friendly: 'Amigable — cálido y conversador',
    style_candid: 'Franco — directo y alentador',
    style_quirky: 'Original — juguetón e imaginativo',
    style_efficient: 'Eficiente — conciso y simple',
    style_cynical: 'Cínico — crítico y sarcástico',
    level_more: 'Más',
    level_default: 'Default',
    level_less: 'Menos',
    logLabel: 'Log de procesamiento',
  },
};

let locale = 'en';

export const t = (key) => DICT[locale][key] ?? DICT.en[key] ?? key;
export const getLocale = () => locale;

export const initLocale = async () => {
  let stored;
  try {
    stored = (await chrome.storage.local.get('locale')).locale;
  } catch { /* outside extension context */ }
  locale = stored === 'es' || stored === 'en'
    ? stored
    : (navigator.language || '').startsWith('es') ? 'es' : 'en';
  return locale;
};

export const setLocale = async (l) => {
  locale = l;
  try {
    await chrome.storage.local.set({ locale: l });
  } catch { /* outside extension context */ }
};

export const applyLocale = (root = document) => {
  for (const el of root.querySelectorAll('[data-i18n]')) {
    el.textContent = t(el.dataset.i18n);
  }
  for (const el of root.querySelectorAll('[data-i18n-ph]')) {
    el.placeholder = t(el.dataset.i18nPh);
  }
  for (const el of root.querySelectorAll('[data-i18n-title]')) {
    el.title = t(el.dataset.i18nTitle);
    el.setAttribute('aria-label', t(el.dataset.i18nTitle));
  }
};
