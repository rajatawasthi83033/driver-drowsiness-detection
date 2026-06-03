'use client';

import { cn } from '@/lib/utils';
import type { DetectionStatus } from '@/services/api';

interface StatusCardProps {
  status: DetectionStatus | null;
  isConnected: boolean;
}

type DriverState =
  | 'Safe'
  | 'Drowsy'
  | 'Dangerous';

export function StatusCard({
  status,
  isConnected,
}: StatusCardProps) {

  const stateConfig: Record<
    DriverState,
    {
      color: string;
      bg: string;
      border: string;
      glow: string;
      label: string;
      description: string;
    }
  > = {
    Safe: {
      color: 'text-green-400',
      bg: 'bg-green-500/10',
      border: 'border-green-500/30',
      glow: 'neon-border-green',
      label: 'SAFE',
      description: 'Driver is alert and attentive',
    },

    Drowsy: {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      glow: 'neon-border-yellow',
      label: 'DROWSY',
      description: 'Warning: Signs of fatigue detected',
    },

    Dangerous: {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      glow: 'neon-border-red',
      label: 'DANGEROUS',
      description: 'Alert: Immediate attention required!',
    },
  };

  const state: DriverState =
    status?.state === 'Drowsy'
      ? 'Drowsy'
      : status?.state === 'Dangerous'
      ? 'Dangerous'
      : 'Safe';

  const config = stateConfig[state];

  return (
    <div
      className={cn(
        'glass-card rounded-xl p-6 transition-all duration-300',
        config.border,
        isConnected && status ? config.glow : ''
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Driver Status
        </h3>

        <div className="flex items-center gap-2">
          <div
            className={cn(
              'w-2 h-2 rounded-full',
              isConnected
                ? 'bg-green-500 animate-pulse'
                : 'bg-red-500'
            )}
          />

          <span className="text-xs text-muted-foreground">
            {isConnected
              ? 'Connected'
              : 'Disconnected'}
          </span>
        </div>
      </div>

      <div
        className={cn(
          'flex flex-col items-center py-6',
          config.bg,
          'rounded-lg'
        )}
      >
        <div className="relative">
          <div
            className={cn(
              'w-24 h-24 rounded-full border-4 flex items-center justify-center',
              config.border,
              isConnected &&
                status &&
                'animate-pulse-glow',
              config.color
            )}
          >
            <span
              className={cn(
                'text-2xl font-bold',
                config.color
              )}
            >
              {config.label}
            </span>
          </div>

          {isConnected && status && (
            <div
              className={cn(
                'absolute -inset-2 rounded-full opacity-20 blur-xl',
                state === 'Safe' &&
                  'bg-green-500',
                state === 'Drowsy' &&
                  'bg-yellow-500',
                state === 'Dangerous' &&
                  'bg-red-500'
              )}
            />
          )}
        </div>

        <p
          className={cn(
            'mt-4 text-sm text-center',
            config.color
          )}
        >
          {config.description}
        </p>
      </div>

      {status?.sleep_risk && (
        <div className="mt-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-sm text-red-400 text-center font-medium">
            Sleep Risk Detected - Please take a break!
          </p>
        </div>
      )}
    </div>
  );
}