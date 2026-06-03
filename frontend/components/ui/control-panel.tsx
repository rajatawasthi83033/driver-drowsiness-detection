'use client';

import { useState } from 'react';
import { Play, Square, Volume2, VolumeX, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import apiService from '@/services/api';

interface ControlPanelProps {
  isRunning: boolean;
  isConnected: boolean;
  onStatusChange: (running: boolean) => void;
  onRefresh: () => void;
}

export function ControlPanel({ 
  isRunning, 
  isConnected, 
  onStatusChange,
  onRefresh 
}: ControlPanelProps) {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleStart = async () => {
    setIsLoading(true);
    const response = await apiService.startDetection();
    if (response.success) {
      onStatusChange(true);
    }
    setIsLoading(false);
  };

  const handleStop = async () => {
    setIsLoading(true);
    const response = await apiService.stopDetection();
    if (response.success) {
      onStatusChange(false);
    }
    setIsLoading(false);
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Control Panel
      </h3>
      
      <div className="space-y-4">
        {/* Main Controls */}
        <div className="flex gap-3">
          <Button
            onClick={handleStart}
            disabled={isRunning || !isConnected || isLoading}
            className={cn(
              'flex-1 gap-2',
              !isRunning && isConnected && 'bg-green-600 hover:bg-green-700 text-white'
            )}
          >
            <Play className="w-4 h-4" />
            Start
          </Button>
          
          <Button
            onClick={handleStop}
            disabled={!isRunning || !isConnected || isLoading}
            variant="destructive"
            className="flex-1 gap-2"
          >
            <Square className="w-4 h-4" />
            Stop
          </Button>
        </div>

        {/* Secondary Controls */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="flex-1 gap-2"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
            {soundEnabled ? 'Sound On' : 'Sound Off'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onRefresh}
            className="flex-1 gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </Button>
        </div>

        {/* Connection Status */}
        <div className={cn(
          'p-3 rounded-lg border text-center text-sm',
          isConnected 
            ? 'bg-green-500/10 border-green-500/30 text-green-400' 
            : 'bg-red-500/10 border-red-500/30 text-red-400'
        )}>
          {isConnected ? (
            <>
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse" />
              Backend Connected
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2" />
              Backend Disconnected
            </>
          )}
        </div>

        {/* Running Indicator */}
        {isRunning && (
          <div className="p-3 bg-safe/10 border border-safe/30 rounded-lg text-center">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm text-green-400 font-medium">
                Detection Active
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
