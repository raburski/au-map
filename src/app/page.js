"use client"
import styles from "./page.module.css";
import Map from "./Map";
import { useRouter } from "next/navigation";
import { useModalTransition } from "./contexts/ModalTransitionContext";

export default function Home() {
	const router = useRouter()
	const { startTransition } = useModalTransition()
	
	const onCountryClick = (cc) => {
		startTransition(`/country/${cc}`, router)
	}

	return (
		<main className={styles.main}>
			<div className={styles.mapContainer}>
				<Map onCountryClick={onCountryClick} selectedCountryCode={undefined}/>
			</div>
		</main>
	)
}
