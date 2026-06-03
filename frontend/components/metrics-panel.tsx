'use client';

import type { DetectionStatus } from '@/services/api';

interface MetricsPanelProps {
  status: DetectionStatus | null;
  isConnected: boolean;
}

export function MetricsPanel({
  status,
  isConnected,
}: MetricsPanelProps) {
  return (
    <div className="glass-card rounded-xl p-5">
      <h3 className="text-lg font-semibold mb-4">
        Live Metrics
      </h3>

      {!isConnected ? (
        <div className="text-red-400 text-sm">
          Backend Disconnected
        </div>
      ) : !status ? (
        <div className="text-muted-foreground text-sm">
          Waiting for camera data...
        </div>
      ) : (
        <div className="space-y-4">

          {/* EAR */}
          <div>
            <div className="flex justify-between mb-1">
              <span>EAR</span>
              <span className="font-mono">
                {status.ear.toFixed(3)}
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    status.ear * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* MAR */}
          <div>
            <div className="flex justify-between mb-1">
              <span>MAR</span>
              <span className="font-mono">
                {status.mar.toFixed(3)}
              </span>
            </div>

            <div className="w-full bg-secondary rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all"
                style={{
                  width: `${Math.min(
                    status.mar * 100,
                    100
                  )}%`,
                }}
              />
            </div>
          </div>

          {/* Sleep Risk */}
          <div className="pt-2">
            <div className="flex justify-between">
              <span>Sleep Risk</span>

              <span
                className={
                  status.sleep_risk
                    ? 'text-red-400 font-semibold'
                    : 'text-green-400 font-semibold'
                }
              >
                {status.sleep_risk
                  ? 'HIGH'
                  : 'LOW'}
              </span>
            </div>
          </div>

          {/* State */}
          <div className="pt-2 border-t border-border">
            <div className="flex justify-between">
              <span>State</span>

              <span
                className={
                  status.state === 'Dangerous'
                    ? 'text-red-400 font-semibold'
                    : status.state === 'Drowsy'
                    ? 'text-yellow-400 font-semibold'
                    : 'text-green-400 font-semibold'
                }
              >
                {status.state}
              </span>
            </div>
          </div>

          {/* Alarm */}
          <div className="flex justify-between">
            <span>Alarm</span>

            <span
              className={
                status.alarm
                  ? 'text-red-400 font-semibold'
                  : 'text-green-400 font-semibold'
              }
            >
              {status.alarm ? 'ON' : 'OFF'}
            </span>
          </div>

        </div>
      )}
    </div>
  );
}
