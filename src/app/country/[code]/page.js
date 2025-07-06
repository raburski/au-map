import { uprisingCountries } from '../../data.js'
import styles from "../../page.module.css"

// Force static generation - no server-side rendering
export const dynamic = 'force-static'
export const revalidate = false

export async function generateStaticParams() {
	return uprisingCountries.map((code) => ({
		code: code.toLowerCase(),
	}))
}

export async function generateMetadata({ params }) {
	const countryCode = params.code?.toLowerCase()
	
	return {
		title: `Architectural Uprising - ${countryCode?.toUpperCase()}`,
		description: `Architectural Uprising movement in ${countryCode?.toUpperCase()}`,
		keywords: `architectural uprising, ${countryCode?.toUpperCase()}, architecture, urban planning`,
	}
}

export default function CountryPage() {
	return (
		<main className={styles.main}>
			{/* Map is now in the background via MapBackground component */}
		</main>
	)
} 