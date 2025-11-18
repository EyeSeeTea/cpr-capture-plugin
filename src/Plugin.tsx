import React from "react";
import { IDataEntryPluginProps } from "./Plugin.types";
import { Message, Options, useAutomaticSeasonSelection } from "./season-selector.hooks";

const Plugin = (props: IDataEntryPluginProps) => {
    const { message } = useAutomaticSeasonSelection(props as unknown as Options);
    const containerStyles = React.useMemo(() => getContainerStyles(message), [message]);

    if (!message) return null;

    return (
        <div style={containerStyles}>
            <div style={styles.icon}>{icons[message.level]}</div>
            <div style={styles.text}>{message.text}</div>
        </div>
    );
};

type MessageLevel = Message["level"];

const styles = {
    icon: { fontSize: 20, lineHeight: 1 },
    text: { fontSize: 14, lineHeight: 1.3, whiteSpace: "pre-wrap" },
} satisfies Record<string, React.CSSProperties>;

const levelStyles: Record<MessageLevel, React.CSSProperties> = {
    info: { background: "#e6f8ff", borderColor: "#9fd7ff", color: "#055160" },
    warning: { background: "#fff8e6", borderColor: "#ffd27a", color: "#6a4a00" },
    error: { background: "#fff1f1", borderColor: "#f5a1a1", color: "#6a1212" },
};

const icons: Record<MessageLevel, string> = {
    info: "ℹ️",
    warning: "⚠️",
    error: "❌",
};

function getContainerStyles(message: Message | undefined): React.CSSProperties {
    if (!message) return {};

    return {
        padding: "12px 16px",
        border: `1px solid ${levelStyles[message.level].borderColor}`,
        background: levelStyles[message.level].background,
        color: levelStyles[message.level].color,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        marginLeft: "auto",
        display: "block",
        maxWidth: "fit-content",
    };
}

export default Plugin;
