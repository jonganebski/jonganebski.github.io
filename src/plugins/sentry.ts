import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/vue';
import { sentryDsn } from '~/libs/env';
import { Plugin } from './@types';

export const install: Plugin = ({ isClient, router, app }) => {
  if (!import.meta.env.PROD || !isClient) return;

  Sentry.init({
    app,
    dsn: sentryDsn,
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['https://jonganebski.github.io/', /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1,
  });
};
