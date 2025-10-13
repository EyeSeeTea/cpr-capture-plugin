import React from "react";
import Plugin from "./Plugin";
import classes from "./App.module.css";
import i18n from "@dhis2/d2-i18n";

const MyApp = () => (
    <div>
        <h3>{i18n.t("Welcome to DHIS2!")}</h3>
    </div>
);

export default MyApp;
