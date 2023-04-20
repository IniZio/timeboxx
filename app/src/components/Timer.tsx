import { Pause, Play, Square } from "iconoir-react";
import { FC, useCallback, useMemo, useState } from "react";
import { useInterval } from "react-use";

import { Button } from "@/components/Button";
import { cn } from "@/utils";

import { getTimeFromDuration } from "./getTimeFromDuration";

export interface TimerProps {
  className?: string;
  status?: TimerStatus;
  duration?: number;
  disabled?: boolean;
  onStart?: () => void;
  onPause?: () => void;
  onStop?: () => void;
}

export enum TimerStatus {
  Started = "STARTED",
  Paused = "PAUSED",
  Stopped = "STOPPED",
}

export function useTimer({
  status: initialStatus,
  duration: initialDuration,
  startTime: initialStartTime,
  onStart,
  onStop,
  onPause,
  onResume,
}: {
  status?: Maybe<TimerStatus>;
  duration?: Maybe<number>;
  startTime?: Maybe<Date>;
  onStart?: () => void;
  onStop?: (duration: number) => void;
  onPause?: (duration: number) => void;
  onResume?: () => void;
} = {}) {
  const [status, setStatus] = useState(initialStatus ?? TimerStatus.Stopped);
  const [startTime, setStartTime] = useState<Date | undefined>(initialStartTime ?? undefined);
  const [currentDuration, setCurrentDuration] = useState(0);
  const [duration, setDuration] = useState(initialDuration ?? 0);

  useInterval(
    () => {
      if (!startTime) return;

      setCurrentDuration(new Date().getTime() - startTime.getTime());
    },
    status === TimerStatus.Started ? 1000 : null,
  );

  const start = useCallback(() => {
    if (status === TimerStatus.Paused) onResume?.();
    if (status === TimerStatus.Stopped) {
      setDuration(0);
      onStart?.();
    }

    setStartTime(new Date());
    setStatus(TimerStatus.Started);
  }, [onResume, onStart, status]);

  const pause = useCallback(() => {
    const newDuration = duration + currentDuration;
    onPause?.(newDuration);
    setStartTime(undefined);
    setDuration(newDuration);
    setCurrentDuration(0);
    setStatus(TimerStatus.Paused);
  }, [currentDuration, duration, onPause]);

  const stop = useCallback(() => {
    const totalDuration = duration + currentDuration;
    onStop?.(totalDuration);
    setStartTime(undefined);
    setDuration(0);
    setCurrentDuration(0);
    setStatus(TimerStatus.Stopped);
  }, [currentDuration, duration, onStop]);

  const timerProps = useMemo(
    () => ({ status, duration: duration + currentDuration, onStart: start, onPause: pause, onStop: stop }),
    [currentDuration, duration, pause, start, status, stop],
  );

  return {
    timerProps,
    status,
    duration,
    start,
    pause,
    stop,
  };
}

export const Timer: FC<TimerProps> = ({ status, duration, onPause, onStop, onStart, disabled, className }) => {
  return (
    <div className={cn("flex space-x-2", className)}>
      {!disabled && (
        <>
          {status !== TimerStatus.Started && (
            <Button onPress={onStart}>
              <Play />
            </Button>
          )}

          {status === TimerStatus.Started && (
            <>
              <Button onPress={onPause}>
                <Pause />
              </Button>
            </>
          )}

          {status !== TimerStatus.Stopped && (
            <Button onPress={onStop}>
              <Square />
            </Button>
          )}
        </>
      )}

      <DurationField duration={duration} />
    </div>
  );
};

export const DurationField = ({ duration }: { duration: number | undefined }) => {
  const time = useMemo(() => (duration ? getTimeFromDuration(duration) : undefined), [duration]);

  if (!time) return null;

  return (
    <div className="flex space-x-2">
      {time.days > 0 && <div>{time.days}d</div>}
      {time.hours > 0 && <div>{time.hours}h</div>}
      {time.minutes > 0 && <div>{time.minutes}m</div>}
      {time.seconds > 0 && <div>{time.seconds}s</div>}
    </div>
  );
};
