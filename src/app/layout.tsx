import { ReactNode } from "react";
import {
  Roboto_Flex as Roboto,
  Bai_Jamjuree as BaiJamJuree
} from "next/font/google";

import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto"
});
const baiJamjuree = BaiJamJuree({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-bai-jamjuree"
});

export const metadata = {
  title: "NLW Spacetime",
  description: "NLW Spacetime"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${roboto.variable} ${baiJamjuree.variable} font-sans `}>
        {children}
      </body>
    </html>
  );
}
