# Step-by-step install (no technical knowledge needed)

> Español: [INSTALACION.md](INSTALACION.md)

No coding required. Ten minutes, once.

## What you need

- **An up-to-date Google Chrome** on a desktop computer (Windows, Mac or
  Linux). It does not work on phones.
- About **22 GB of free disk** the first time (Chrome downloads the AI model
  once and shares it across the whole browser).

## Part 1 — Download the extension

1. Open the project page:
   **https://github.com/martingaray/gemma-local-chrome**
2. Click the green **`<> Code`** button (top right of the file list).
3. Choose **Download ZIP**. A file named `gemma-local-chrome-main.zip`
   is downloaded.
4. Open your Downloads folder and **unzip it** (double click on Mac;
   right click → "Extract all…" on Windows). You get a folder named
   `gemma-local-chrome-main`.
5. Move it somewhere stable (Documents, for example). **Don't delete it
   later**: Chrome reads it every time the extension opens.

## Part 2 — Load it in Chrome

1. Open Chrome and type in the address bar: `chrome://extensions`, then Enter.
2. Turn on the **"Developer mode"** switch (top right).
3. A new toolbar appears. Click **"Load unpacked"**.
4. Select the `gemma-local-chrome-main` folder you saved in Part 1.
5. Done: the **"Gemma Local Chrome — Local AI Agent"** card appears.
6. Recommended: click the puzzle icon 🧩 (right of the address bar) and the
   pin 📌 next to Gemma Local Chrome to keep it handy.

## Part 3 — Configure Chrome's AI (once)

Chrome ships the local AI (Gemini Nano) but it may come disabled:

1. Type in the address bar:
   `chrome://flags/#prompt-api-for-gemini-nano` and Enter.
2. On the highlighted **"Prompt API for Gemini Nano"** option, switch
   `Default` to **`Enabled`**.
3. Click the blue **"Relaunch"** button to restart Chrome.
4. (Only if the extension later says "not available") Type
   `chrome://components`, find **"Optimization Guide On Device Model"** and
   click **"Check for update"**. That's the model download; it can take a
   few minutes.

## Part 4 — Use it

1. Click the extension icon (or 🧩 → Gemma Local Chrome).
2. The chat side panel opens. Type your first question and press Enter.
3. The first reply may take a bit longer (the model is warming up); after
   that it's immediate.

## Trouble?

- **"Gemini Nano is not available"** → repeat Part 3 fully and check Chrome
  is up to date (`chrome://settings/help`).
- **The panel doesn't open** → `chrome://extensions` → ↻ button on the
  extension card.
- More help: [HELP.md](HELP.md).
