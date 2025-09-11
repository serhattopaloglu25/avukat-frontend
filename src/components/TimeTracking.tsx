'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Play, Pause, Save, Clock } from 'lucide-react';

export function TimeTracking({ caseId }: { caseId: string }) {
  const [isRunning, setIsRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Clock className="h-5 w-5 text-muted-foreground" />
          <span className="text-2xl font-mono">{formatTime(seconds)}</span>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={isRunning ? "destructive" : "default"}
            onClick={() => setIsRunning(!isRunning)}
          >
            {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          </Button>
          <Button size="sm" variant="outline" disabled={seconds === 0}>
            <Save className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
