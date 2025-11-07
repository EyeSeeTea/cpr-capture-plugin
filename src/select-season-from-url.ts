/**
 * Select season from URL param and set it to CPR attribute "season" (e.g., "2023-2024")
 * *
 * If no season param is found, set the current season.
 *
 * Example. URL:
 *   http://localhost:8080/api/apps/Central-Planning-Reporting/index.html#/semi-annual-report?season=2025-2026&orgUnitId=IcDgI6M0KCC
 *
 * Then the CPR attribute "season" will be set to "2025-2026"
 *
 * Note: It's not possible to hide attribute fields in Capture App programmatically, so remove
 * the attribute "season" in the plugin settings in the data store.
 */
import { IDataEntryPluginProps } from "./Plugin.types";

export function selectSeasonFromUrl(setFieldValue: SetFieldValue): void {
    const appWindow = getMainAppWindow();
    const season = getSeasonFromUrl(appWindow.location.href);
    setCprAttribute(setFieldValue, { fieldId: "season", value: season });
}

type SetFieldValue = IDataEntryPluginProps["setFieldValue"];

// Define the known CPR attributes
type CprAttribute = { fieldId: "season"; value: string }; // e.g., "2023-2024"

// Set a CPR attribute value using the provided setFieldValue function
function setCprAttribute(setFieldValue: SetFieldValue, attribute: CprAttribute): void {
    setFieldValue({ fieldId: attribute.fieldId, value: attribute.value });
}

// Extract a parameter from the URL hash query string (e.g., #/some/path?season=2025-2026)
function getParamFromUrl(url: string, key: string): string | undefined {
    const urlObj = new URL(url);
    const hash = urlObj.hash.startsWith("#") ? urlObj.hash.slice(1) : urlObj.hash;
    const qIndex = hash.indexOf("?");
    const hashQuery = qIndex >= 0 ? hash.slice(qIndex + 1) : "";
    const value = new URLSearchParams(hashQuery).get(key);
    return value || undefined;
}

// Get season from URL param "season", or return current season if not found
function getSeasonFromUrl(href: string): string {
    const season = getParamFromUrl(href, "season");

    if (season) {
        return season;
    } else {
        const year = new Date().getFullYear();
        const currentSeason = `${year}-${year + 1}`;
        console.warn(`No season param found in URL, return current season: ${currentSeason}`);
        return currentSeason;
    }
}

// Traverse up to the main app window (only works if same-origin)
function getMainAppWindow(): Window {
    let currentWindow: Window = window;
    while (currentWindow.parent && currentWindow.parent !== currentWindow) {
        currentWindow = currentWindow.parent;
    }
    return currentWindow;
}
