"use client"
import { useRouter } from "next/navigation"
import styles from "./backButton.module.css"

export default function BackButton() {
	const router = useRouter()

	const handleBack = () => {
		router.push('/')
	}

	return (
		<button 
			className={styles.backButton}
			onClick={handleBack}
			aria-label="Back to map"
		>
			<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
				<line x1="19" y1="12" x2="5" y2="12"></line>
				<polyline points="12,19 5,12 12,5"></polyline>
			</svg>
			Back to Map
		</button>
	)
} 