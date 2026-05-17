import type { Metadata } from "next";
import { AegisTerminal } from "@/components/aegis-terminal";

export const metadata: Metadata = {
  title: "AEGIS TERMINAL // JIM WEST QUANT LABS",
  description: "Secure access terminal for Jim West Quant Labs intelligence.",
};

export default function TerminalPage() {
  return <AegisTerminal />;
}
