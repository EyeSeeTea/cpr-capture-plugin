import { useMemo } from "react";
import { fieldsMetadata } from "../Plugin.types";
import { Constant, useConstantTranslations } from "./useConstantTranslations";
import { ExtraTexts, TextCode, useDataStoreExtraTexts } from "./useDataStoreExtraTexts";

type ExtraTextState = {
    formName?: string;
    extraTexts: string[];
    loading: boolean;
    error?: Error;
};

export function useExtraTexts(fieldsMetadata: Record<string, fieldsMetadata>): ExtraTextState {
    const firstField = fieldsMetadata ? Object.keys(fieldsMetadata)[0] : null;
    const { loading: loadingExtraTexts, error: errorExtraTexts, extraTexts } = useDataStoreExtraTexts();

    const codes = useMemo(
        () => Object.values(extraTexts || {}).flatMap(texts => texts.filter(isCode).map(text => text.code)),
        [extraTexts]
    );

    const { loading: loadingConstants, error: errorConstants, constants } = useConstantTranslations(codes);

    return {
        formName: fieldsMetadata[firstField]?.formName,
        extraTexts: getTextsForLanguage(extraTexts, firstField, constants),
        loading: loadingExtraTexts || loadingConstants,
        error: errorExtraTexts || errorConstants,
    };
}

function isCode(text: string | { code: string }): text is TextCode {
    return typeof text === "object" && "code" in text;
}

function getTextsForLanguage(extraTexts: ExtraTexts, fieldId: string, constants: Constant[]): string[] {
    if (!extraTexts[fieldId]) return [];

    const fieldTexts = extraTexts[fieldId];

    return fieldTexts.map(text => getTextFromConstants(text, constants));
}

function getTextFromConstants(value: string | { code: string } | undefined, constants: Constant[]): string {
    return typeof value === "string"
        ? value
        : value && constants.length > 0
        ? constants.find(constant => constant.code === value.code)?.displayDescription || "-"
        : "-";
}
