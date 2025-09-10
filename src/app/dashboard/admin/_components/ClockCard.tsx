'use client';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export default function ClockCard() {
  const [clockedIn, setClockedIn] = useState<boolean>(false);
  const [lastClockIn, setLastClockIn] = useState<string | null>(null);

  function toggle(): void {
    if (!clockedIn) {
      setLastClockIn(new Date().toISOString());
      setClockedIn(true);
      // TODO: call API to create attendance record
    } else {
      setClockedIn(false);
      // TODO: call API to update attendance record with clock_out
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="text-sm text-slate-600">
        Status:{' '}
        <span
          className={`font-semibold ${
            clockedIn ? 'text-green-600' : 'text-slate-600'
          }`}
        >
          {clockedIn ? 'Clocked In' : 'Clocked Out'}
        </span>
      </div>
      <div className="text-xs text-slate-500">
        Last:{' '}
        {lastClockIn ? new Date(lastClockIn).toLocaleString() : '—'}
      </div>
      <Button onClick={toggle}>
        {clockedIn ? 'Clock Out' : 'Clock In'}
      </Button>
    </div>
  );
}
