"use client";

import { MutableRefObject, useEffect } from "react";

export const useObserver = (observerTarget: MutableRefObject<Element | null>, onIntersect: () => void) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect();
      },
      { threshold: 1 },
    );

    const observerTargetNode = observerTarget.current;
    if (observerTargetNode) observer.observe(observerTargetNode);

    return () => {
      if (observerTargetNode) observer.unobserve(observerTargetNode);
    };
  }, [onIntersect, observerTarget]);
};
