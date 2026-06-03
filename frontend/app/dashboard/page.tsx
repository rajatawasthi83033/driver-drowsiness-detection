'use client';

import {
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';

import { Navbar } from '@/components/navbar';
import { VideoFeed } from '@/components/video-feed';
import { StatusCard } from '@/components/status-card';
import { MetricsPanel } from '@/components/metrics-panel';
import { ControlPanel } from '@/components/control-panel';
import { AlertPopup } from '@/components/alert-popup';

import apiService, {
  type DetectionStatus,
} from '@/services/api';

export default function DashboardPage() {
  const [status, setStatus] =
    useState<DetectionStatus | null>(
      null
    );

  const [isConnected, setIsConnected] =
    useState(false);

  const [isRunning, setIsRunning] =
    useState(false);

  const [showAlert, setShowAlert] =
    useState(false);

  const videoRef =
    useRef<HTMLVideoElement>(null);

  const checkConnection =
    useCallback(async () => {
      const connected =
        await apiService.checkConnection();

      setIsConnected(connected);

      return connected;
    }, []);

  const detectFrame =
    useCallback(async () => {
      if (
        !videoRef.current ||
        !isRunning ||
        !isConnected
      )
        return;

      const video = videoRef.current;

      if (
        video.videoWidth === 0 ||
        video.videoHeight === 0
      )
        return;

      const canvas =
        document.createElement(
          'canvas'
        );

      canvas.width =
        video.videoWidth;

      canvas.height =
        video.videoHeight;

      const ctx =
        canvas.getContext('2d');

      if (!ctx) return;

      ctx.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
      );

      const image =
        canvas.toDataURL(
          'image/jpeg'
        );

      const response =
        await apiService.detect(
          image
        );

      if (
        response.success &&
        response.data
      ) {
        setStatus(response.data);

        if (
          response.data.state ===
            'Dangerous' ||
          response.data.alarm
        ) {
          setShowAlert(true);
        }
      }
    }, [
      isConnected,
      isRunning,
    ]);

  useEffect(() => {
    checkConnection();

    const interval =
      setInterval(
        checkConnection,
        10000
      );

    return () =>
      clearInterval(interval);
  }, [checkConnection]);

  useEffect(() => {
    if (
      !isRunning ||
      !isConnected
    )
      return;

    const interval =
      setInterval(
        detectFrame,
        700
      );

    return () =>
      clearInterval(interval);
  }, [
    detectFrame,
    isRunning,
    isConnected,
  ]);

  const handleStatusChange = (
    running: boolean
  ) => {
    setIsRunning(running);

    if (!running) {
      setStatus(null);
    }
  };

  const handleRefresh =
    async () => {
      await checkConnection();
    };

  return (
    <div className="min-h-screen pb-8">
      <Navbar />

      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Monitoring Dashboard
            </h1>

            <p className="text-muted-foreground">
              Real-time driver
              drowsiness detection
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <VideoFeed
                ref={videoRef}
                isRunning={isRunning}
                isConnected={
                  isConnected
                }
              />

              <div className="grid grid-cols-3 gap-4">
                <QuickStat
                  label="EAR"
                  value={
                    status?.ear?.toFixed(
                      3
                    ) || '---'
                  }
                  status={getEarStatus(
                    status?.ear
                  )}
                />

                <QuickStat
                  label="MAR"
                  value={
                    status?.mar?.toFixed(
                      3
                    ) || '---'
                  }
                  status={getMarStatus(
                    status?.mar
                  )}
                />

                <QuickStat
                  label="Risk"
                  value={
                    status?.sleep_risk
                      ? 'HIGH'
                      : 'LOW'
                  }
                  status={
                    status?.sleep_risk
                      ? 'danger'
                      : 'safe'
                  }
                />
              </div>
            </div>

            <div className="space-y-6">
              <StatusCard
                status={status}
                isConnected={
                  isConnected
                }
              />

              <MetricsPanel
                status={status}
                isConnected={
                  isConnected
                }
              />

              <ControlPanel
                isRunning={
                  isRunning
                }
                isConnected={
                  isConnected
                }
                onStatusChange={
                  handleStatusChange
                }
                onRefresh={
                  handleRefresh
                }
              />
            </div>
          </div>
        </div>
      </main>

      {showAlert && (
        <AlertPopup
          status={status}
          onDismiss={() =>
            setShowAlert(false)
          }
        />
      )}
    </div>
  );
}

function getEarStatus(
  ear?: number
): 'safe' | 'warning' | 'danger' {
  if (ear === undefined)
    return 'safe';

  if (ear > 0.25)
    return 'safe';

  if (ear > 0.20)
    return 'warning';

  return 'danger';
}

function getMarStatus(
  mar?: number
): 'safe' | 'warning' | 'danger' {
  if (mar === undefined)
    return 'safe';

  if (mar < 0.5)
    return 'safe';

  if (mar < 0.6)
    return 'warning';

  return 'danger';
}

interface QuickStatProps {
  label: string;
  value: string;
  status:
    | 'safe'
    | 'warning'
    | 'danger';
}

function QuickStat({
  label,
  value,
  status,
}: QuickStatProps) {
  const colors = {
    safe:
      'border-green-500/30 bg-green-500/10 text-green-400',
    warning:
      'border-yellow-500/30 bg-yellow-500/10 text-yellow-400',
    danger:
      'border-red-500/30 bg-red-500/10 text-red-400',
  };

  return (
    <div
      className={`glass-card rounded-xl p-4 border ${colors[status]}`}
    >
      <div className="text-xs uppercase mb-1">
        {label}
      </div>

      <div className="text-2xl font-bold font-mono">
        {value}
      </div>
    </div>
  );
}
