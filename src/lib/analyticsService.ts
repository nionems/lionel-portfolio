import { analytics } from './firebase';
import { logEvent } from 'firebase/analytics';

export const trackPageView = (pageName: string) => {
  if (analytics) {
    logEvent(analytics, 'page_view', {
      page_name: pageName,
      page_title: document.title,
    });
  }
};

export const trackContactFormSubmission = () => {
  if (analytics) {
    logEvent(analytics, 'contact_form_submission', {
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackSocialLinkClick = (platform: string) => {
  if (analytics) {
    logEvent(analytics, 'social_link_click', {
      platform,
      timestamp: new Date().toISOString(),
    });
  }
};

export const trackThemeToggle = (theme: 'light' | 'dark') => {
  if (analytics) {
    logEvent(analytics, 'theme_toggle', {
      theme,
      timestamp: new Date().toISOString(),
    });
  }
}; 