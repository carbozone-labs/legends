import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="grid min-h-[80svh] place-items-center px-6 text-center">
      <div>
        <h1 className="text-display text-6xl sm:text-8xl">Page not found</h1>
        <p className="mt-4 text-ivory/65">That page doesn’t exist yet.</p>
        <div className="mt-8 flex justify-center"><Button href="/">Back to home</Button></div>
      </div>
    </section>
  );
}
