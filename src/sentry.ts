import { BrowserTracing } from '@sentry/tracing';
import * as Sentry from '@sentry/vue';
import type { ViteSSGContext } from 'vite-ssg';

export function initSentry({ app, router }: ViteSSGContext<true>) {
  Sentry.init({
    app,
    dsn: 'https://2f8e9916dfd44461a2ab9f895d6b641b@o1227492.ingest.sentry.io/6373105',
    integrations: [
      new BrowserTracing({
        routingInstrumentation: Sentry.vueRouterInstrumentation(router),
        tracingOrigins: ['https://jonganebski.github.io/', /^\//],
      }),
    ],
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 0.5,
  });
}
