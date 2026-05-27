import "style.css";

import { useState } from "react";

import useOpenAI from "~hooks/use-openai";
import usePluginConfig, { AutoSolveButtonVisibility } from "~hooks/use-plugin-config";
import { PROVIDER_LABELS, PROVIDER_MODELS, Provider } from "~models/openai";
import ContextManager from "~components/ContextManager";
import { t } from "~i18n";

function IndexPopup() {
    const { pluginConfig } = usePluginConfig();
    const { requestAI } = useOpenAI();

    const [keyValid, setKeyValid] = useState<boolean | null>(null);
    const [keyValidationInProgress, setKeyValidationInProgress] = useState<boolean>(false);
    const [keyValidationResponse, setKeyValidationResponse] = useState<string>("");

    async function onTestApiKey() {
        const prompt = "Respond with OK";
        setKeyValidationInProgress(true);
        try {
            const response = await requestAI(prompt);
            setKeyValid(true);
            setKeyValidationResponse(response);
            setKeyValidationInProgress(false);
        } catch (error) {
            setKeyValid(false);
            setKeyValidationResponse(error instanceof Error ? error.message : error.toString());
            setKeyValidationInProgress(false);
        }
    }

    const availableModels = PROVIDER_MODELS[pluginConfig.provider] ?? PROVIDER_MODELS[Provider.OPENAI];

    return <div className={"popup-container"}>
        <div className="popup-header">
            <div className="popup-logo">EZ<span className="popup-logo-num">67</span></div>
            <div>
                <h1>{t("title")}</h1>
                <span className="popup-version">v{chrome.runtime.getManifest().version}</span>
            </div>
        </div>
        <p>
            {t("welcome")}
        </p>
        <p className={"popup-buy-coffee-prompt"}>
            {t("supportPrompt")}
        </p>

        <br />

        <div>
            <label className={"popup-field-label"}>{t("providerLabel")}</label>
            <p>{t("providerDescription")}</p>
            <select
                value={pluginConfig.provider}
                onChange={e => {
                    pluginConfig.setProvider(e.target.value as Provider);
                    setKeyValid(null);
                    setKeyValidationResponse("");
                }}>
                {Object.values(Provider).map(p => (
                    <option key={p} value={p}>{PROVIDER_LABELS[p]}</option>
                ))}
            </select>
        </div>

        <hr />

        <div>
            <label className={"popup-field-label"}>{t("apiKeyLabel")}</label>

            <p>
                {t("apiKeyDescription")}
            </p>

            <input
                type={"text"}
                key={`apikey-${pluginConfig.provider}`}
                defaultValue={pluginConfig.apiKey}
                onChange={e => pluginConfig.setApiKey(e.target.value)}
                placeholder={t("apiKeyPlaceholder")} />
            <button className={"popup-test-key-btn"} onClick={onTestApiKey}>{t("testApiKey")}</button>

            {keyValidationInProgress && <p className={"popup-key-validation-in-progress"}>
                {t("validatingKey")}
            </p>}

            {keyValid === true && <p className={"popup-successful-key-validation"}>
                {t("keyValid")} {keyValidationResponse}.
            </p>}

            {keyValid === false && <p className={"popup-failed-key-validation"}>
                {t("keyInvalid")} {keyValidationResponse}.
            </p>}
        </div>

        {pluginConfig.provider === Provider.OPENAI && <>
            <hr />
            <div>
                <label className={"popup-field-label"}>{t("customBaseUrlLabel")}</label>
                <p>{t("customBaseUrlDescription")}</p>
                <input
                    type={"text"}
                    defaultValue={pluginConfig.customBaseUrl}
                    onChange={e => pluginConfig.setCustomBaseUrl(e.target.value)}
                    placeholder={t("customBaseUrlPlaceholder")} />
            </div>
        </>}

        <hr />

        <div>
            <label className={"popup-field-label"}>{t("modelLabel")}</label>
            <p>
                {t("modelDescription")}
            </p>
            <select
                key={`model-${pluginConfig.provider}`}
                value={pluginConfig.apiModel}
                onChange={e => pluginConfig.setApiModel(e.target.value)}>
                {availableModels.map((model) => (
                    <option key={model} value={model}>
                        {model}
                    </option>
                ))}
            </select>
        </div>

        <hr />

        <div>
            <label className={"popup-field-label"}>{t("antiTamperingLabel")}</label>
            <p>
                {t("antiTamperingDescription")}
            </p>
            <label>
                <input type={"checkbox"}
                    checked={pluginConfig.antiAntiTampering}
                    onChange={e => pluginConfig.setAntiAntiTampering(e.target.checked)} />
                {t("enable")}
            </label>
        </div>

        <hr />

        <ContextManager />

        <hr />

        <div>
            <label className={"popup-field-label"}>{t("visibilityLabel")}</label>
            <p>
                {t("visibilityDescription")}
            </p>
            <select defaultValue={pluginConfig.btnVisibility}
                onChange={e => pluginConfig.setBtnVisibility(e.target.value as AutoSolveButtonVisibility)}>
                <option value={AutoSolveButtonVisibility.VISIBLE}>
                    {t("visibilityVisible")}
                </option>

                <option value={AutoSolveButtonVisibility.BARELY_VISIBLE}>
                    {t("visibilityBarelyVisible")}
                </option>

                <option value={AutoSolveButtonVisibility.NOT_VISIBLE}>
                    {t("visibilityInvisible")}
                </option>
            </select>
            {pluginConfig.btnVisibility === AutoSolveButtonVisibility.NOT_VISIBLE && <p className="popup-visibility-warning">
                {t("visibilityWarning")}
            </p>}
        </div>
    </div>;
}

export default IndexPopup
