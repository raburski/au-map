import Image from "next/image";
import styles from "./page.module.css";
import Map from "./Map";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.mapContainer}>
        <Map />
      </div>
    </main>
  );
}
