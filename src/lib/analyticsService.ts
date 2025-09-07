export const trackPageView = async (pageName: string) => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const { analytics } = await import('./firebase');
    const { logEvent } = await import('firebase/analytics');
    
    // Add a small delay to ensure analytics is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_name: pageName,
        page_title: document.title,
      });
    }
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

export const trackContactFormSubmission = async () => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const { analytics } = await import('./firebase');
    const { logEvent } = await import('firebase/analytics');
    
    // Add a small delay to ensure analytics is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (analytics) {
      logEvent(analytics, 'contact_form_submission', {
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

export const trackSocialLinkClick = async (platform: string) => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const { analytics } = await import('./firebase');
    const { logEvent } = await import('firebase/analytics');
    
    // Add a small delay to ensure analytics is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (analytics) {
      logEvent(analytics, 'social_link_click', {
        platform,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.log('Analytics not available:', error);
  }
};

export const trackThemeToggle = async (theme: 'light' | 'dark') => {
  try {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const { analytics } = await import('./firebase');
    const { logEvent } = await import('firebase/analytics');
    
    // Add a small delay to ensure analytics is ready
    await new Promise(resolve => setTimeout(resolve, 100));
    
    if (analytics) {
      logEvent(analytics, 'theme_toggle', {
        theme,
        timestamp: new Date().toISOString(),
      });
    }
  } catch (error) {
    console.log('Analytics not available:', error);
  }
}; 