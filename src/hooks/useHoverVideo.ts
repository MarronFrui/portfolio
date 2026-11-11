import { useCallback, useRef } from 'react';

// Plays a muted preview video while its container is hovered or focused,
// and rewinds it when the pointer or focus leaves.
export function useHoverVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  const play = useCallback(() => {
    // The browser can block playback (data saver...); the cover image stays visible.
    ref.current?.play().catch(() => {});
  }, []);

  const stop = useCallback(() => {
    const video = ref.current;
    if (!video) return;
    video.pause();
    video.currentTime = 0;
  }, []);

  return { ref, play, stop };
}
