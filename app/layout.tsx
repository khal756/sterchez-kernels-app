import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import DisguisedBoneLink from "./components/DisguisedBoneLink";
import { KennelProvider } from "./context/KennelContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sterchez Kennels",
  description: "Best Dog Breeders & Adoption Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        <KennelProvider>
          {children}
          <DisguisedBoneLink />
        </KennelProvider>
      </body>
    </html>
  );
}
