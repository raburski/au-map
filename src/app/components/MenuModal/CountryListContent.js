"use client"
import { useRouter } from "next/navigation"
import countryFlagEmoji from "country-flag-emoji"
import { uprisingCountries } from "../../data.js"
import styles from "./countryListContent.module.css"

export default function CountryListContent() {
	const router = useRouter()

	const handleCountryClick = (countryCode) => {
		router.push(`/country/${countryCode}`)
	}

	// Sort countries alphabetically by name
	const sortedCountries = uprisingCountries
		.map(code => {
			const countryInfo = countryFlagEmoji.get(code.toUpperCase())
			return {
				code,
				name: countryInfo?.name || code.toUpperCase(),
				flag: countryInfo?.emoji || '🏳️'
			}
		})
		.sort((a, b) => a.name.localeCompare(b.name))

	return (
		<div className={styles.container}>
			<p className={styles.description}>
				Click on any country to view its architectural uprising movement details.
			</p>
			<div className={styles.countryList}>
				{sortedCountries.map(({ code, name, flag }) => (
					<button
						key={code}
						className={styles.countryItem}
						onClick={() => handleCountryClick(code)}
					>
						<span className={styles.countryFlag}>{flag}</span>
						<span className={styles.countryName}>{name}</span>
						<span className={styles.countryCode}>{code.toUpperCase()}</span>
					</button>
				))}
			</div>
			<p className={styles.count}>
				Total: {sortedCountries.length} countries with uprising movements
			</p>
		</div>
	)
} 