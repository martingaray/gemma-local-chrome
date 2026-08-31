# Help — Gemma Local Chrome

> Español: [AYUDA.md](AYUDA.md)

> **Disclaimer:** this extension is a usage example of Chrome's built-in AI.
> Gemma is a small on-device model — helpful and fast, but far less capable
> than cloud models. Verify anything important.

## What is it?

A chat agent living in Chrome's side panel, powered by **Gemini Nano** — the
LLM Google ships inside Chrome. Unlike Gemini or Claude in the browser, the
model runs **on your machine**: no account, no API keys, no cost, and your
conversations never leave the computer. Disconnect from the internet and it
keeps working.

## Controls

| Control | What it does |
|---|---|
| **Message box** | Enter sends, Shift+Enter adds a new line. |
| **Send** | Sends your message; the reply streams in token by token. |
| **Include the current page as context** | When checked, the text of the active tab travels with your message (asked per-site the first time; the page is only re-sent when the URL changes). Uncheck for context-free chat. |
| **↻ Clear and restart** | Round button next to Send: clears the conversation and starts a fresh session (the model forgets everything said). |
| **Context ring** | Donut indicator showing how much of the model's context window the conversation has used (green → amber → red). |
| **🇺🇸 / 🇦🇷** | Interface + reply language; also restarts the conversation. Remembered across sessions. |

## Pro tips & example prompts

Gemma is a small on-device model: it shines when you give it **one clear task
per message** and an **explicit output format**.

### With page context ON (default)

| Goal | Prompt |
|---|---|
| Summarize | `Summarize this page in 5 bullet points` |
| Extract data | `List every price mentioned on this page, one per line` |
| Explain | `Explain this article like I'm 12` |
| Translate | `Translate the main content of this page to Spanish` |
| Evaluate | `What questions does this page leave unanswered?` |
| Draft | `Write a 2-line LinkedIn post recommending this article` |

The page is captured when you send the message — navigate first, then ask.
On long pages only the first ~12,000 characters are included.

### Without page context (uncheck the box)

General assistant use: `give me 10 name ideas for a coffee blog`,
`rewrite this paragraph in a friendly tone: …`, `explain what an embedding is`.

### Getting better answers from a small model

- **One task per message** — chain follow-ups instead of mega-prompts.
- **Ask for the format**: "as a table", "in 3 bullets", "one line".
- **Start a New chat when you switch topics** — it frees the context window
  and avoids confusion with earlier pages.
- **Iterate**: "shorter", "more formal", "now in English" work great because
  the session remembers the conversation.
- If a reply comes out in the wrong language, switch the flag (🇺🇸/🇦🇷) — it
  also sets the model's output language.

## Shaping Gemma's tone: Personalization

Open **menu ☰ → Settings**. Everything here changes *how* Gemma talks, not
*what* it can do. Settings apply from the **next chat** — press ↻ after saving.

### Base style and tone — option by option

| Option | What it does | Use it when |
|---|---|---|
| **Default** | No style instruction; the model's natural voice. | You have no strong preference. |
| **Professional** | Polished, precise wording; no slang. | Work contexts, client-facing drafts. |
| **Friendly** | Warm, chatty, first-name energy. | Casual use, brainstorming company. |
| **Candid** | Direct and encouraging; says things straight. | You want honest, actionable takes. |
| **Quirky** | Playful, imaginative angles. | Creative work, naming, ideation. |
| **Efficient** | Shortest useful answer; zero filler. | Quick lookups, repeated workflows. |
| **Cynical** | Critical, lightly sarcastic, still helpful. | Stress-testing ideas, devil's advocate. |

### Characteristics — what More / Less actually do

| Characteristic | More | Less |
|---|---|---|
| **Warm** | Notably personable and empathetic. | Neutral, matter-of-fact tone. |
| **Enthusiastic** | Shows excitement about your topics. | No exclamations, no hype. |
| **Emoji** | Uses emoji where they help. | Never uses emoji. |
| **Headers & lists** | Structures answers with headers/bullets. | Flowing prose instead of lists. |

`Default` leaves that trait to the base style.

### Custom instructions — template library

Copy one into **Custom instructions**, adapt, save, then ↻. Combine one
*role* with one *behavior rule* for best results.

**Educator**
```
Act as a patient educator. Explain concepts step by step, from simple to
complex, with one everyday analogy per concept. End each answer with a
question that checks my understanding.
```

**Critical & objective reviewer**
```
Be critical and objective. Before agreeing, validate my observations against
the evidence available. If my claim is weak, say exactly why and what would
make it stronger. Never accept an idea just because it is mine.
```

**No flattery (anti-sycophancy)**
```
Do not flatter me and do not be complacent. I want an assistant that makes
my work better, not a follower that treats my ideas as valid by default.
Challenge assumptions, point out errors bluntly, and propose the stronger
alternative when you see one.
```

**Developer**
```
Act as a senior software developer. Prefer minimal working solutions, show
code before prose, name the trade-offs of each approach, and flag security
or performance issues even if I didn't ask.
```

**Designer**
```
Act as a product/UI designer. Reason about hierarchy, contrast, spacing and
accessibility. Critique before praising: what confuses the user first? Always
suggest one concrete improvement with an example.
```

**Copywriter**
```
Act as a copywriter. Offer 3 variants per request (direct, creative,
minimal), keep sentences short, cut adjectives, and adapt tone to the
audience I name. Ask for the audience if I forget it.
```

**Manager**
```
Act as a pragmatic manager. Push me to define goal, owner and deadline for
every idea. Summarize decisions in one line, list risks, and ask what we are
NOT going to do to protect focus.
```

## The processing log

While Gemma prepares or thinks, a **Processing log** appears under the status
line. It shows in real time what is happening on your machine: page capture
and its size, model download %, prompt size, time to first token, chunks
streamed, and how full the context window is after each reply. Useful to
understand latency and to see exactly what was (and wasn't) sent to the model.

## Notes

- The conversation lives in the model session: closing the panel or clicking
  New chat clears it. Nothing is stored.
- If you see "Gemini Nano is not available": use a recent desktop Chrome and
  enable `chrome://flags/#prompt-api-for-gemini-nano`, then restart.
- Sources: [Prompt API docs](https://developer.chrome.com/docs/ai/built-in) ·
  [spec](https://github.com/webmachinelearning/prompt-api).
