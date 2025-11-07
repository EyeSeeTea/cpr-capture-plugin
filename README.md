# CPR - Capture Plugin

Custom Capture plugin for Central Planning and Reporting (DHIS2).

## Features

-   On a new enrollment, set the season from the URL (`... ?season=2025-2026& ...`). If the parameter is missing, the plugin sets the current season.

## Prerequisites

-   Node.js >= v20 + Yarn
-   Access to a DHIS2 2.40+ instance with the Capture app and Tracker Plugin Configurator

## Setup

### Build the ZIP

```sh
nvm use
yarn install
yarn build   # version is taken from package.json
```

This produces: `./build/bundle/cpr-capture-plugin-VERSION.zip`.

#### Install in DHIS2

1. Upload `./build/bundle/cpr-capture-plugin-VERSION.zip` to your DHIS2 instance (App Management -> Manual Install)
2. Open **Tracker Plugin Configurator** (install from the App Hub if needed).
3. Go to **Dashboard -> Form field plugins**.
4. Click **Add configuration** (repeat for each program: END OF SEASON REPORT, SEASON PLAN TRAINING AND COACHING):

    - **Tracker Programs -> Program**: select the program
    - **Program stage**: leave unselected
    - Click **Next**

5. Click **Add Element**, search for the plugin, and **Add** it.
6. In the plugin row, click **Edit Settings** and set:

    - **Field**: `Season for PROGRAM`
    - **Plugin Alias**: `season`
    - Click **Add**, then **Save**

#### Hide attributes from the native form

The current UI does not support removing an attribute entry directly from the form layout, but we can hide it by editing the data entry form configuration:

1. Open **Datastore Management** app.
2. In the left sidebar, navigate to: `capture -> dataEntryForms -> PROGRAM_ID`.
3. In the `elements` array, locate the TEA we want to hide (i.e. the **Season** attribute)
4. Click **Save**.

**NOTE:** When using the Tracker Plugin Configuration for a program, the registration form of the program (Attributes -> Create registration form -> Section) will be ignored. The layout that will be used is the one in the plugin configuration (persisted in the data store).

## Development

1. Start the dev server:

```sh
yarn start
```

2. In **Tracker Plugin Configurator**, click **Add Local Plugin** and set:

    - **Plugin Launch URL**: `http://localhost:3000/plugin.html`

3. Make sure the app URL includes the `season` parameter when creating a new enrollment, for example:

```
http://localhost:8080/#/semi-annual-report?season=2025-2026&orgUnitId=ilhdId46wn1&teiId=DVETKZYY7mv
```

Note: in development the plugin will not work, even when pointing at the production Capture plugin, because of cross-origin restrictions (host matches, port does not). A workaround would be to use `window.postMessage.` Currently, you must test in an installed app where the app and plugin run on the same origin.
