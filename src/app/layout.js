import { Inter } from "next/font/google";
import "./globals.css";
import ModalWrapper from "./ModalWrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Architectural Uprising Map",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        {children}
        <ModalWrapper />
      </body>
    </html>
  );
}
