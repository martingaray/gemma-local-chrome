# Gemma Local Chrome — Un agente de IA en Chrome, 100% local

Chat with **Gemma (Gemini Nano)** in a Chrome side panel — the same experience
as Gemini or Claude in your browser, except **nothing ever leaves your
machine**: no server, no API keys, no cost per message, and it works offline.

Chrome already ships a small LLM inside the browser (Gemini Nano, exposed via
the [Prompt API](https://developer.chrome.com/docs/ai/built-in)). This
extension turns it into a full chat agent: streaming replies, conversation
memory, English/Spanish UI, and a system prompt you can adapt.

> **Try this:** disconnect from the internet and keep chatting. It just works.

## Features

- 💬 Chat UI with streaming responses and conversation history (per session)
- 🔒 100% on-device — your messages never leave the computer
- 🌐 EN/ES interface with persisted language preference
- ⚡ No model download on first use — Gemini Nano ships with Chrome
- 🧩 Vanilla JS, Manifest V3, no build step, ~300 lines of code

## Install

**Non-technical users:** follow the step-by-step guide with screenshots-level
detail — [docs/INSTALL.md](docs/INSTALL.md) ·
[docs/INSTALACION.md](docs/INSTALACION.md) (español). It also covers the
one-time Chrome AI configuration.

**Quick version (developers):**

1. Clone this repo (or download the ZIP).
2. Open `chrome://extensions`, enable **Developer mode**.
3. **Load unpacked** → select the folder.
4. Click the extension icon → the side panel opens. Chat away.

Requires a recent desktop Chrome with built-in AI. If you see "not available",
enable `chrome://flags/#prompt-api-for-gemini-nano` and restart Chrome.

## How it works

- `src/llm.js` — Gemini Nano session via `LanguageModel.create()` with a
  system prompt, declared input/output languages, and `promptStreaming()` for
  token-by-token rendering. The session object keeps the chat history; "New
  chat" destroys and recreates it.
- `src/i18n.js` — lightweight EN/ES i18n persisted in `chrome.storage.local`.
- `sidepanel/` — the chat UI (MV3 side panel, no frameworks).

## Documentation

[docs/HELP.md](docs/HELP.md) · [docs/AYUDA.md](docs/AYUDA.md) (español)

## Author

**Martín Garay** — data-driven business, analytics & AI-powered SEO.

- Web: [martingaray.com.ar](https://www.martingaray.com.ar/?utm_source=github&utm_medium=gemma-local-chrome&utm_content=demo)
- LinkedIn: [linkedin.com/in/martingaray](https://www.linkedin.com/in/martingaray/)

## License

MIT — see [LICENSE](LICENSE).
