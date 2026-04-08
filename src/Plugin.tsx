import React from "react";
import { IDataEntryPluginProps } from "./Plugin.types";
import { Options, useAutomaticSeasonSelection } from "./season-selector.hooks";
import { Message } from "./Message";

const Plugin = (props: IDataEntryPluginProps) => {
    const { messages } = useAutomaticSeasonSelection(props as unknown as Options);

    return messages.map(message => (
        <div style={getContainerStyles(message)}>
            <div style={styles.icon}>{icons[message.level]}</div>
            <div style={styles.text}>{message.text}</div>
        </div>
    ));
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

function getContainerStyles(message: Message): React.CSSProperties {
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
