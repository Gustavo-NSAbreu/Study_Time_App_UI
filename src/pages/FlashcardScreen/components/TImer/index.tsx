import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, Text, View } from "react-native";
import { TimerContext } from "../../../../contexts/timer.context";

export default function Timer() {

  const { time, isTimerRunning, startTimer, pauseTimer, stopTimer} = useContext(TimerContext);

  return (
    <View className='items-center justify-center my-12 z-50'>
      <Text className="mb-12 text-8xl">{time}</Text>
        {isTimerRunning ? (
          <View className='flex-row gap-6'>
            <Pressable
              onPress={pauseTimer} 
              className="justify-center items-center h-10 w-40 rounded-md bg-red-700 shadow-sm active:bg-red-950 active:shadow-md transition-all duration-300 ease-in-out"
            >
              <Text className="text-gray-50">Pausar</Text>
            </Pressable>
            <Pressable
              onPress={stopTimer}
              className="justify-center items-center h-10 w-40 rounded-md bg-gray-700 shadow-sm active:bg-black active:shadow-md transition-all duration-300 ease-in-out"
            >
              <Text className="text-gray-50">Parar</Text>
            </Pressable>
          </View>
        ) : (
          <Pressable 
            onPress={startTimer}
            className="justify-center items-center h-10 w-80 rounded-md bg-emerald-500 shadow-sm active:bg-green-900 active:shadow-md transition-all duration-300 ease-in-out"
          >
            <Text className="text-gray-50">Iniciar cronômetro</Text>
          </Pressable>
        )}
    </View>
  );
}