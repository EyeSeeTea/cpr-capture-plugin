import React from "react";

export const formatTextWithBoldPrefix = (text: string) => {
    const colonIndex = text.indexOf(":");

    if (colonIndex === -1) {
        // No colon found, return text as is
        return text;
    }

    const beforeColon = text.substring(0, colonIndex);
    const afterColon = text.substring(colonIndex);

    return (
        <>
            <strong>{beforeColon}</strong>
            {afterColon}
        </>
    );
};
