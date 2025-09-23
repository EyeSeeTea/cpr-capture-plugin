import { useDataQuery } from "@dhis2/app-runtime";
import i18n from "../locales";
import { fieldsMetadata } from "../Plugin.types";
import { useMemo } from "react";

type ExtraTextState = {
    formName?: string;
    extraTexts: string[];
    loading: boolean;
    error?: Error;
    currentLanguage: string;
};

const DATA_STORE_QUERY = {
    extraTexts: {
        resource: "dataStore/extra-texts-for-options-capture-plugin/extraTexts",
    },
};

export function useExtraTexts(fieldsMetadata: Record<string, fieldsMetadata>): ExtraTextState {
    const firstField = fieldsMetadata ? Object.keys(fieldsMetadata)[0] : null;
    const { loading, error, data } = useDataQuery<ExtraTextResponse>(DATA_STORE_QUERY);

    const currentLanguage = useMemo(() => i18n.language || "en", [i18n.language]);

    return {
        formName: fieldsMetadata[firstField]?.formName,
        extraTexts: getTextsForLanguage(data, firstField, currentLanguage),
        loading,
        error,
        currentLanguage,
    };
}

type ExtraTextResponse = {
    extraTexts: { [fieldId: string]: { default: string[]; [key: string]: string[] } };
};

function getTextsForLanguage(data: ExtraTextResponse, fieldId: string, language: string): string[] {
    if (!data?.extraTexts[fieldId]) return [];

    const fieldTexts = data.extraTexts[fieldId];

    return fieldTexts[language] || fieldTexts.default || [];
}
