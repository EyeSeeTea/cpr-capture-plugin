export type FieldsMetadata = {
    id: string;
    name: string;
    shortName: string;
    formName: string;
    disabled: boolean;
    compulsory: boolean;
    description: string;
    type: string;
    optionSet: any;
    displayInForms: boolean;
    displayInReports: boolean;
    icon: any;
    unique: any;
    searchable: boolean | undefined;
    url: string | undefined;
};

type FieldValueOptions = {
    valid?: boolean;
    touched?: boolean;
    error?: string;
};

export type SetFieldValueProps = {
    fieldId: PluginField;
    value: any;
    options?: FieldValueOptions;
};

type SetContextFieldValueProps = {
    fieldId: "geometry" | "occurredAt" | "enrolledAt";
    value: any;
    options?: FieldValueOptions;
};

export type IDataEntryPluginProps = {
    values: Record<PluginField, any>;
    errors: Record<string, string[]>;
    warnings: Record<string, string[]>;
    formSubmitted: boolean;
    orgUnitId: string;
    viewMode: boolean;
    config: Config;
    fieldsMetadata: Record<string, FieldsMetadata>;
    setFieldValue: (values: SetFieldValueProps) => void;
    setContextFieldValue: (values: SetContextFieldValueProps) => void;
};

type Config = {
    url: string | undefined;
    appName: string;
    appVersion: string;
};

// fields for this plugin are arbitrary strings used for dataStore configuration
export type PluginFields = Record<string, string>;

export type PluginField = PluginFields[keyof PluginFields];
