import type { Metadata } from "next";
import { EB_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--loaded-eb-garamond",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--loaded-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Adore Life – Because everyone deserves to be understood",
    template: "%s | Adore Life",
  },
  description:
    "Adore Life offers individual therapy, couples therapy, and corporate wellbeing services in Thane, India. Begin your journey toward emotional clarity and self-understanding with therapist Nidhi Roy.",
  metadataBase: new URL("https://adorelife.in"),
  openGraph: {
    siteName: "Adore Life",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Material Symbols icon font */}
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${ebGaramond.variable} ${montserrat.variable} antialiased overflow-x-hidden`}
        style={{
          fontFamily: "var(--font-body-md)",
          backgroundColor: "var(--color-background)",
          color: "var(--color-on-background)",
        }}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
