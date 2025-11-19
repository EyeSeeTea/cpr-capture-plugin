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
import { useExistingEnrollmentValidation } from "./api.hooks";
import { getMainAppWindow, getSeasonFromUrl } from "./url-helpers";
import { Message } from "./Message";

export type Options = {
    values: { season: string | undefined };
    setFieldValue: (values: { fieldId: "season"; value: string }) => void;
    fieldsMetadata: { season: { name: string } };
    orgUnitId: string;
};

export function useAutomaticSeasonSelection(options: Options): { messages: Message[] } {
    console.debug("[cpr-capture-plugin]", options);
    const season = useSeasonFromCprAppUrl();
    useAutomaticSeasonSelector(options, season);
    const errorMessage = useExistingEnrollmentValidation(season, options);
    return { messages: errorMessage ? [errorMessage] : [] };
}

function useAutomaticSeasonSelector(options: Options, season: string) {
    const { setFieldValue } = options;
    const selectedSeason = options.values.season;

    React.useEffect(() => {
        if (selectedSeason !== season) {
            setFieldValue({ fieldId: "season", value: season });
        }
    }, [selectedSeason, season, setFieldValue]);
}

function useSeasonFromCprAppUrl(): string {
    // The URL in the CPR app contains a season parameter.
    // To react to changes in that parameter, we must listen for route changes.
    // Therefore, we need to set up a timer to poll for updates.
    const getSelectedSeason = React.useCallback(() => {
        const appWindow = getMainAppWindow();
        return getSeasonFromUrl(appWindow.location.href);
    }, []);

    return useInterval(getSelectedSeason, 1000);
}

function useInterval<T>(callback: () => T, delay: number): T {
    const [value, setValue] = React.useState<T>(callback());

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setValue(callback());
        }, delay);

        return () => clearInterval(intervalId);
    }, [callback, delay]);

    return value;
}
