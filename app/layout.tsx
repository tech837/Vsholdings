import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const ragoe = localFont({
  src: "../public/font/ragoe-1773358863-0/Ragoe.otf",
  variable: "--font-ragoe",
  display: "swap",
});

const helveticaNowDisplay = localFont({
  src: [
    {
      path: "../public/font/helvetica-now-display/HelveticaNowDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/helvetica-now-display/HelveticaNowDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/helvetica-now-display/HelveticaNowDisplay-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/helvetica-now-display/HelveticaNowDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-helvetica",
  display: "swap",
});

export const metadata: Metadata = {
  title: "VS Holdings",
  description: "VS Holdings landing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`h-full antialiased ${ragoe.variable} ${helveticaNowDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
