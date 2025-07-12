import Image from "next/image"
import countryFlagEmoji from "country-flag-emoji"
import styles from "./modal-refactored.module.css"

export default function ModalHeader({ countryCode }) {
	const country = countryFlagEmoji.get(countryCode)

	return (
		<div className={styles.modalHeader}>
			<Image 
				src={`/emblems/${countryCode}.jpg`} 
				alt={`AU ${country.name} emblem`} 
				width={144} 
				height={144} 
				className={styles.modalEmblem}
				unoptimized
			/>
			<h2 className={styles.modalCountryName}>
				<span className={styles.countryEmoji}>{country.emoji}</span>
				{country.name}
			</h2>
		</div>
	)
} 