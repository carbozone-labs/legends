import { notFound } from "next/navigation";

export const dynamicParams = false;
export const generateStaticParams = () => [{ slug: ["_"] }];

export default function UnknownLegendZonePage() {
  notFound();
}
