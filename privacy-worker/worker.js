const HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Privacy Policy - Testportal EZ 67</title>
<style>
  :root {
    --bg: #0a0a14;
    --bg2: #12121f;
    --card: rgba(28, 28, 48, 0.7);
    --text: #f8fafc;
    --muted: #a1a1b8;
    --accent: #a855f7;
    --accent2: #ec4899;
    --border: rgba(255,255,255,0.08);
  }
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body {
    font-family: 'Segoe UI', -apple-system, BlinkMacSystemFont, sans-serif;
    background:
      radial-gradient(circle at 0% 0%, rgba(124, 58, 237, 0.18), transparent 45%),
      radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.12), transparent 45%),
      linear-gradient(160deg, var(--bg), var(--bg2));
    color: var(--text);
    min-height: 100vh;
    line-height: 1.65;
    padding: 40px 20px;
  }
  main {
    max-width: 760px;
    margin: 0 auto;
    background: var(--card);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 40px;
    backdrop-filter: blur(10px);
  }
  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 12px;
  }
  .logo {
    width: 52px;
    height: 52px;
    border-radius: 12px;
    background: linear-gradient(135deg, var(--accent), var(--accent2));
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: 700;
    font-size: 16px;
    box-shadow: 0 0 24px rgba(168, 85, 247, 0.35);
    flex-shrink: 0;
    flex-direction: column;
    line-height: 1;
  }
  .logo small { font-size: 10px; font-family: monospace; opacity: 0.85; margin-top: 2px; }
  h1 {
    font-size: 28px;
    background: linear-gradient(135deg, #fff, var(--accent));
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
  }
  .updated {
    color: var(--muted);
    font-size: 14px;
    margin-bottom: 32px;
    font-family: monospace;
  }
  h2 {
    font-size: 18px;
    color: var(--accent);
    margin: 32px 0 12px;
    letter-spacing: -0.2px;
  }
  p { color: var(--muted); margin-bottom: 14px; }
  ul { color: var(--muted); margin: 12px 0 16px 22px; }
  li { margin-bottom: 6px; }
  code {
    background: rgba(168, 85, 247, 0.15);
    color: #e9d5ff;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
    font-family: 'JetBrains Mono', 'Consolas', monospace;
  }
  a { color: var(--accent2); text-decoration: none; font-weight: 500; }
  a:hover { text-decoration: underline; }
  .summary {
    background: linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.06));
    border: 1px solid rgba(124, 58, 237, 0.22);
    border-radius: 10px;
    padding: 18px 22px;
    margin: 16px 0 24px;
  }
  footer {
    margin-top: 40px;
    padding-top: 24px;
    border-top: 1px solid var(--border);
    color: var(--muted);
    font-size: 13px;
    text-align: center;
  }
</style>
</head>
<body>
<main>
  <div class="header">
    <div class="logo">EZ<small>67</small></div>
    <h1>Privacy Policy</h1>
  </div>
  <p class="updated">Testportal EZ 67 &middot; Last updated: 2026-05-27</p>

  <div class="summary">
    <strong>Summary:</strong> the Extension does not collect, store, transmit, or sell any
    personal data to its developer or any third party other than the AI provider URL the user
    explicitly configures. Settings, including API keys, live only in the user's own browser
    storage. There are no analytics, telemetry, or remote servers operated by the developer.
  </div>

  <h2>What the Extension stores locally</h2>
  <p>The Extension stores the following items in <code>chrome.storage</code> on the user's device:</p>
  <ul>
    <li>The selected AI provider (OpenAI, Google Gemini, or OpenRouter).</li>
    <li>The user's API key for each provider, supplied by the user.</li>
    <li>The selected AI model.</li>
    <li>An optional custom OpenAI base URL, supplied by the user.</li>
    <li>Optional study context: free-form text and references to user-uploaded files inside an OpenAI vector store the user owns.</li>
    <li>Visual preferences such as auto-solve button visibility.</li>
  </ul>
  <p>This data never leaves the user's device through the Extension. It is synchronized between the user's own browser instances if the browser's built-in sync feature is enabled by the user.</p>

  <h2>What the Extension sends to AI providers</h2>
  <p>When the user clicks <strong>Test API key</strong> or <strong>Auto-solve</strong>, the Extension sends:</p>
  <ul>
    <li>The text of the question (and any embedded images).</li>
    <li>The optional study context the user attached.</li>
    <li>The user's API key, used solely for authentication with the chosen provider.</li>
  </ul>
  <p>These requests are sent only to:</p>
  <ul>
    <li><code>https://api.openai.com</code> (or the custom OpenAI base URL the user enters)</li>
    <li><code>https://generativelanguage.googleapis.com</code> (Google Gemini)</li>
    <li><code>https://openrouter.ai</code> (OpenRouter)</li>
  </ul>
  <p>The handling of that data after it reaches the AI provider is governed by that provider's privacy policy:</p>
  <ul>
    <li><a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener">OpenAI</a></li>
    <li><a href="https://policies.google.com/privacy" target="_blank" rel="noopener">Google Gemini</a></li>
    <li><a href="https://openrouter.ai/privacy" target="_blank" rel="noopener">OpenRouter</a></li>
  </ul>

  <h2>What the Extension does NOT do</h2>
  <ul>
    <li>It does not read pages other than Testportal and Moodle quiz pages.</li>
    <li>It does not collect browsing history.</li>
    <li>It does not read or transmit information about your other extensions or installed apps.</li>
    <li>It does not include analytics SDKs or trackers.</li>
    <li>It does not download or execute remote code.</li>
  </ul>

  <h2>Children's privacy</h2>
  <p>The Extension is not directed at children under 13.</p>

  <h2>Contact</h2>
  <p>Questions about this policy can be raised through the project's public repository. No personal contact information is required to use the Extension.</p>

  <h2>Changes</h2>
  <p>If this policy changes, the updated version will be published at the same URL with an updated &quot;Last updated&quot; date.</p>

  <footer>
    Testportal EZ 67 is an independent project and is not affiliated with Testportal, Moodle, OpenAI, Google, or OpenRouter.
  </footer>
</main>
</body>
</html>`;

export default {
    async fetch(request) {
        const url = new URL(request.url);
        if (url.pathname === "/privacy.txt") {
            return new Response(HTML.replace(/<[^>]+>/g, ""), {
                headers: { "Content-Type": "text/plain; charset=utf-8" }
            });
        }
        return new Response(HTML, {
            headers: {
                "Content-Type": "text/html; charset=utf-8",
                "Cache-Control": "public, max-age=300"
            }
        });
    }
};
