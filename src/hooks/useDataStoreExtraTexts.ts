import { useDataQuery } from "@dhis2/app-runtime";

const DATA_STORE_QUERY = {
    result: {
        resource: "dataStore/extra-texts-for-options-capture-plugin/extraTexts",
    },
};

export function useDataStoreExtraTexts(): ExtraTextsState {
    const { loading, error, data } = useDataQuery<QueryResponse>(DATA_STORE_QUERY);

    return {
        extraTexts: data?.result || ({} as ExtraTexts),
        loading,
        error,
    };
}

type QueryResponse = {
    result: ExtraTexts;
};

export type ExtraTexts = {
    [fieldId: string]: ExtraText[];
};

export type ExtraText = string | TextCode;
export type TextCode = { code: string };

export type ExtraTextsState = {
    extraTexts: ExtraTexts;
    loading: boolean;
    error?: Error;
};
