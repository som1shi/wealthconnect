import "./globals.css";
import type { Metadata } from "next";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "ReFi - Smart Finance for Everyone",
  description: "ReFi combines AI-powered insights with human expertise to help you achieve financial freedom faster than ever before.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-background font-sans antialiased">
        <div className="relative flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
