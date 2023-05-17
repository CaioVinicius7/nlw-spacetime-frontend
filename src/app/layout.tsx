import { ReactNode } from "react";

import "./globals.css";

export const metadata = {
  title: "NLW Spacetime",
  description: "NLW Spacetime"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
