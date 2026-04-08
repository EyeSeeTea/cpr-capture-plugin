// Extract a parameter from the URL hash query string (e.g., #/some/path?season=2025-2026)
export function getParamFromUrl(url: string, key: string): string | undefined {
    const urlObj = new URL(url);
    const hash = urlObj.hash.startsWith("#") ? urlObj.hash.slice(1) : urlObj.hash;
    const qIndex = hash.indexOf("?");
    const hashQuery = qIndex >= 0 ? hash.slice(qIndex + 1) : "";
    const value = new URLSearchParams(hashQuery).get(key);
    return value || undefined;
}

// Get season from URL param "season", or return current season if not found
export function getSeasonFromUrl(href: string): string {
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
export function getMainAppWindow(): Window {
    let currentWindow: Window = window;
    while (currentWindow.parent && currentWindow.parent !== currentWindow) {
        currentWindow = currentWindow.parent;
    }
    return currentWindow;
}
