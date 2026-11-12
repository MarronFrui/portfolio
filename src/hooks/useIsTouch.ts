import { useEffect, useState } from 'react';

// True when the primary pointer is a finger (phones and tablets), false on a
// mouse-driven desktop. The live-session demos need a precise pointer and a
// keyboard, so the site shows a notice instead of the play button.
export function useIsTouch() {
  const query = '(pointer: coarse)';
  const [isTouch, setIsTouch] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = () => setIsTouch(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return isTouch;
}
