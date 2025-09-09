interface AnalyticsEvent {
  eventName: string;
  params?: Record<string, any>;
}

class Analytics {
  private hasConsent(): boolean {
    // Check for cookie consent
    return typeof window !== 'undefined' && localStorage.getItem('analytics-consent') === 'true';
  }

  track(eventName: string, params?: Record<string, any>) {
    // Console log for development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, params);
    }

    // Only send if consent given
    if (!this.hasConsent()) {
      return;
    }

    // Google Analytics 4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, params);
    }

    // Plausible
    if (typeof window !== 'undefined' && (window as any).plausible) {
      (window as any).plausible(eventName, { props: params });
    }
  }

  // Predefined events
  trackStatClick(statType: string, targetPath: string) {
    this.track('dashboard_stat_click', {
      stat_type: statType,
      target_path: targetPath,
    });
  }

  trackQuickAction(actionType: string, targetPath: string) {
    this.track('dashboard_quick_action_click', {
      action_type: actionType,
      target_path: targetPath,
    });
  }

  trackPageView(path: string) {
    this.track('page_view', {
      page_path: path,
    });
  }
}

export const analytics = new Analytics();
