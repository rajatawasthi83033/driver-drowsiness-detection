'use client';

import { cn } from '@/lib/utils';
import { Eye, Mic, Activity } from 'lucide-react';
import type { DetectionStatus } from '@/services/api';

interface MetricsPanelProps {
  status: DetectionStatus | null;
  isConnected: boolean;
}

export function MetricsPanel({ status, isConnected }: MetricsPanelProps) {
  const metrics = [
    {
      label: 'Eye Aspect Ratio (EAR)',
      value: status?.ear?.toFixed(3) || '0.000',
      icon: Eye,
      description: 'Lower values indicate closed eyes',
      threshold: { good: 0.25, warning: 0.20 },
      currentValue: status?.ear || 0,
    },
    {
      label: 'Mouth Aspect Ratio (MAR)',
      value: status?.mar?.toFixed(3) || '0.000',
      icon: Mic,
      description: 'Higher values indicate yawning',
      threshold: { good: 0.5, warning: 0.6 },
      currentValue: status?.mar || 0,
      invertColors: true,
    },
    {
      label: 'Sleep Risk',
      value: status?.sleep_risk ? 'HIGH' : 'LOW',
      icon: Activity,
      description: 'Overall fatigue assessment',
      isBool: true,
      boolValue: status?.sleep_risk || false,
    },
  ];

  const getMetricColor = (metric: typeof metrics[0]) => {
    if (!isConnected || !status) return 'text-muted-foreground';
    
    if (metric.isBool) {
      return metric.boolValue ? 'text-red-400' : 'text-green-400';
    }
    
    const value = metric.currentValue;
    const { good, warning } = metric.threshold!;
    
    if (metric.invertColors) {
      if (value < good) return 'text-green-400';
      if (value < warning) return 'text-yellow-400';
      return 'text-red-400';
    } else {
      if (value > good) return 'text-green-400';
      if (value > warning) return 'text-yellow-400';
      return 'text-red-400';
    }
  };

  const getProgressValue = (metric: typeof metrics[0]) => {
    if (metric.isBool) return metric.boolValue ? 100 : 20;
    
    // Normalize to 0-100 for display
    if (metric.label.includes('EAR')) {
      return Math.min(100, (metric.currentValue / 0.35) * 100);
    }
    if (metric.label.includes('MAR')) {
      return Math.min(100, (metric.currentValue / 1.0) * 100);
    }
    return 50;
  };

  return (
    <div className="glass-card rounded-xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-4">
        Real-time Metrics
      </h3>
      
      <div className="space-y-6">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          const color = getMetricColor(metric);
          const progress = getProgressValue(metric);
          
          return (
            <div key={metric.label} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon className={cn('w-4 h-4', color)} />
                  <span className="text-sm font-medium">{metric.label}</span>
                </div>
                <span className={cn('text-lg font-mono font-bold', color)}>
                  {metric.value}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded-full transition-all duration-500',
                    color.includes('green') && 'bg-green-500',
                    color.includes('yellow') && 'bg-yellow-500',
                    color.includes('red') && 'bg-red-500',
                    color.includes('muted') && 'bg-muted-foreground'
                  )}
                  style={{ width: `${progress}%` }}
                />
              </div>
              
              <p className="text-xs text-muted-foreground">{metric.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
