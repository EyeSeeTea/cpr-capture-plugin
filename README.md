## Extra texts for options capture plugin




Validates and format a `dateOfBirth` field, and auto-populates the `age` field.

This plugin does not include any visible UI element. It detects changes to the `dateOfBirth` field.

- If it is invalid, it marks the field with an error.
- If it is valid, calculates and sets the `age` field.

A Date of Birth is considered valid if it is a valid date with the format `YYYY-MM-DD`, `MMDDYYYY` or `MM-DD-YYYY` and is not in the future.
Date of Birth values reformatted as `YYYY-MM-DD` for consistency and compatibility with the backend.

NOTE: To support only `YYYY-MM-DD`or `YYYYMMDD` formats, change `dateFormat` in `Plugin.tsx` and rebuild. In the future, this could be made configurable when adding the plugin in tracker-plugin-configurator app.

### How to use

1. Install plugin `.zip` file
2. Download and install the Tracker configurator app from the _App management application_ or from the [App hub](https://apps.dhis2.org/app/85d156b7-6e3f-43f0-be57-395449393f7d).
3. Follow the instructions in the Tracker configurator app to configure the plugin.
4. Open the Capture app and create or edit the configured entity.

### Development

1. `yarn install`
2. `yarn start`
3. Configure the plugin in Tracker Plugin Configurator with "Add Local Plugin" -> url: `http://localhost:3000/plugin.html`.

### Generate a release

1. `yarn install`
2. Update `version` in `package.json` if required
3. `yarn build`

The output will be the `build/bundle/dob-formatting-age-calculation-capture-plugin-{version}.zip` file, ready to upload in App Management -> Manual Install.

### Configuration

The plugin expects three tracked entity attributes to be configured in the field map. Please configure this in the Tracker configurator app.

Example

| Attribute ID | Plugin alias | Type |
| ------------ | ------------ | ---- |
| w75KJ2mc4zz  | dateOfBirth  | Text |
| zDhUuAYrxNC  | age          | Text |
