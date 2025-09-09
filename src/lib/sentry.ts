import * as Sentry from '@sentry/nextjs';

export function initSentry() {
  const dsn = process.env.NEXT_PUBLIC_SENTRY_DSN;

  if (dsn) {
    Sentry.init({
      dsn,
      environment: process.env.NODE_ENV,
      tracesSampleRate: process.env.NODE_ENV === 'production' ? 0.1 : 1.0,
      beforeSend(event) {
        // Remove PII
        if (event.user) {
          delete event.user.email;
          delete event.user.ip_address;
        }
        if (event.request?.cookies) {
          delete event.request.cookies;
        }
        return event;
      },
    });
  }
}
