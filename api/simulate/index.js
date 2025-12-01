const appInsights = require('applicationinsights');

// Initialize Application Insights using connection string from env
const connStr = process.env.APPLICATIONINSIGHTS_CONNECTION_STRING;
if (connStr) {
  appInsights.setup(connStr)
    .setAutoCollectRequests(true)
    .setAutoCollectDependencies(true)
    .setAutoCollectExceptions(true)
    .setAutoCollectConsole(true, true)
    .setSendLiveMetrics(false)
    .start();
}

const client = appInsights.defaultClient || null;

module.exports = async function (context, req) {
  const type = (req.query && req.query.type) || 'ok';

  // Track custom event
  try {
    client && client.trackEvent({ name: 'FunctionSimulateInvoked', properties: { type } });
  } catch (e) {
    // ignore telemetry errors
  }

  if (type === 'slow') {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    context.res = {
      status: 200,
      headers: { 'content-type': 'application/json' },
      body: { status: 'slow' }
    };
    return;
  }

  if (type === 'failed') {
    context.res = {
      status: 500,
      headers: { 'content-type': 'application/json' },
      body: { status: 'failed' }
    };
    return;
  }

  context.res = {
    status: 200,
    headers: { 'content-type': 'application/json' },
    body: { status: 'ok' }
  };
};