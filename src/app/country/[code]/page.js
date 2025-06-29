"use client"
import styles from "../../page.module.css"
import Map from "../../Map"
import { useRouter, useParams } from "next/navigation"

export default function CountryPage() {
	const router = useRouter()
	const params = useParams()
	const countryCode = params.code?.toUpperCase()

	const onCountryClick = cc => {
		router.push(`/country/${cc}`)
	}

	return (
		<main className={styles.main}>
			<div className={styles.mapContainer}>
				<Map onCountryClick={onCountryClick} selectedCountryCode={countryCode}/>
			</div>
		</main>
	)
} 