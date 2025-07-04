import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "../components/Menu";
import MapBackground from "../components/MapBackground";
import CountryModal from "../components/CountryModal";
import { ModalTransitionProvider } from "../components/Modal/ModalTransitionContext";

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
          <CountryModal />
        </ModalTransitionProvider>
      </body>
    </html>
  );
}
