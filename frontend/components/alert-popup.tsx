'use client';

import { useEffect, useState, useRef } from 'react';
import { AlertTriangle, X, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { DetectionStatus } from '@/services/api';

interface AlertPopupProps {
  status: DetectionStatus | null;
  onDismiss: () => void;
}

const ALARM_URL =
  'https://driver-drowsiness-detection-frgy.onrender.com/static/alarm_sound.mp3';

export function AlertPopup({
  status,
  onDismiss,
}: AlertPopupProps) {
  const [isVisible, setIsVisible] = useState(false);

  const audioRef =
    useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio(ALARM_URL);
    audioRef.current.loop = true;

    return () => {
      audioRef.current?.pause();

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }

      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const isDanger =
      status?.state === 'Dangerous' ||
      status?.sleep_risk;

    if (isDanger) {
      setIsVisible(true);

      audioRef.current
        ?.play()
        .catch((err) => {
          console.error(
            'Audio play blocked:',
            err
          );
        });
    } else {
      audioRef.current?.pause();

      if (audioRef.current) {
        audioRef.current.currentTime = 0;
      }

      setIsVisible(false);
    }
  }, [status]);

  const handleClose = () => {
    audioRef.current?.pause();

    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }

    setIsVisible(false);

    onDismiss();
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="relative w-full max-w-md mx-4">
        <div className="absolute inset-0 bg-red-500/20 rounded-2xl animate-pulse" />

        <div className="relative glass-card rounded-2xl border-2 border-red-500 p-6 neon-border-red">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center animate-pulse">
                <AlertTriangle className="w-10 h-10 text-red-500" />
              </div>

              <div className="absolute inset-0 rounded-full bg-red-500/30 blur-xl animate-pulse" />
            </div>

            <h2 className="text-2xl font-bold text-red-400 mb-2">
              DROWSINESS ALERT!
            </h2>

            <p className="text-muted-foreground mb-6">
              Dangerous levels of drowsiness detected.
              Please pull over safely and take a break immediately.
            </p>

            <div className="flex gap-3 w-full">
              <Button
                variant="outline"
                className="flex-1 gap-2 border-red-500/50 text-red-400 hover:bg-red-500/10"
                onClick={handleClose}
              >
                <Volume2 className="w-4 h-4" />
                I'm Awake
              </Button>

              <Button
                className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                onClick={handleClose}
              >
                Dismiss Alert
              </Button>
            </div>

            <p className="mt-4 text-xs text-red-400/70">
              Your safety is our priority.
              Take regular breaks every 2 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
