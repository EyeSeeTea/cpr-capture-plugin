import React from "react";
import { Message, Options } from "./season-selector.hooks";
import i18n from "@dhis2/d2-i18n";

type SetMessage = React.Dispatch<React.SetStateAction<Message | undefined>>;

export function useShowErrorIfEnrollmentExists(enrollmentExistsForSeason: boolean, setMessage: SetMessage) {
    React.useEffect(() => {
        if (enrollmentExistsForSeason) {
            setMessage({
                level: "error",
                text: i18n.t("You cannot create a report for this season because a report already exists"),
            });
        }
    }, [enrollmentExistsForSeason, setMessage]);
}

export function usePreventSeasonChangeAndShowWarning(
    options: Options,
    season: string,
    showMessage: boolean,
    setMessage: SetMessage
) {
    const { setFieldValue } = options;
    const selectedSeason = options.values.season;

    React.useEffect(() => {
        setFieldValue({ fieldId: "season", value: season });

        if (selectedSeason && selectedSeason !== season && showMessage) {
            setMessage({
                level: "warning",
                text: i18n.t("Use the main season selector to switch seasons"),
            });
        }
    }, [selectedSeason, season, setFieldValue, showMessage, setMessage]);
}
