"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { EASE } from "@/lib/animations";
import { EnquiryTypeSelector, type EnquiryType } from "./EnquiryTypeSelector";
import { OfficialFormPanel } from "./OfficialFormPanel";

const panels: Record<EnquiryType, { title: string; text: string; note?: string }> = {
  membership: {
    title: "Membership enquiry",
    text: "Tell us a little about yourself and your interest in LEGENDS. Sending an enquiry does not grant membership.",
  },
  partnership: {
    title: "Partnership enquiry",
    text: "Clubs, organizations and groups can start a conversation about working together. Sending an enquiry does not confirm a partnership.",
    note: "For now, partnership enquiries use the same official form. You will continue to Google Forms in a new tab, and your answers are handled by Google Forms, not by this website.",
  },
};

export function JoinEnquiry() {
  const [type, setType] = useState<EnquiryType>("membership");
  const panel = panels[type];
  return (
    <div className="space-y-10">
      <EnquiryTypeSelector value={type} onChange={setType} />
      <div className="min-h-[18rem] border border-gold/25 p-6 sm:p-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={type} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3, ease: EASE }}>
            <OfficialFormPanel title={panel.title} text={panel.text} note={panel.note} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
