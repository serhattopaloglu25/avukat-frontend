'use client';

import React from 'react';
import { Button, ButtonProps } from './button';

interface TrackedButtonProps extends ButtonProps {
  eventName?: string;
  eventParams?: Record<string, any>;
}

function trackEvent(name: string, params?: Record<string, any>) {
  if (typeof window !== 'undefined') {
    console.log('Track event:', name, params);
  }
}

export const TrackedButton = React.forwardRef<HTMLButtonElement, TrackedButtonProps>(
  ({ eventName, eventParams, onClick, ...props }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (eventName) {
        trackEvent(eventName, eventParams || {});
      }
      if (onClick) {
        onClick(e);
      }
    };

    return <Button ref={ref} onClick={handleClick} {...props} />;
  }
);

TrackedButton.displayName = 'TrackedButton';
