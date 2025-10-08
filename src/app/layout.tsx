import type { Metadata } from "next";
import { Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import Navbar from "./ui/navbar";


const vietnamPro = Be_Vietnam_Pro({
  variable: "--font-vietnam-pro",
  weight: ["600", "500", "300"],
  subsets:["latin"],
})

export const metadata: Metadata = {
  title: "Unplash Collection Master",
  description: "Search high resolution images",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vietnamPro.variable}`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
