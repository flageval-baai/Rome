import type { Metadata } from "next";
import { Inter } from "next/font/google";  // Import the Inter font
import "./globals.css";
import { getBasePath } from "@/utils/fileUtils";

// Apply Inter font globally
const inter = Inter({
  variable: "--font-inter",  // Custom variable for the font
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ROME",
  description: "A Preliminary Contamination-Free Evaluation of Reasoning Models",
  // icons: {
  //   icon: [
  //     { url: `${getBasePath()}/icon.png` },
  //     { url: `${getBasePath()}/icon-dark.png`, media: '(prefers-color-scheme: dark)' }
  //   ],
  //   apple: [
  //     { url: `${getBasePath()}/apple-icon.png` }
  //   ],
  //   shortcut: [`${getBasePath()}/favicon.ico`]
  // }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} antialiased`}  // Apply the Inter font here
      >
        {children}
      </body>
    </html>
  );
}