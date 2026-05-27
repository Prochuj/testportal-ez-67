# Testportal EZ 67

AI study assistant for Testportal and Moodle quizzes, plus the supporting
infrastructure that makes it work in restricted networks. Three projects in
one repository.

## Repository layout

| Folder | What it is |
|---|---|
| [`extension/`](./extension) | The browser extension itself (Plasmo + React + TypeScript). Builds an unpacked Chrome MV3 extension. |
| [`proxy-worker/`](./proxy-worker) | A Cloudflare Worker that reverse-proxies `api.openai.com`. Use it as the **Custom OpenAI base URL** in the extension when the OpenAI domain is blocked on your network. |
| [`privacy-worker/`](./privacy-worker) | A Cloudflare Worker that serves the extension's privacy policy as a styled HTML page. The URL is referenced from the Edge Add-ons store listing. |

## Quick start - extension

```bash
cd extension
npm install
npm run build
```

Load `extension/build/chrome-mv3-prod/` as an unpacked extension in
`chrome://extensions` (Developer mode → Load unpacked).

## Quick start - workers

```bash
cd proxy-worker      # or privacy-worker
npm install
npx wrangler login
npx wrangler deploy
```

You will need a free Cloudflare account.

## Features (extension)

- Three AI providers: OpenAI, Google Gemini, OpenRouter (gateway to Claude,
  DeepSeek, Grok, Llama, Qwen, Mistral, and more).
- Bring-your-own API key. Keys live only in `chrome.storage` on your
  machine; nothing is sent to any server operated by this project.
- Vision support for image-based questions.
- **Custom OpenAI base URL**: route OpenAI traffic through your own reverse
  proxy. The included `proxy-worker/` is a one-file Cloudflare Worker that
  does exactly this.
- Optional context manager: attach text and files (PDF, DOCX, TXT) to a
  context that the extension uses as reference material when answering.
  Backed by an OpenAI vector store inside your own account.
- Stealth mode: visible / barely visible / hidden helper button.
- Anti-anti-tampering for Testportal practice runs.
- Polish and English UI based on browser locale.

## Privacy

The extension does not collect, store, transmit, or sell any user data to
this project's developer or to any third party other than the AI provider
URL the user explicitly configures. See the
[full privacy policy](https://testportal-ez-67-privacy.prochpawel4.workers.dev).

## Disclaimer

This project is independent and is not affiliated with Testportal, Moodle,
OpenAI, Google, or OpenRouter. The extension is intended for self-study and
practice; the authors take no responsibility for misuse.

## License

[MIT](./LICENSE).
