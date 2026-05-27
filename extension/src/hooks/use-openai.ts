import usePluginConfig from "~hooks/use-plugin-config";
import useContexts from "~hooks/use-contexts";
import { Provider } from "~models/openai";
import { t } from "~i18n";

const OPENAI_DEFAULT_BASE = "https://api.openai.com/v1";
const OPENROUTER_BASE = "https://openrouter.ai/api/v1";
const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta";

function useOpenAI() {
    const { pluginConfig } = usePluginConfig();
    const { getActiveContext } = useContexts();

    function getOpenAIBase(): string {
        const custom = pluginConfig.customBaseUrl?.trim();
        if (custom) return custom.replace(/\/+$/, "");
        return OPENAI_DEFAULT_BASE;
    }

    async function urlToDataUrl(url: string): Promise<string> {
        if (url.startsWith("data:")) return url;
        const response = await fetch(url);
        const blob = await response.blob();
        return await new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    function parseDataUrl(dataUrl: string): { mimeType: string; data: string } {
        const match = dataUrl.match(/^data:([^;,]+)(?:;base64)?,(.*)$/);
        if (!match) throw new Error("Invalid data URL");
        return { mimeType: match[1] || "image/png", data: match[2] };
    }

    async function requestOpenAI(prompt: string, validImages: string[]): Promise<string> {
        const activeContext = getActiveContext();
        const base = getOpenAIBase();

        const content: any[] = [{ type: "input_text", text: prompt }];
        validImages.forEach(img => {
            content.push({ type: "input_image", image_url: img });
        });

        const userMessage: any = {
            type: "message",
            role: "user",
            content: validImages.length > 0 ? content : prompt
        };

        const requestBody: any = {
            model: pluginConfig.apiModel,
            input: [userMessage]
        };

        if (activeContext?.textContent) {
            requestBody.instructions = `Use the following context information when answering:\n\n${activeContext.textContent}`;
        } else {
            requestBody.instructions = "You are an expert assistant. Solve the question accurately.";
        }

        const isReasoningModel = pluginConfig.apiModel.startsWith("o1") ||
            pluginConfig.apiModel.startsWith("o3") ||
            pluginConfig.apiModel.includes("-thinking");
        if (!isReasoningModel) {
            requestBody.temperature = 0.0;
        }

        if (activeContext?.vectorStoreId) {
            requestBody.tools = [
                {
                    type: "file_search",
                    vector_store_ids: [activeContext.vectorStoreId]
                }
            ];
            requestBody.instructions += "\n\nImportant: You have access to files. Please search the files for relevant information to answer the question.";
        }

        let response: Response;
        try {
            response = await fetch(`${base}/responses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${pluginConfig.apiKey}`,
                },
                body: JSON.stringify(requestBody)
            });
        } catch (error) {
            throw new Error(`Failed to fetch from OpenAI API: ${error.message}`);
        }

        const responseJson = await response.json();

        if (response.status === 401) {
            throw new Error("OpenAI API returned 'Unauthorized' (401). This usually means your API key is invalid or you have run out of credits/quota. Please check your OpenAI billing settings.");
        }

        if (responseJson.error) {
            if (responseJson.error.message?.includes("Invalid image")) {
                throw new Error("Model could not process the image. " +
                    "Make sure you've chosen a model that supports images, like gpt-4o. " +
                    "Simple text models like gpt-3.5-turbo do not support images.");
            }
            throw new Error(responseJson.error.message || "An error occurred while processing the request.");
        }

        if (!response.ok) {
            throw new Error(responseJson.error?.message || `HTTP error! status: ${response.status}`);
        }

        const output = responseJson.output;
        if (Array.isArray(output)) {
            const messageOutput = output.find((item: any) => item.type === "message");
            if (messageOutput?.content) {
                const textContent = messageOutput.content.find((c: any) => c.type === "output_text");
                if (textContent?.text) {
                    return textContent.text.trim();
                }
            }
        }

        if (responseJson.output_text) {
            return responseJson.output_text.trim();
        }

        throw new Error("Could not extract response text from OpenAI API response.");
    }

    async function requestGemini(prompt: string, validImages: string[]): Promise<string> {
        const activeContext = getActiveContext();

        const parts: any[] = [];
        for (const img of validImages) {
            const dataUrl = await urlToDataUrl(img);
            const { mimeType, data } = parseDataUrl(dataUrl);
            parts.push({ inline_data: { mime_type: mimeType, data } });
        }
        parts.push({ text: prompt });

        const requestBody: any = {
            contents: [{ role: "user", parts }],
            generationConfig: {
                temperature: 0.0
            }
        };

        const systemInstruction = activeContext?.textContent
            ? `Use the following context information when answering:\n\n${activeContext.textContent}`
            : "You are an expert assistant. Solve the question accurately.";

        requestBody.systemInstruction = {
            parts: [{ text: systemInstruction }]
        };

        const url = `${GEMINI_BASE}/models/${encodeURIComponent(pluginConfig.apiModel)}:generateContent?key=${encodeURIComponent(pluginConfig.apiKey)}`;

        let response: Response;
        try {
            response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(requestBody)
            });
        } catch (error) {
            throw new Error(`Failed to fetch from Gemini API: ${error.message}`);
        }

        const responseJson = await response.json();

        if (response.status === 401 || response.status === 403) {
            throw new Error("Gemini API returned an authorization error. Please check your API key.");
        }

        if (responseJson.error) {
            throw new Error(responseJson.error.message || "An error occurred while processing the Gemini request.");
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const candidates = responseJson.candidates;
        if (Array.isArray(candidates) && candidates.length > 0) {
            const candidateParts = candidates[0]?.content?.parts;
            if (Array.isArray(candidateParts)) {
                const text = candidateParts
                    .map((p: any) => p.text)
                    .filter(Boolean)
                    .join("\n");
                if (text) return text.trim();
            }
        }

        throw new Error("Could not extract response text from Gemini API response.");
    }

    async function requestOpenRouter(prompt: string, validImages: string[]): Promise<string> {
        const activeContext = getActiveContext();

        const userContent: any[] = [{ type: "text", text: prompt }];
        validImages.forEach(img => {
            userContent.push({ type: "image_url", image_url: { url: img } });
        });

        const messages: any[] = [];
        const systemMessage = activeContext?.textContent
            ? `Use the following context information when answering:\n\n${activeContext.textContent}`
            : "You are an expert assistant. Solve the question accurately.";
        messages.push({ role: "system", content: systemMessage });
        messages.push({
            role: "user",
            content: validImages.length > 0 ? userContent : prompt
        });

        const requestBody: any = {
            model: pluginConfig.apiModel,
            messages,
            temperature: 0.0
        };

        let response: Response;
        try {
            response = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${pluginConfig.apiKey}`,
                    "HTTP-Referer": "https://github.com/ez67/testportal-ez-67",
                    "X-Title": "Testportal EZ 67"
                },
                body: JSON.stringify(requestBody)
            });
        } catch (error) {
            throw new Error(`Failed to fetch from OpenRouter API: ${error.message}`);
        }

        const responseJson = await response.json();

        if (response.status === 401) {
            throw new Error("OpenRouter API returned 'Unauthorized' (401). Please check your API key and credits.");
        }

        if (responseJson.error) {
            throw new Error(responseJson.error.message || "An error occurred while processing the OpenRouter request.");
        }

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = responseJson.choices?.[0]?.message?.content;
        if (typeof text === "string" && text.length > 0) {
            return text.trim();
        }

        throw new Error("Could not extract response text from OpenRouter API response.");
    }

    async function requestAI(prompt: string, images: (string | null | undefined)[] | string | undefined = undefined): Promise<string> {
        if (!pluginConfig.apiKey) {
            throw new Error(t("errorApiKeyNotSet"));
        }

        let imageAttachments: (string | null | undefined)[] = [];
        if (Array.isArray(images)) {
            imageAttachments = images;
        } else if (typeof images === "string") {
            imageAttachments = [images];
        }
        const validImages = imageAttachments.filter((img): img is string => !!img);

        if (pluginConfig.provider === Provider.GEMINI) {
            return await requestGemini(prompt, validImages);
        }
        if (pluginConfig.provider === Provider.OPENROUTER) {
            return await requestOpenRouter(prompt, validImages);
        }
        return await requestOpenAI(prompt, validImages);
    }

    return {
        requestAI
    }
}

export default useOpenAI;
