import React from 'react';
import Router from './src/Router';
import { NativeWindStyleSheet } from "nativewind";
import TimerProvider from './src/contexts/timer.context';

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <TimerProvider>
      <Router />
    </TimerProvider>
  );
}
