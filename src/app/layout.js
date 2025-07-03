import { Inter } from "next/font/google";
import "./globals.css";
import { ModalTransitionProvider } from "./contexts/ModalTransitionContext";
import ModalWrapper from "./ModalWrapper";
import Menu from "./components/Menu";
import MapBackground from "./MapBackground";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Architectural Uprising Map",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" />
      <body className={inter.className}>
        <ModalTransitionProvider>
          <MapBackground />
          <Menu />
          {children}
          <ModalWrapper />
        </ModalTransitionProvider>
      </body>
    </html>
  );
}
