import React from "react";
import styled from "styled-components";
import { CircularLoader } from "@dhis2/ui";
import { IDataEntryPluginProps } from "./Plugin.types";
import { useExtraTexts } from "./hooks/useExtraTexts";
import { formatTextWithBoldPrefix } from "./utils/formatTextWithBoldPrefix";

const Plugin = ({ fieldsMetadata }: IDataEntryPluginProps) => {
    const { formName, extraTexts, loading, error } = useExtraTexts(fieldsMetadata);

    if (loading) {
        return (
            <Center>
                <CircularLoader />
            </Center>
        );
    }

    if (error) {
        return <div>{error.message}</div>;
    }

    return (
        <Container>
            <FeedbackSection>
                <FeedbackTitle>{formName}</FeedbackTitle>
                {extraTexts &&
                    extraTexts.map((text, index) => (
                        <FeedbackText key={index}>{formatTextWithBoldPrefix(text)}</FeedbackText>
                    ))}
            </FeedbackSection>
        </Container>
    );
};

export default Plugin;

const Center = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Container = styled.div`
    width: 100%;
    padding: 16px 16px 0 16px;
`;

const FeedbackSection = styled.div`
    border: 1px solid #e0e5e9;
    border-radius: 4px;
    padding: 12px 12px 0 12px;
`;

const FeedbackTitle = styled.div`
    font-size: 1.25rem;
    color: #212934;
    margin-bottom: 8px;
`;

const FeedbackText = styled.div`
    font-size: 13px;
    line-height: 1.4;
    color: #4a5768;
    margin: 12px;
    background-color: #f3f5f7;
    padding: 8px;

    strong {
        font-weight: 600;
        color: #212934;
    }
`;
