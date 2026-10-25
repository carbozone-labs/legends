import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Event not found" };

export default function EventNotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 pt-24 text-center">
      <div>
        <h1 className="text-display text-5xl sm:text-7xl">Event not found</h1>
        <p className="mt-4 text-ivory/65">We couldn’t find an event at this address.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/events">Back to all events</Button>
          <Button href="/" variant="secondary">Home</Button>
        </div>
      </div>
    </section>
  );
}
