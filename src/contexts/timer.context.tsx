import { createContext, useEffect, useState } from "react";

interface TimerContextData {
  time: string;
  formatTime: () => void;
  timer: number;
  isTimerRunning: boolean;
  runTimer: () => void;
  startTimer: () => void;
  pauseTimer: () => void;
  stopTimer: () => void;
}

export const TimerContext = createContext({} as TimerContextData);

interface TimerProviderProps {
  children: React.ReactNode;
}

export default function TimerProvider({ children }: TimerProviderProps) {

  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);

  const [time, setTime] = useState<string>('0:0');

  function formatTime() {
    const hours = Math.floor(timer / 3600);
    const remainingMinutes = Math.floor(timer / 60) % 60;
    console.log(`formatted time: ${hours}:${remainingMinutes}`);
    setTime(`${hours}:${remainingMinutes}`);
  }

  function startTimer() {
    setIsTimerRunning(true);
  }

  function pauseTimer() {
    setIsTimerRunning(false);
  }

  function stopTimer() {
    setIsTimerRunning(false);
    setTimer(0);
    setTime('0:0');
  }

  function runTimer() {
    setTimer(prevTime => prevTime + 1);
  }

  return (
      <TimerContext.Provider value={{
          time,
          formatTime,
          timer,
          isTimerRunning,
          runTimer,
          startTimer,
          pauseTimer,
          stopTimer
      }}>
          {children}
      </TimerContext.Provider>
  );
}