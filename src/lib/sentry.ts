// Sentry integration temporarily disabled
// Will be enabled when @sentry/nextjs is installed

export function initSentry() {
  // Sentry is disabled for now
  // Uncomment and install @sentry/nextjs when ready to use
  
  /*
  import * as Sentry from '@sentry/nextjs';
  
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
  */
  
  if (process.env.NODE_ENV === 'development') {
    console.log('Sentry is currently disabled');
  }
}
