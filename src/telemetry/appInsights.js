import { ApplicationInsights } from '@microsoft/applicationinsights-web';
import { ReactPlugin } from '@microsoft/applicationinsights-react-js';

const connectionString = import.meta.env.VITE_APPINSIGHTS_CONNECTION_STRING;

const reactPlugin = new ReactPlugin();

const appInsights = new ApplicationInsights({
  config: {
    connectionString,
    enableAutoRouteTracking: true,
    extensions: [reactPlugin],
    extensionConfig: {
      [reactPlugin.identifier]: {}
    }
  }
});

if (connectionString) {
  appInsights.loadAppInsights();
}

export { appInsights, reactPlugin };