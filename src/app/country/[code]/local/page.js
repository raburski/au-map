"use client"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { allCountryData } from "../../../data.js"
import styles from "../../../page.module.css"
import Map from "../../../Map"

export default function LocalBranchesPage() {
	const params = useParams()
	const router = useRouter()
	const countryCode = params.code
	const [countryData, setCountryData] = useState(null)
	const [country, setCountry] = useState(null)

	useEffect(() => {
		if (countryCode && allCountryData[countryCode]) {
			setCountryData(allCountryData[countryCode])
			// Get country info from flag emoji library
			import("country-flag-emoji").then(({ default: countryFlagEmoji }) => {
				setCountry(countryFlagEmoji.get(countryCode))
			})
		}
	}, [countryCode])

	const onCountryClick = cc => {
		router.push(`/country/${cc}`)
	}

	return (
		<main className={styles.main}>
			<div className={styles.mapContainer}>
				<Map onCountryClick={onCountryClick} selectedCountryCode={countryCode?.toUpperCase()}/>
			</div>
		</main>
	)
} 