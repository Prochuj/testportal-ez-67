import useGlobalSyncedState from "~hooks/use-global-synced-state"
import { PROVIDER_DEFAULT_MODEL, Provider } from "~models/openai";

export enum PluginConfigKeys {
    OpenAIApiKey = "testportal-gpt-api-key",
    OpenAIModel = "testportal-gpt-api-model",
    TestportalAntiAntiTampering = "testportal-gpt-anti-anti-tampering",
    AutoSolveButtonVisibility = "testportal-gpt-btn-visibilitiy"
}

export enum AutoSolveButtonVisibility {
    VISIBLE = "visible",
    BARELY_VISIBLE = "barely_visible",
    NOT_VISIBLE = "not_visible"
}

export const PluginConfigKey = "testportal-gpt-config-v2";

export interface PluginConfig {
    provider: Provider;
    apiKey: string;
    geminiApiKey: string;
    openrouterApiKey: string;
    customBaseUrl: string;
    apiModel: string;
    geminiModel: string;
    openrouterModel: string;
    antiAntiTampering: boolean;
    btnVisibility: AutoSolveButtonVisibility;
}

const DefaultConfig: PluginConfig = {
    provider: Provider.OPENAI,
    apiKey: "",
    geminiApiKey: "",
    openrouterApiKey: "",
    customBaseUrl: "",
    apiModel: PROVIDER_DEFAULT_MODEL[Provider.OPENAI],
    geminiModel: PROVIDER_DEFAULT_MODEL[Provider.GEMINI],
    openrouterModel: PROVIDER_DEFAULT_MODEL[Provider.OPENROUTER],
    antiAntiTampering: true,
    btnVisibility: AutoSolveButtonVisibility.VISIBLE
}

export default function usePluginConfig() {
    const [config, setConfig] = useGlobalSyncedState<PluginConfig>(PluginConfigKey, DefaultConfig);

    const provider = config.provider ?? Provider.OPENAI;

    function getActiveApiKey(): string {
        if (provider === Provider.GEMINI) return config.geminiApiKey ?? "";
        if (provider === Provider.OPENROUTER) return config.openrouterApiKey ?? "";
        return config.apiKey ?? "";
    }

    function setActiveApiKey(val: string) {
        if (provider === Provider.GEMINI) {
            setConfig(prev => ({ ...prev, geminiApiKey: val }));
        } else if (provider === Provider.OPENROUTER) {
            setConfig(prev => ({ ...prev, openrouterApiKey: val }));
        } else {
            setConfig(prev => ({ ...prev, apiKey: val }));
        }
    }

    function getActiveModel(): string {
        if (provider === Provider.GEMINI) return config.geminiModel ?? PROVIDER_DEFAULT_MODEL[Provider.GEMINI];
        if (provider === Provider.OPENROUTER) return config.openrouterModel ?? PROVIDER_DEFAULT_MODEL[Provider.OPENROUTER];
        return config.apiModel ?? PROVIDER_DEFAULT_MODEL[Provider.OPENAI];
    }

    function setActiveModel(val: string) {
        if (provider === Provider.GEMINI) {
            setConfig(prev => ({ ...prev, geminiModel: val }));
        } else if (provider === Provider.OPENROUTER) {
            setConfig(prev => ({ ...prev, openrouterModel: val }));
        } else {
            setConfig(prev => ({ ...prev, apiModel: val }));
        }
    }

    return {
        pluginConfig: {
            provider,
            setProvider: (val: Provider) => setConfig(prev => ({ ...prev, provider: val })),
            apiKey: getActiveApiKey(),
            setApiKey: setActiveApiKey,
            customBaseUrl: config.customBaseUrl ?? "",
            setCustomBaseUrl: (val: string) => setConfig(prev => ({ ...prev, customBaseUrl: val })),
            apiModel: getActiveModel(),
            setApiModel: setActiveModel,
            antiAntiTampering: config.antiAntiTampering,
            setAntiAntiTampering: (val: boolean) => setConfig(prev => ({ ...prev, antiAntiTampering: val })),
            btnVisibility: config.btnVisibility,
            setBtnVisibility: (val: AutoSolveButtonVisibility) => setConfig(prev => ({ ...prev, btnVisibility: val }))
        }
    }
}
