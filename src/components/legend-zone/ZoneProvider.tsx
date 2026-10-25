"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AWARD_LOCK_MS, sampleActivities, type ActionId, type Activity } from "@/data/legendZone";
import { getAction, levelFor, totalXp } from "@/lib/legendZone";

type Confirmation = { action: ActionId; xp: number; leveledUpTo: string | null; id: number };

type ZoneState = {
  activities: Activity[];
  xp: number;
  level: ReturnType<typeof levelFor>;
  locked: boolean;
  confirmation: Confirmation | null;
  /** Triggers a SIMULATED award in memory. Returns false if ignored (locked). */
  award: (action: ActionId) => boolean;
  reset: () => void;
};

const Ctx = createContext<ZoneState | null>(null);

/**
 * In-memory demonstration state shared by the Legend Zone pages (it lives in the segment layout, so it
 * survives navigation between them). Nothing is written to storage, cookies or a server; a refresh resets it.
 */
export function ZoneProvider({ children }: { children: React.ReactNode }) {
  const [activities, setActivities] = useState<Activity[]>(sampleActivities);
  const [locked, setLocked] = useState(false);
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const lockRef = useRef(false);
  const counter = useRef(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const xpRef = useRef(totalXp(sampleActivities));

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  const award = useCallback((action: ActionId) => {
    if (lockRef.current) return false; // ignore accidental double clicks
    lockRef.current = true;
    setLocked(true);
    const a = getAction(action);
    const before = levelFor(xpRef.current).current.title;
    xpRef.current += a.xp;
    const after = levelFor(xpRef.current).current.title;
    counter.current += 1;
    setActivities((list) => [...list, { id: `sim-${counter.current}`, action, xp: a.xp, kind: "simulated", note: "Simulated in this demo" }]);
    setConfirmation({ action, xp: a.xp, leveledUpTo: after !== before ? after : null, id: counter.current });
    timer.current = setTimeout(() => { lockRef.current = false; setLocked(false); }, AWARD_LOCK_MS);
    return true;
  }, []);

  const reset = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    lockRef.current = false;
    setLocked(false);
    xpRef.current = totalXp(sampleActivities);
    setActivities(sampleActivities);
    setConfirmation(null);
  }, []);

  const value = useMemo<ZoneState>(() => {
    const xp = totalXp(activities);
    return { activities, xp, level: levelFor(xp), locked, confirmation, award, reset };
  }, [activities, locked, confirmation, award, reset]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useZone() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useZone must be used inside <ZoneProvider>");
  return v;
}
