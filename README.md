## Extra texts for options capture plugin

Show extra texts defined in the data store extra-texts-for-options-capture-plugin/extraTexts

Define a property by plugin field using as key the same that alias field

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

The output will be the `build/bundle/extra-texts-for-options-capture-plugin-{version}.zip` file, ready to upload in App Management -> Manual Install.
