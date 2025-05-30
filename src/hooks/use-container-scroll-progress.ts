"use client";

import { useState, useEffect, type RefObject } from "react";

export function useContainerScrollProgress(
  containerRef: RefObject<HTMLElement | null>
) {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    let ticking = false;
    const container = containerRef.current;
    if (!container) return;

    const updateScrollProgress = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollTop = container.scrollTop;
          const scrollHeight = container.scrollHeight;
          const clientHeight = container.clientHeight;
          const maxScroll = scrollHeight - clientHeight;

          const scrollPercent =
            maxScroll > 0
              ? Math.min(100, Math.max(0, (scrollTop / maxScroll) * 100))
              : 0;

          setScrollProgress(scrollPercent);
          ticking = false;
        });
        ticking = true;
      }
    };

    // 初始计算
    updateScrollProgress();

    // 监听容器滚动事件
    container.addEventListener("scroll", updateScrollProgress, {
      passive: true,
    });

    // 监听容器大小变化（可选）
    const resizeObserver = new ResizeObserver(updateScrollProgress);
    resizeObserver.observe(container);

    return () => {
      container.removeEventListener("scroll", updateScrollProgress);
      resizeObserver.disconnect();
    };
  }, [containerRef]);

  return scrollProgress;
}
