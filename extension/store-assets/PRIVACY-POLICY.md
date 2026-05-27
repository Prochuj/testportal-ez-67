# Privacy Policy - Testportal EZ 67

**Last updated:** 27 May 2026

Testportal EZ 67 ("the Extension") is a browser extension that helps users
study by sending quiz questions to an AI provider chosen by the user. This
policy explains what data the Extension handles.

## Summary

- The Extension does not collect, store, transmit, or sell any personal data
  to its developer or to any third party other than the AI provider URL the
  user explicitly configures.
- All settings, including API keys, are stored only in the user's own browser
  using the `chrome.storage` API.
- There are no analytics, no telemetry, no tracking pixels, and no remote
  servers operated by the developer.

## What the Extension stores locally

The Extension stores the following items in `chrome.storage` on the user's
device:

- The selected AI provider (OpenAI / Gemini / OpenRouter).
- The user's API key for each provider, supplied by the user.
- The selected AI model.
- An optional custom OpenAI base URL, supplied by the user.
- Optional study context (free-form text and references to user-uploaded
  files inside an OpenAI vector store the user owns).
- Visual preferences such as auto-solve button visibility.

This data never leaves the user's device through the Extension. It is
synchronized between the user's own browser instances if the browser's
built-in sync feature is enabled by the user.

## What the Extension sends to AI providers

When the user clicks "Test API key" or "Auto-solve", the Extension sends:

- The text of the question (and embedded images, if any).
- The optional study context the user attached.
- The user's API key, used solely for authentication with the chosen
  provider.

These requests are sent only to:

- `https://api.openai.com` (or the custom OpenAI base URL the user enters)
- `https://generativelanguage.googleapis.com` (Google Gemini)
- `https://openrouter.ai` (OpenRouter)

The handling of that data after it reaches the AI provider is governed by
that provider's privacy policy:

- OpenAI: https://openai.com/policies/privacy-policy
- Google Gemini: https://policies.google.com/privacy
- OpenRouter: https://openrouter.ai/privacy

## What the Extension does NOT do

- It does not read pages other than Testportal and Moodle quiz pages.
- It does not collect browsing history.
- It does not read or transmit your other extensions or installed apps.
- It does not include analytics SDKs or trackers.
- It does not download or execute remote code.

## Children's privacy

The Extension is not directed at children under 13.

## Contact

If you have questions about this policy, contact: **<your-email-here>**.

## Changes

If this policy changes, the updated version will be published at the same
URL with an updated "Last updated" date.
