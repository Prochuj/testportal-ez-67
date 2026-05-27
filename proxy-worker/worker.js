// OpenAI reverse proxy for Cloudflare Workers.
// Forwards every request to api.openai.com preserving method, path, query, headers and body.
// CORS is enabled so the extension can call it directly from the browser.

const TARGET = "https://api.openai.com";

// Optional: set a shared secret in the Worker dashboard (Settings -> Variables)
// under the name PROXY_TOKEN. If set, callers must send `X-Proxy-Token: <value>`.
// Leave unset to allow any caller (anyone with your worker URL can use it).
async function checkAuth(request, env) {
    if (!env.PROXY_TOKEN) return null;
    const provided = request.headers.get("X-Proxy-Token");
    if (provided !== env.PROXY_TOKEN) {
        return new Response(JSON.stringify({
            error: { message: "Proxy token missing or invalid." }
        }), { status: 401, headers: { "Content-Type": "application/json" } });
    }
    return null;
}

function corsHeaders() {
    return {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Authorization, Content-Type, X-Proxy-Token, OpenAI-Beta",
        "Access-Control-Max-Age": "86400"
    };
}

export default {
    async fetch(request, env) {
        if (request.method === "OPTIONS") {
            return new Response(null, { status: 204, headers: corsHeaders() });
        }

        const authError = await checkAuth(request, env);
        if (authError) {
            const headers = new Headers(authError.headers);
            for (const [k, v] of Object.entries(corsHeaders())) headers.set(k, v);
            return new Response(authError.body, { status: authError.status, headers });
        }

        const incoming = new URL(request.url);
        const target = new URL(TARGET);
        target.pathname = incoming.pathname;
        target.search = incoming.search;

        const headers = new Headers(request.headers);
        headers.delete("host");
        headers.delete("x-proxy-token");
        headers.set("Host", target.host);

        const upstream = await fetch(target.toString(), {
            method: request.method,
            headers,
            body: ["GET", "HEAD"].includes(request.method) ? undefined : request.body,
            redirect: "follow"
        });

        const responseHeaders = new Headers(upstream.headers);
        for (const [k, v] of Object.entries(corsHeaders())) responseHeaders.set(k, v);

        return new Response(upstream.body, {
            status: upstream.status,
            statusText: upstream.statusText,
            headers: responseHeaders
        });
    }
};
