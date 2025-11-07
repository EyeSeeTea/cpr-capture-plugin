import React from "react";
import { IDataEntryPluginProps } from "./Plugin.types";
import { selectSeasonFromUrl } from "./select-season-from-url";

const Plugin = (props: IDataEntryPluginProps) => {
    const { setFieldValue } = props;

    React.useEffect(() => {
        selectSeasonFromUrl(setFieldValue);
    }, [setFieldValue]);

    return <></>;
};

export default Plugin;
