'use client';

import { Button, ButtonProps } from './button';
import { trackEvent } from '@/components/Analytics';

interface TrackedButtonProps extends ButtonProps {
  eventName?: string;
  eventParams?: Record<string, any>;
}

export function TrackedButton({ 
  eventName, 
  eventParams, 
  onClick,
  children,
  ...props 
}: TrackedButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (eventName) {
      trackEvent(eventName, eventParams);
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Button {...props} onClick={handleClick}>
      {children}
    </Button>
  );
}
