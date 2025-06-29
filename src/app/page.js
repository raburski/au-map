"use client"
import styles from "./page.module.css";
import Map from "./Map";
import { useRouter } from "next/navigation";

export default function Home() {
	const router = useRouter()
	
	const onCountryClick = cc => {
		router.push(`/country/${cc}`)
	}

	return (
		<main className={styles.main}>
			<div className={styles.mapContainer}>
				<Map onCountryClick={onCountryClick} selectedCountryCode={undefined}/>
			</div>
		</main>
	)
}
