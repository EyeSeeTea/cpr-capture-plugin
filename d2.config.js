const config = {
    name: "cpr-capture-plugin",
    title: "Capture Plugin for CPR",
    description:
        "Capture Plugin for Central Planning and Reporting (automatic season selector for tracker program enrollment)",
    type: "app",
    author: "EyeSeeTea team",
    entryPoints: {
        plugin: "./src/Plugin.tsx",
    },
};

module.exports = config;
