# Testportal EZ 67

> Rozszerzenie do automatycznego rozwiazywania testow na Testportal i Moodle z pomoca AI.

## Co potrafi

- Rozwiazuje pytania zamkniete (jednokrotny / wielokrotny wybor) i otwarte (krotkie / dlugie).
- Obsluguje pytania z obrazkami (modele wizyjne).
- Wspiera trzech dostawcow AI: **OpenAI**, **Google Gemini**, **OpenRouter** (Claude, DeepSeek, Grok, Llama, Qwen i wiecej).
- Pole **Custom OpenAI base URL** - przekieruj ruch przez wlasny reverse proxy, gdy `api.openai.com` jest zablokowany w sieci.
- Konteksty: dolacz tekst lub pliki, ktore beda uzyte przy odpowiedzi (vector store - tylko OpenAI).
- Anti-anti-tampering dla Testportal (blokuje wykrywanie opuszczania strony).
- Tryb stealth: ukrywa albo wycisza przycisk auto-solve.

## Instalacja (tryb deweloperski)

1. `npm install`
2. `npm run build`
3. Chrome: `chrome://extensions` -> wlacz **Tryb dewelopera** -> **Zaladuj rozpakowane**
4. Wskaz folder `build/chrome-mv3-prod/`

## Konfiguracja

Klik ikone EZ 67 w pasku przegladarki:

- **AI provider**: wybierz dostawce.
- **API key**: wklej swoj klucz. Kazdy dostawca ma osobny slot, klucze nie sa nadpisywane przy zmianie providera.
- **Custom OpenAI base URL** (tylko OpenAI): jesli api.openai.com jest zablokowany, wpisz tu adres swojego proxy z koncowka `/v1` (np. `https://moj-worker.workers.dev/v1`).
- **Model**: lista dostosowuje sie do wybranego providera.
- **Test API key**: wysyla testowe zapytanie - powinno wrocic "OK".

## Wlasny proxy

Folder `openai-proxy-worker/` w sasiednim katalogu zawiera gotowy Cloudflare Worker - kod, README, deploy w jednej komendzie.

## Wsparcie modeli

| Provider | Modele |
|---|---|
| OpenAI | GPT-5.2, 5.1, 5, mini, nano, GPT-4o (mini), GPT-4.1 (mini), o1, o3, o3-mini |
| Gemini | 2.5 Pro / Flash / Flash-Lite, 2.0 Flash / Lite, 1.5 Pro / Flash |
| OpenRouter | GPT-5, Claude Opus 4.1, Claude Sonnet 4.5, Gemini 2.5 Pro, DeepSeek V3 / R1, Grok 4, Llama 4 Maverick, Qwen 3 Max, Mistral Large |

## Disclaimer

Rozszerzenie do celow edukacyjnych. Autor nie ponosi odpowiedzialnosci za niewlasciwe uzycie. Projekt nie jest powiazany z Testportal ani z zadnym dostawca AI.
