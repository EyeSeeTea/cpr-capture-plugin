/**
 * Select season from URL param and set it to CPR attribute "season" (e.g., "2023-2024")
 *
 * Notes:
 *   - If the user tries to change the season, show a warning message and revert the change.
 *   - If an enrollment already exists for the selected season, show an error message.
 *   - You may decide to keep the season selector visible or hide it (currently not possible using
 *     the UI, nor programmatically here in the plugin, but it can be removed in the data store).
 *
 * Example. URL:
 *   http://localhost:8080/api/apps/Central-Planning-Reporting/index.html#/semi-annual-report?season=2025-2026&orgUnitId=IcDgI6M0KCC
 *
 * Then the CPR attribute "season" will be set to "2025-2026"
 *
 * Note: It's not possible to hide attribute fields in Capture App programmatically, so remove
 * the attribute "season" in the plugin settings in the data store.
 */
import React from "react";
import { useEnrollmentStatusForSeason } from "./api.hooks";
import { usePreventSeasonChangeAndShowWarning, useShowErrorIfEnrollmentExists } from "./ui-actions.hooks";
import { getMainAppWindow, getSeasonFromUrl } from "./url-helpers";

export type Options = {
    values: { season: string | undefined };
    setFieldValue: (values: { fieldId: "season"; value: string }) => void;
    fieldsMetadata: { season: { name: string } };
    orgUnitId: string;
};

export type Message = {
    level: "info" | "warning" | "error";
    text: string;
};

export function useAutomaticSeasonSelection(options: Options): { message: Message | undefined } {
    console.debug("[cpr-capture-plugin] props", options);
    const [message, setMessage] = React.useState<Message>();
    const season = getSeasonFromCprAppUrl();
    const enrollmentExistsForSeason = useEnrollmentStatusForSeason(season, options);

    usePreventSeasonChangeAndShowWarning(options, season, enrollmentExistsForSeason, setMessage);
    useShowErrorIfEnrollmentExists(enrollmentExistsForSeason, setMessage);

    return { message: message };
}

function getSeasonFromCprAppUrl(): string {
    const appWindow = getMainAppWindow();
    return getSeasonFromUrl(appWindow.location.href);
}
