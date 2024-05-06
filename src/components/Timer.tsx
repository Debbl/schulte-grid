import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { format } from "date-fns";

export interface TimerRef {
  start: () => () => void;
  stop: () => void;
  reset: () => void;
}
interface Props {}

// eslint-disable-next-line react/display-name
export const Timer = forwardRef<TimerRef, Props>((_props, ref) => {
  const [time, setTime] = useState("00:00:000");
  const interval = useRef<number>();

  function clear() {
    clearInterval(interval.current);
  }

  function start() {
    const start = Date.now();
    interval.current = setInterval(() => {
      setTime(format(Date.now() - start, "mm:ss:SSS"));
    }, 10) as any as number;

    return () => clear();
  }

  function reset() {
    setTime("00:00:000");
  }

  function stop() {
    clear();
  }

  useImperativeHandle(ref, () => ({ start, stop, reset }));

  useEffect(() => {
    return () => clear();
  }, []);

  return <span>{time}</span>;
});
