/**
 * Captures the content of the active tab as chat context.
 * Per-origin access is requested on first use (user gesture required).
 */

const MAX_CONTEXT_CHARS = 12000; // keep well within Gemini Nano's context window

export const getPageContext = async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab || !/^https?:/.test(tab.url || '')) return null;

  const origin = new URL(tab.url).origin + '/*';
  const granted = await chrome.permissions.contains({ origins: [origin] }) ||
    await chrome.permissions.request({ origins: [origin] });
  if (!granted) return null;

  const [{ result }] = await chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => ({
      title: document.title,
      url: location.href,
      text: (document.body?.innerText || '').replace(/\s+/g, ' ').trim(),
    }),
  });
  if (!result) return null;
  return { ...result, text: result.text.slice(0, MAX_CONTEXT_CHARS) };
};

/** Wraps the user message with the page context block the model understands. */
export const withPageContext = (ctx, userText) =>
  `[Page context]\nTitle: ${ctx.title}\nURL: ${ctx.url}\nContent: ${ctx.text}\n[End of page context]\n\n${userText}`;
