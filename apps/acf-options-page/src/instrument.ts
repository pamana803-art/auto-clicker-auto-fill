import * as Sentry from '@sentry/react';
Sentry.init({
  dsn: 'https://23ec1ed44876c4cbe18082f514cc5901@o4506036997455872.ingest.us.sentry.io/4506037629943808',
  integrations: [],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 0,
  // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
  tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],
  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 0,
});
