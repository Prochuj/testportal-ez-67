# Testportal EZ 67

AI study assistant for Testportal and Moodle quizzes. Bring your own OpenAI,
Gemini, or OpenRouter key — the extension sends the question to the model
of your choice and shows the explanation alongside.

> Source code, extension package, and the small Cloudflare Workers that back
> it. Nothing here needs to be deployed by you — the workers are already live
> and the extension just talks to them. The repo is here so you can read what
> you're installing.

## Install

**Edge Add-ons** (recommended once review is done): _link will go here after publishing_

**Manual install** (works in Chrome, Edge, Brave, Opera):

1. Download the latest ZIP from
   [Releases](https://github.com/Prochuj/testportal-ez-67/releases) — or
   build it yourself from [`extension/`](./extension).
2. Open `chrome://extensions` (or `edge://extensions`), enable **Developer
   mode**, click **Load unpacked**, point it at the unzipped folder.
3. Click the EZ 67 icon, paste your API key for the provider you want to
   use, save. That's it.

## How it works

Click on the extension icon to open the popup:

- **AI provider** — OpenAI, Google Gemini, or OpenRouter (gateway to Claude,
  DeepSeek, Grok, Llama, Qwen, Mistral and more).
- **API key** — yours. Stored locally in `chrome.storage`. Each provider has
  its own slot, so switching providers doesn't wipe the others.
- **Custom OpenAI base URL** _(only for OpenAI)_ — if `api.openai.com` is
  blocked on your network, point this at a reverse proxy. A pre-deployed
  Cloudflare Worker is available for use:
  `https://openai-proxy.prochpawel4.workers.dev/v1`.
  The source is in [`proxy-worker/`](./proxy-worker) if you'd rather run
  your own.
- **Model** — list adapts to the provider you picked.

When you open a Testportal or Moodle quiz, an "Auto-solve" helper button
appears under each question. Click it, the question goes to your selected
provider, the AI answer comes back. Vision models work too — image-based
questions are sent as base64.

## Privacy

- API keys live only in your browser. They are never sent anywhere except
  the AI provider URL you configured.
- No analytics, no telemetry, no servers operated by this project that
  receive your data.
- The "Auto-solve" button only triggers on Testportal and on Moodle quiz
  pages (`document.body.id === "page-mod-quiz-attempt"`). Other tabs are
  ignored.

Full policy: <https://testportal-ez-67-privacy.prochpawel4.workers.dev>

## Repository layout

| Folder | What it is |
|---|---|
| [`extension/`](./extension) | The Plasmo + React + TypeScript extension. `npm install && npm run build` produces `build/chrome-mv3-prod/`. |
| [`proxy-worker/`](./proxy-worker) | Source of the OpenAI reverse proxy worker. Already deployed; only relevant if you want to self-host your own. |
| [`privacy-worker/`](./privacy-worker) | Source of the privacy policy page. Already deployed at the URL above. |

## Building the extension yourself

```bash
cd extension
npm install
npm run build
```

Output: `extension/build/chrome-mv3-prod/`. Load that as an unpacked
extension.

## Disclaimer

Independent project. Not affiliated with Testportal, Moodle, OpenAI,
Google, or OpenRouter. Use it for self-study and revision.

## License

[MIT](./LICENSE).
