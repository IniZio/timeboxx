import { Pause, Play, Square } from "iconoir-react";
import { FC, useCallback, useMemo, useState } from "react";
import { useInterval } from "react-use";

import { Button } from "@/components/Button";
import { cn } from "@/utils";

export interface TimerProps {
  className?: string;
  status?: TimerStatus;
  duration?: number;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export enum TimerStatus {
  STARTED = "STARTED",
  PAUSED = "PAUSED",
  STOPPED = "STOPPED",
}

export function useTimer() {
  const [status, setStatus] = useState(TimerStatus.STOPPED);
  const [startTime, setStartTime] = useState<Date>();
  const [currentDuration, setCurrentDuration] = useState(0);
  const [duration, setDuration] = useState(0);

  useInterval(
    () => {
      if (!startTime) return;

      setCurrentDuration(new Date().getTime() - startTime.getTime());
    },
    status === TimerStatus.STARTED ? 1000 : null,
  );

  const start = useCallback(() => {
    setStartTime(new Date());
    setStatus(TimerStatus.STARTED);
  }, []);
  const pause = useCallback(() => {
    setStartTime(undefined);
    setDuration(duration + currentDuration);
    setCurrentDuration(0);
    setStatus(TimerStatus.PAUSED);
  }, [currentDuration, duration]);
  const stop = useCallback(() => {
    setStartTime(undefined);
    setDuration(0);
    setCurrentDuration(0);
    setStatus(TimerStatus.STOPPED);
  }, []);

  const timerProps = useMemo(
    () => ({ status, duration: duration + currentDuration, onStart: start, onPause: pause, onStop: stop }),
    [currentDuration, duration, pause, start, status, stop],
  );

  return {
    timerProps,
    status,
    start,
    pause,
    stop,
  };
}

function getTimeFromDuration(ms: number) {
  const totalSeconds = Math.ceil(ms / 1000);

  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
  const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    seconds,
    minutes,
    hours,
    days,
  };
}

export const Timer: FC<TimerProps> = ({ status, duration, onPause, onStop, onStart, className }) => {
  const time = useMemo(() => (duration ? getTimeFromDuration(duration) : undefined), [duration]);

  return (
    <div className={cn("flex space-x-2", className)}>
      {status !== TimerStatus.STARTED && (
        <Button onPress={onStart}>
          <Play />
        </Button>
      )}

      {status === TimerStatus.STARTED && (
        <>
          <Button onPress={onPause}>
            <Pause />
          </Button>
        </>
      )}

      {status !== TimerStatus.STOPPED && (
        <Button onPress={onStop}>
          <Square />
        </Button>
      )}

      {time && (
        <div className="flex space-x-2">
          {time.days > 0 && <div>{time.days}d</div>}
          {time.hours > 0 && <div>{time.hours}h</div>}
          {time.minutes > 0 && <div>{time.minutes}m</div>}
          {time.seconds > 0 && <div>{time.seconds}s</div>}
        </div>
      )}
    </div>
  );
};
