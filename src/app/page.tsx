'use client';

import { useEffect, useState } from 'react';

// Import both landing pages
import OldLandingPage from './(marketing)/LandingPage';
import NewLandingPage from './(marketing)/NewLandingPage';

export default function Page() {
  const [useNewLanding, setUseNewLanding] = useState(false);

  useEffect(() => {
    // Check feature flag
    const newLandingEnabled = process.env.NEXT_PUBLIC_NEW_LANDING === '1';
    setUseNewLanding(newLandingEnabled);
  }, []);

  // Return appropriate landing based on feature flag
  return useNewLanding ? <NewLandingPage /> : <OldLandingPage />;
}
