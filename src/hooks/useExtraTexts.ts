import { useDataQuery } from "@dhis2/app-runtime";
import { fieldsMetadata } from "../Plugin.types";

type ExtraTextState = {
    formName?: string;
    extraTexts: string[];
    loading: boolean;
    error?: Error;
};

// Query configuration for Data Store
const DATA_STORE_QUERY = {
    extraTexts: {
        resource: "dataStore/extra-texts-for-options-capture-plugin/extraTexts",
    },
};

export function useExtraTexts(fieldsMetadata: Record<string, fieldsMetadata>): ExtraTextState {
    const firstField = fieldsMetadata ? Object.keys(fieldsMetadata)[0] : null;

    const { loading, error, data } = useDataQuery<ExtraTextResponse>(DATA_STORE_QUERY);

    return {
        formName: fieldsMetadata[firstField]?.formName,
        extraTexts: data ? data.extraTexts[firstField] : [],
        loading,
        error,
    };
}

type ExtraTextResponse = {
    extraTexts: { [fieldId: string]: string[] };
};
