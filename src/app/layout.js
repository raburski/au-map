import { Inter } from "next/font/google";
import "./globals.css";
import uprisingMedia from '@/data/uprisings_media.json'
import { onlyUnique } from "./array";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Architectural Uprising Map",
}

const allImages = uprisingMedia.flatMap(media => media.countries).filter(onlyUnique).map(cc => `/emblems/${cc}.jpeg`)

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {allImages.map(href => <link rel="preload" href={href} as="image" />)}
      <body className={inter.className}>{children}</body>
    </html>
  );
}
