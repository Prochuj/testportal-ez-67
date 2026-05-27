# OpenAI Proxy Worker

Cloudflare Worker that proxies requests to `api.openai.com`. Use it as the
"Custom OpenAI base URL" in the AntiTestportal GPT extension when
`api.openai.com` is blocked on the network you're on.

## Deploy via Cloudflare dashboard (no CLI)

1. Sign up at https://dash.cloudflare.com (free).
2. In the left sidebar pick **Workers & Pages** -> **Create** -> **Create Worker**.
3. Give it a name, e.g. `openai-proxy`. Cloudflare assigns the URL
   `https://openai-proxy.<your-subdomain>.workers.dev`.
4. Click **Deploy**, then **Edit code**.
5. Delete the starter code and paste the contents of `worker.js`.
6. Click **Deploy**.
7. (Optional) Open **Settings** -> **Variables and Secrets** -> **Add variable**.
   Name `PROXY_TOKEN`, type **Secret**, value = a random string. This will
   require every request to include the header `X-Proxy-Token: <value>`. Skip
   if you don't mind anyone with the URL using your worker (still safe — they
   need their own OpenAI key, which never touches the worker).

In the extension, set **Custom OpenAI base URL** to
`https://openai-proxy.<your-subdomain>.workers.dev/v1`.

## Deploy via CLI (wrangler)

```bash
npm install
npx wrangler login
npx wrangler deploy
```

To set an optional auth token:

```bash
npx wrangler secret put PROXY_TOKEN
```

## Test

```bash
curl https://<your-worker-url>/v1/models -H "Authorization: Bearer sk-..."
```

You should see your OpenAI models listed.

## Notes

- Your OpenAI API key still needs to be valid. The worker does not store or
  modify it — it forwards the `Authorization` header verbatim.
- Cloudflare free plan: 100,000 requests/day, more than enough for personal
  use.
- The worker preserves request method, path, query, body, and headers, so it
  works with `/v1/chat/completions`, `/v1/responses`, `/v1/files`,
  `/v1/vector_stores`, etc.
- CORS is wide-open (`*`) so the extension can call it from any origin.
