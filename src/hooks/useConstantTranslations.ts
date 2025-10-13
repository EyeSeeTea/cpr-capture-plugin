import { useDataQuery } from "@dhis2/app-runtime";
import { useEffect } from "react";

const QUERY = {
    result: {
        resource: "constants",
        params: ({ codes }: { codes: string[] }) => ({
            fields: "id,code,displayDescription",
            filter: "code:in:[" + codes.join(",") + "]",
            paging: false,
        }),
    },
};

export function useConstantTranslations(codes: string[]): ConstantsTranslationsState {
    const { loading, error, data, refetch } = useDataQuery<QueryResponse>(QUERY, {
        lazy: true,
    });

    useEffect(() => {
        if (codes.length > 0) {
            refetch({ codes });
        }
    }, [codes, refetch]);

    return {
        constants: data?.result.constants || [],
        loading,
        error,
    };
}

type QueryResponse = {
    result: {
        constants: Constant[];
    };
};

export type Constant = {
    id: string;
    code: string;
    displayDescription: string;
};

type ConstantsTranslationsState = {
    constants: Constant[];
    loading: boolean;
    error?: Error;
};
