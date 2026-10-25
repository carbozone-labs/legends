"use client";

import { MotionConfig } from "framer-motion";

/** Honours the visitor's reduced-motion setting everywhere: movement is removed, simple fades remain. */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
