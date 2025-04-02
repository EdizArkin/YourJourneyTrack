import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Settings as SettingsIcon } from 'lucide-react';
import { TimerSettings } from '../types';

interface TimerProps {
  onComplete: () => void;
}

export function Timer({ onComplete }: TimerProps) {
  const [settings, setSettings] = useState<TimerSettings>({
    duration: 30
  });
  const [timeLeft, setTimeLeft] = useState(settings.duration * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    let interval: number;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((time) => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft, onComplete]);

  const toggleTimer = () => setIsRunning(!isRunning);
  
  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(settings.duration * 60);
  };

  const updateDuration = (newDuration: number) => {
    setSettings({ ...settings, duration: newDuration });
    setTimeLeft(newDuration * 60);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="relative">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-emerald-600">YourJourneyTrack</h1>
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="text-gray-500 hover:text-gray-700"
        >
          <SettingsIcon className="w-5 h-5" />
        </button>
      </div>

      {showSettings && (
        <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg p-4 z-20">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Pomodoro Süresi (dakika)
          </label>
          <input
            type="number"
            value={settings.duration}
            onChange={(e) => updateDuration(Number(e.target.value))}
            min="1"
            max="60"
            className="w-full p-2 border border-gray-300 rounded-lg mb-2"
          />
        </div>
      )}

      <div className="text-6xl font-bold text-center mb-4">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      <div className="flex justify-center space-x-4">
        <button
          onClick={toggleTimer}
          className="bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors flex items-center"
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          <span className="ml-2">{isRunning ? 'Pause' : 'Start'}</span>
        </button>
        <button
          onClick={resetTimer}
          className="bg-gray-200 text-gray-700 px-6 py-2 rounded-full hover:bg-gray-300 transition-colors flex items-center"
        >
          <RotateCcw className="w-5 h-5" />
          <span className="ml-2">Reset</span>
        </button>
      </div>
    </div>
  );
}