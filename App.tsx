import React from 'react';
import Router from './src/Router';
import { NativeWindStyleSheet } from "nativewind";

NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <Router />
  );
}
