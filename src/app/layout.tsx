import type { Metadata } from "next";
import "./globals.css";

import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "auto",
});

export const metadata: Metadata = {
  title: "schulte-grid",
  description: "schulte-grid game",
  icons: [
    {
      url: "/favicon.svg",
      type: "image/svg+xml",
      sizes: "32",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}
