"use client";

import type { RefObject } from "react";
import { useContainerScrollProgress } from "@/hooks/use-container-scroll-progress";

interface ContainerScrollProgressCircleProps {
  containerRef: RefObject<HTMLElement | null>;
  size?: number;
  strokeWidth?: number;
  color?: string;
}

export function ContainerScrollProgressCircle({
  containerRef,
  size = 50,
  strokeWidth = 3,
  color = "stroke-blue-500",
}: ContainerScrollProgressCircleProps) {
  const scrollProgress = useContainerScrollProgress(containerRef);

  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset =
    circumference - (scrollProgress / 100) * circumference;

  return (
    <div className="relative rounded-full p-1">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-gray-200"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`transition-all duration-150 ease-out ${color}`}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-medium text-gray-600">
          {Math.round(scrollProgress)}%
        </span>
      </div>
    </div>
  );
}
