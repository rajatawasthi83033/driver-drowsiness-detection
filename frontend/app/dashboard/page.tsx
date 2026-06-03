'use client';

import { useState, useEffect, useCallback } from 'react';
import { Navbar } from '@/components/navbar';
import { VideoFeed } from '@/components/video-feed';
import { StatusCard } from '@/components/status-card';
import { MetricsPanel } from '@/components/metrics-panel';
import { ControlPanel } from '@/components/control-panel';
import { AlertPopup } from '@/components/alert-popup';
import apiService, { type DetectionStatus } from '@/services/api';

export default function DashboardPage() {
  const [status, setStatus] = useState<DetectionStatus | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  // Check connection status
  const checkConnection = useCallback(async () => {
    const connected = await apiService.checkConnection();
    setIsConnected(connected);
    return connected;
  }, []);

  // Fetch status from backend
  const fetchStatus = useCallback(async () => {
    if (!isConnected || !isRunning) return;
    
    const response = await apiService.getStatus();
    if (response.success && response.data) {
      setStatus(response.data);
      
      // Trigger alert if dangerous
      if (response.data.state === 'Dangerous' || response.data.alarm) {
        setShowAlert(true);
      }
    }
  }, [isConnected, isRunning]);

  // Initial connection check
  useEffect(() => {
    checkConnection();
    
    // Check connection every 10 seconds
    const connectionInterval = setInterval(checkConnection, 10000);
    return () => clearInterval(connectionInterval);
  }, [checkConnection]);

  // Poll for status updates when running
  useEffect(() => {
    if (!isRunning || !isConnected) return;
    
    // Poll every 500ms for real-time updates
    const statusInterval = setInterval(fetchStatus, 500);
    return () => clearInterval(statusInterval);
  }, [isRunning, isConnected, fetchStatus]);

  const handleStatusChange = (running: boolean) => {
    setIsRunning(running);
    if (!running) {
      setStatus(null);
    }
  };

  const handleRefresh = async () => {
    await checkConnection();
    if (isRunning) {
      await fetchStatus();
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
    <div className="min-h-screen pb-8">
      <Navbar />
      
      <main className="pt-24 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Monitoring Dashboard</h1>
            <p className="text-muted-foreground">
              Real-time driver drowsiness detection and monitoring system
            </p>
          </div>

          {/* Main Grid */}
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left Column - Video Feed */}
            <div className="lg:col-span-2 space-y-6">
              <VideoFeed isRunning={isRunning} isConnected={isConnected} />
              
              {/* Quick Stats Bar */}
              <div className="grid grid-cols-3 gap-4">
                <QuickStat 
                  label="EAR" 
                  value={status?.ear?.toFixed(3) || '---'} 
                  status={getEarStatus(status?.ear)}
                />
                <QuickStat 
                  label="MAR" 
                  value={status?.mar?.toFixed(3) || '---'} 
                  status={getMarStatus(status?.mar)}
                />
                <QuickStat 
                  label="Risk" 
                  value={status?.sleep_risk ? 'HIGH' : 'LOW'} 
                  status={status?.sleep_risk ? 'danger' : 'safe'}
                />
              </div>
            </div>

            {/* Right Column - Controls & Status */}
            <div className="space-y-6">
              <StatusCard status={status} isConnected={isConnected} />
              <MetricsPanel status={status} isConnected={isConnected} />
              <ControlPanel 
                isRunning={isRunning}
                isConnected={isConnected}
                onStatusChange={handleStatusChange}
                onRefresh={handleRefresh}
              />
            </div>
          </div>

          {/* Info Banner */}
          <div className="mt-8 glass-card rounded-xl p-6">
            <h3 className="text-lg font-semibold mb-2">How to Use</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-safe/20 text-safe flex items-center justify-center text-xs font-bold">1</span>
                <p>Ensure your Python backend is running with the drowsiness detection model loaded.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-safe/20 text-safe flex items-center justify-center text-xs font-bold">2</span>
                <p>Click &quot;Start&quot; to begin real-time monitoring of the driver&apos;s face.</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-safe/20 text-safe flex items-center justify-center text-xs font-bold">3</span>
                <p>The system will automatically alert you if drowsiness is detected.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Alert Popup */}
      {showAlert && (
        <AlertPopup status={status} onDismiss={handleAlertDismiss} />
      )}
    </div>
  );
}

// Helper function for EAR status
function getEarStatus(ear?: number): 'safe' | 'warning' | 'danger' {
  if (ear === undefined) return 'safe';
  if (ear > 0.25) return 'safe';
  if (ear > 0.20) return 'warning';
  return 'danger';
}

// Helper function for MAR status
function getMarStatus(mar?: number): 'safe' | 'warning' | 'danger' {
  if (mar === undefined) return 'safe';
  if (mar < 0.5) return 'safe';
  if (mar < 0.6) return 'warning';
  return 'danger';
}

// Quick Stat Component
interface QuickStatProps {
  label: string;
  value: string;
  status: 'safe' | 'warning' | 'danger';
}

function QuickStat({ label, value, status }: QuickStatProps) {
  const statusColors = {
    safe: 'border-green-500/30 bg-green-500/10',
    warning: 'border-yellow-500/30 bg-yellow-500/10',
    danger: 'border-red-500/30 bg-red-500/10',
  };

  const textColors = {
    safe: 'text-green-400',
    warning: 'text-yellow-400',
    danger: 'text-red-400',
  };

  return (
    <div className={`glass-card rounded-xl p-4 border ${statusColors[status]}`}>
      <div className="text-xs text-muted-foreground uppercase tracking-wider mb-1">
        {label}
      </div>
      <div className={`text-2xl font-mono font-bold ${textColors[status]}`}>
        {value}
      </div>
    </div>
  );
}
