# Testportal EZ 67 - Edge Add-ons submission kit

Wszystko czego potrzebujesz do wypełnienia formularza w Microsoft Partner Center.

## Pliki do wgrania

- **Pakiet rozszerzenia (ZIP):** `..\build\testportal-ez-67-v1.0.0.zip`
- **Logo 300x300:** `logo-300x300.png`
- **Screenshoty 1280x800:** `screenshot-1.png`, `screenshot-2.png`, `screenshot-3.png`
- **Privacy policy:** patrz `PRIVACY-POLICY.md` (musisz to gdzieś hostować, np. GitHub Pages albo gist)

## Krok 1 - Konto deweloperskie

1. Wejdź: https://partner.microsoft.com/dashboard/microsoftedge/public/login
2. Zaloguj się kontem Microsoft (jeśli nie masz - załóż na hotmail/outlook).
3. Zarejestruj się jako Edge extension developer. **Bezpłatne**, tożsamość przez konto Microsoft - nie wymaga karty.
4. Wybierz typ konta: **Individual** (osoba prywatna) wystarczy, jest szybsze niż Company.
5. Możesz potrzebować potwierdzić email i numer telefonu.

## Krok 2 - Create new extension

W dashboardzie kliknij **Edge** → **Create new extension** → upload pliku `testportal-ez-67-v1.0.0.zip`.

## Krok 3 - Availability

- **Visibility:** Public (publiczne) lub Hidden jeśli chcesz mieć tylko link do dystrybucji wśród znajomych. **Polecam Hidden** dla pierwszej wersji - dostajesz link do podzielenia się, ale nikt z wyszukiwarki cię nie zgłosi.
- **Markets:** All markets (zostaw domyślne).

## Krok 4 - Properties

| Pole | Wartość |
|---|---|
| Category | **Productivity** |
| Website | (opcjonalne) twój profil GitHub lub puste |
| Support contact | twój email |
| Mature content | NIE zaznaczaj |

## Krok 5 - Privacy

### Single Purpose Description

```
Testportal EZ 67 is a study companion that helps students prepare for Testportal and Moodle quizzes by sending practice questions to a user-selected AI provider (OpenAI, Google Gemini, or OpenRouter) and showing the AI-generated explanation alongside the question. Users supply their own API keys, which are stored locally in the browser. The extension is designed for self-study and revision, not for live exam cheating.
```

### Permission justifications

| Permission | Justification (wpisz dokładnie tak) |
|---|---|
| `storage` | Used to persist user preferences locally: selected AI provider, the user's own API key for each provider, model selection, optional custom OpenAI base URL, and visual preferences such as button visibility. No data leaves the user's device through this permission. |
| `host_permissions: <all_urls>` | The extension injects a content script that adds an "Auto-solve" helper button on Testportal and Moodle pages. Moodle is self-hosted by thousands of universities and schools on arbitrary domains, so the extension cannot enumerate them in advance. The script only activates when it detects a Testportal page (testportal.pl/.net/.com) or a Moodle quiz page (`document.body.id === "page-mod-quiz-attempt"`). It does not read browsing history or other unrelated sites. |
| Background service worker | Fetches images embedded inside Moodle questions and converts them to base64 so they can be sent to vision-capable AI models. Without this, image-based questions cannot be analyzed because Moodle images are often behind authentication. |

### Are you using remote code?

**No, I am not using remote code.** All JavaScript is bundled into the extension package at build time. The extension only sends user-supplied prompts to AI provider APIs and receives text responses; it does not download or execute remote scripts.

### Data usage

What user data the extension collects:

- **Personally identifiable information:** No
- **Financial information:** No
- **Health information:** No
- **Authentication information:** Yes - the user pastes an API key (which is a credential for an AI service the user owns) into the popup. The key is stored only in `chrome.storage.local` and `chrome.storage.sync` on the user's own machine, and is sent only to the AI provider URL the user selected.
- **Personal communications:** No
- **Location:** No
- **Web browsing activity:** No
- **Website content:** Yes - on Testportal/Moodle quiz pages where the user explicitly clicks "Auto-solve", the question text and any embedded images are sent to the AI provider URL the user selected, in order to receive an AI explanation.

Certify:

- [x] I do not sell user data to third parties.
- [x] I do not use or transfer user data for purposes unrelated to the extension's single purpose.
- [x] I do not use or transfer user data to determine creditworthiness or for lending purposes.

### Privacy Policy URL

Wgraj plik `PRIVACY-POLICY.md` (jako `index.html` lub `privacy.html`) gdzieś publicznie - GitHub Pages, gist, twoja domena. Wklej tu link.

## Krok 6 - Store listing (English)

### Extension name (read-only z manifestu)

`Testportal EZ 67`

### Short description (read-only z manifestu)

`AI study assistant for Testportal and Moodle quizzes - bring your own key.`

### Description (1500-2000 znaków, między 250 a 10000)

```
Testportal EZ 67 is an AI-powered study companion for students using Testportal and Moodle. When you open a quiz, an "Auto-solve" helper button appears under each question. Click it, and the question (with any image attachments) is sent to the AI provider of your choice. The model returns an explanation and a suggested answer that you can review.

The extension is designed for self-study, revision, and practice tests - it helps you understand material faster by giving you on-demand AI tutoring directly on the quiz page.

KEY FEATURES

- Three AI providers in one extension: OpenAI, Google Gemini, and OpenRouter (which gives access to Claude, DeepSeek, Grok, Llama, Qwen, Mistral and more)
- Bring your own API key - we never see, store or proxy your credentials
- Vision support for questions with images
- Custom OpenAI base URL field - point the extension at your own reverse proxy if api.openai.com is unreachable on your network
- Optional context manager: attach text or files (PDF, DOCX, TXT) to a context that will be used as reference material when answering (OpenAI vector store)
- Stealth mode for the helper button: visible, barely visible (5% opacity), or hidden
- Anti-anti-tampering toggle for Testportal: prevents the page from detecting tab switches during practice runs
- Polish and English UI based on browser locale

PRIVACY

- All settings, including API keys, are stored locally in your browser using the chrome.storage API
- No telemetry, no analytics, no tracking
- The extension only talks to the AI provider URL you selected
- All source code is straightforward and reviewable

WHO IT IS FOR

Students who already have an OpenAI / Gemini / OpenRouter account and want a faster way to study with AI on quiz-style learning platforms. You need to provide your own API key from the AI service you choose; the extension does not include AI access.

NOT AFFILIATED

This extension is an independent project and is not affiliated with Testportal, Moodle, OpenAI, Google, or OpenRouter.
```

### Search terms (max 7, oddzielone przecinkami)

```
ai assistant, study helper, quiz tutor, openai, gemini, openrouter, moodle
```

## Krok 7 - Notes for certification

```
TEST INSTRUCTIONS FOR CERTIFICATION TEAM

Prerequisites:
- The extension requires the reviewer to provide their own API key from at least one supported provider (OpenAI, Google Gemini, or OpenRouter). The extension cannot demonstrate AI behavior without a valid key.
- If you do not have a key available, you can verify the popup UI, settings persistence, and "Test API key" error handling without one.

Steps to verify functionality:

1. Click the extension icon in the toolbar - the configuration popup opens.
2. Select an AI provider (OpenAI / Gemini / OpenRouter).
3. Paste a valid API key from that provider in the "API key" field.
4. Click "Test API key" - the extension sends a single short prompt and shows the response.
5. (OpenAI only) Optionally enter a custom base URL pointing at any OpenAI-compatible relay; leave empty to use the default api.openai.com.
6. Visit https://demo.testportal.net/ or any Moodle quiz page (body id "page-mod-quiz-attempt") to see the "Auto-solve" helper button under questions.

Notes:
- The extension performs no network calls until the user explicitly clicks "Test API key" or "Auto-solve".
- All API keys stay in chrome.storage on the user's machine.
- The extension does not include any remote code, eval, or dynamic script injection beyond the bundled anti-anti-tamper helper that is shipped inside the extension package.
- Single purpose: AI-assisted self-study on quiz-style learning platforms.

Source code is open: anyone can audit what the extension sends and to which URL.
```

## Krok 8 - Submit

Klik **Publish**. Review trwa 1-7 dni roboczych.
