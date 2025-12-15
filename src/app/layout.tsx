import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Parallax Carousel Demo",
  description: "Vertical scroll parallax carousel demonstration with layered movement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}

