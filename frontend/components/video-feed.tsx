'use client';

import {
  useEffect,
  useRef,
  forwardRef,
} from 'react';

import { cn } from '@/lib/utils';
import {
  Camera,
  Wifi,'use client';

import {
useEffect,
useRef,
forwardRef,
} from 'react';

import { cn } from '@/lib/utils';
import {
Camera,
Wifi,
WifiOff,
} from 'lucide-react';

interface VideoFeedProps {
isRunning: boolean;
isConnected: boolean;
}

export const VideoFeed = forwardRef<
HTMLVideoElement,
VideoFeedProps

> (function VideoFeed(
> {
> isRunning,
> isConnected,
> },
> forwardedRef
> ) {
> const internalRef =
> useRef<HTMLVideoElement>(null);

useEffect(() => {
let stream: MediaStream | null =
null;

```
const startCamera =
  async () => {
    try {
      stream =
        await navigator.mediaDevices.getUserMedia(
          {
            video: true,
            audio: false,
          }
        );

      if (internalRef.current) {
        internalRef.current.srcObject =
          stream;
      }
    } catch (err) {
      console.error(
        'Camera access denied',
        err
      );
    }
  };

if (isRunning) {
  startCamera();
}

return () => {
  if (stream) {
    stream
      .getTracks()
      .forEach((track) =>
        track.stop()
      );
  }
};
```

}, [isRunning]);

return ( <div className="glass-card rounded-xl overflow-hidden"> <div className="flex items-center justify-between p-4 border-b border-border/50"> <div className="flex items-center gap-2"> <Camera className="w-5 h-5 text-safe" />

```
      <h3 className="text-sm font-medium">
        Live Camera Feed
      </h3>
    </div>

    <div className="flex items-center gap-2">
      {isConnected ? (
        <Wifi className="w-4 h-4 text-green-500" />
      ) : (
        <WifiOff className="w-4 h-4 text-red-500" />
      )}

      {isRunning && (
        <span className="flex items-center gap-1 text-xs text-green-400">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          REC
        </span>
      )}
    </div>
  </div>

  <div className="relative aspect-video bg-black">
    {isRunning ? (
      <>
        <video
          ref={(node) => {
            internalRef.current = node;

            if (
              typeof forwardedRef ===
              'function'
            ) {
              forwardedRef(node);
            } else if (
              forwardedRef
            ) {
              forwardedRef.current =
                node;
            }
          }}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="w-full h-1 bg-gradient-to-b from-green-500/30 to-transparent animate-scan-line" />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-green-500/50" />
          <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-green-500/50" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-green-500/50" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-green-500/50" />
        </div>
      </>
    ) : (
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div
          className={cn(
            'w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center mb-4',
            isConnected
              ? 'border-muted-foreground'
              : 'border-red-500/50'
          )}
        >
          <Camera
            className={cn(
              'w-8 h-8',
              isConnected
                ? 'text-muted-foreground'
                : 'text-red-500/50'
            )}
          />
        </div>

        <p className="text-muted-foreground text-sm">
          Click Start To Begin Monitoring
        </p>
      </div>
    )}
  </div>
</div>
```

);
});

VideoFeed.displayName =
'VideoFeed';

  WifiOff,
} from 'lucide-react';

interface VideoFeedProps {
  isRunning: boolean;
  isConnected: boolean;
}

export const VideoFeed = forwardRef<
  HTMLVideoElement,
  VideoFeedProps
>(function VideoFeed(
  {
    isRunning,
    isConnected,
  },
  forwardedRef
) {
  const internalRef =
    useRef<HTMLVideoElement>(null);

  useEffect(() => {
    let stream: MediaStream | null =
      null;

    const startCamera =
      async () => {
        try {
          stream =
            await navigator.mediaDevices.getUserMedia(
              {
                video: true,
                audio: false,
              }
            );

          if (internalRef.current) {
            internalRef.current.srcObject =
              stream;
          }
        } catch (err) {
          console.error(
            'Camera access denied',
            err
          );
        }
      };

    if (isRunning) {
      startCamera();
    }

    return () => {
      if (stream) {
        stream
          .getTracks()
          .forEach((track) =>
            track.stop()
          );
      }
    };
  }, [isRunning]);

  useEffect(() => {
    if (
      typeof forwardedRef ===
        'function' ||
      !forwardedRef
    )
      return;

    forwardedRef.current =
      internalRef.current;
  });

  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Camera className="w-5 h-5 text-safe" />

          <h3 className="text-sm font-medium">
            Live Camera Feed
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}

          {isRunning && (
            <span className="flex items-center gap-1 text-xs text-green-400">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              REC
            </span>
          )}
        </div>
      </div>

      <div className="relative aspect-video bg-black">
        {isRunning ? (
          <>
            <video
              ref={internalRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="w-full h-1 bg-gradient-to-b from-green-500/30 to-transparent animate-scan-line" />
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div
              className={cn(
                'w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center mb-4',
                isConnected
                  ? 'border-muted-foreground'
                  : 'border-red-500/50'
              )}
            >
              <Camera
                className={cn(
                  'w-8 h-8',
                  isConnected
                    ? 'text-muted-foreground'
                    : 'text-red-500/50'
                )}
              />
            </div>

            <p className="text-muted-foreground text-sm">
              Click Start To Begin
              Monitoring
            </p>
          </div>
        )}
      </div>
    </div>
  );
});
