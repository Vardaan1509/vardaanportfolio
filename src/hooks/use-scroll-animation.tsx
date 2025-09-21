import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const current = ref.current;
    if (!current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing completely
        }
      },
      {
        threshold: 0.1,
        rootMargin: '20px',
        ...options,
      }
    );

    observer.observe(current);

    return () => {
      observer.disconnect();
    };
  }, []);

  return [ref, isVisible] as const;
};