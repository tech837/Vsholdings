import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const helveticaNowDisplay = localFont({
  src: [
    {
      path: "../public/font/helvetica-now-display/HelveticaNowDisplay-Light.woff2",
      weight: "300",
      style: "normal",
    },
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
  ],
  variable: "--font-helvetica",
  display: "swap",
});

const blauerNue = localFont({
  src: [
    {
      path: "../public/font/blauer-nue/BlauerNue-Thin.woff2",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Thin_Italic.woff2",
      weight: "100",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-ExtraLight.woff2",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-ExtraLight_Italic.woff2",
      weight: "200",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Light_Italic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Regular_Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Medium_Italic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-SemiBold.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-SemiBold_Italic.woff2",
      weight: "600",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Bold_Italic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-ExtraBold.woff2",
      weight: "800",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-ExtraBold_Italic.woff2",
      weight: "800",
      style: "italic",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Heavy.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../public/font/blauer-nue/BlauerNue-Heavy_Italic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-blauer-nue",
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
      className={`h-full antialiased ${blauerNue.variable} ${helveticaNowDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
