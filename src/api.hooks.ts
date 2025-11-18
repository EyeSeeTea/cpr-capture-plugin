import React from "react";
import { useDataEngine } from "@dhis2/app-runtime";
import { getParamFromUrl } from "./url-helpers";

type Options = {
    fieldsMetadata: { season: { name: string } };
    orgUnitId: string;
};

export function useEnrollmentStatusForSeason(season: string, options: Options): boolean {
    const orgUnitId = options.orgUnitId;
    const trackedEntityAttribute = useGetTrackedEntityAttribute(options);
    const existingTei = useGetExistingEnrollment({ trackedEntityAttribute, season, orgUnitId });
    return Boolean(existingTei?.teiId);
}

function useGetTrackedEntityAttribute(options: Options): { id: string } | undefined {
    const engine = useDataEngine();
    const teaName = options.fieldsMetadata.season.name;

    type ApiResponse = { metadata: { trackedEntityAttributes: Array<{ id: string }> } };
    const [response, setResponse] = React.useState<ApiResponse>();

    const getTeaQuery = React.useMemo(() => {
        return {
            metadata: {
                resource: "trackedEntityAttributes",
                params: {
                    fields: "id",
                    filter: `name:eq:${teaName}`,
                },
            },
        };
    }, [teaName]);

    React.useEffect(() => {
        engine.query(getTeaQuery).then(res => setResponse(res as ApiResponse));
    }, [engine, getTeaQuery]);

    if (response) {
        const tea = response.metadata.trackedEntityAttributes[0];
        if (!tea) throw new Error(`Tracked Entity Attribute not found: ${teaName}`);
        return { id: tea.id };
    }
}

function useGetExistingEnrollment(options: {
    trackedEntityAttribute: { id: string } | undefined;
    season: string;
    orgUnitId: string;
}): { teiId: string | undefined } | undefined {
    const { trackedEntityAttribute: tea, season, orgUnitId } = options;

    const engine = useDataEngine();
    const programId = getProgramFromCaptureAppUrl();
    const teaId = tea?.id;

    const getTrackedEntitiesQuery = React.useMemo(() => {
        if (!teaId) return;

        return {
            trackedEntities: {
                resource: "tracker/trackedEntities",
                params: {
                    fields: "trackedEntity",
                    filter: `${teaId}:eq:${season}`,
                    orgUnit: orgUnitId,
                    // Note: some TEIs are only returned when queried by trackedEntityType
                    program: programId,
                },
            },
        };
    }, [teaId]);

    type ApiResponse = { trackedEntities: { instances: Array<{ trackedEntity: string }> } };
    const [response, setResponse] = React.useState<ApiResponse>();

    React.useEffect(() => {
        if (!getTrackedEntitiesQuery) return;
        engine.query(getTrackedEntitiesQuery).then(res => setResponse(res as ApiResponse));
    }, [engine, getTrackedEntitiesQuery]);

    if (response) {
        return { teiId: response.trackedEntities.instances[0]?.trackedEntity };
    }
}

// Program is not currently exposed to plugins, so extract it from the Capture App URL
function getProgramFromCaptureAppUrl(): string {
    const captureAppWindow = window.parent;
    // Ex: http://localhost:7036/dhis-web-capture/index.html#/new?orgUnitId=RsyOE3vLiP6&programId=JsM6wTUTsL6
    const programId = getParamFromUrl(captureAppWindow.location.href, "programId");
    if (!programId) throw new Error("Program ID not found in Capture App URL");
    return programId;
}
