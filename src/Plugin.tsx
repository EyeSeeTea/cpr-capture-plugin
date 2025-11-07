import React from "react";
import { IDataEntryPluginProps } from "./Plugin.types";

const Plugin = (props: IDataEntryPluginProps) => {
    React.useEffect(() => {
        const appWindow = getMainAppWindow();
        const season = getSeasonFromUrl(appWindow.location.href);
        setCprAttribute(props.setFieldValue, { fieldId: "season", value: season });
    }, [props.setFieldValue]);

    return <></>;
};

// Define the known CPR attribute type
type CprAttribute = { fieldId: "season"; value: string }; // e.g., "2023-2024"

// Set a CPR attribute value using the provided setFieldValue function
function setCprAttribute(setFieldValue: IDataEntryPluginProps["setFieldValue"], attribute: CprAttribute): void {
    setFieldValue({ fieldId: attribute.fieldId, value: attribute.value });
}

// Extract a parameter from the URL hash query string (e.g., #/some/path?season=2025-2026)
function getParamFromUrl(url: string, key: string): string | undefined {
    const urlObj = new URL(url);
    const hash = urlObj.hash.startsWith("#") ? urlObj.hash.slice(1) : urlObj.hash;
    const qIndex = hash.indexOf("?");
    const hashQuery = qIndex >= 0 ? hash.slice(qIndex + 1) : "";
    return new URLSearchParams(hashQuery).get(key) || undefined;
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

// Traverse up to the main app window
function getMainAppWindow(): Window {
    let currentWindow: Window = window;
    while (currentWindow.parent && currentWindow.parent !== currentWindow) {
        currentWindow = currentWindow.parent;
    }
    return currentWindow;
}

export default Plugin;
