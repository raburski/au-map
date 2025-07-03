import { uprisingCountries } from '../../../data.js'
import styles from "../../../page.module.css"

export async function generateStaticParams() {
	return uprisingCountries.map((code) => ({
		code: code.toLowerCase(),
	}))
}

export async function generateMetadata({ params }) {
	const countryCode = params.code?.toLowerCase()
	
	return {
		title: `Local Branches - ${countryCode?.toUpperCase()} | Architectural Uprising`,
		description: `Local branches and communities of Architectural Uprising in ${countryCode?.toUpperCase()}`,
		keywords: `architectural uprising, local branches, ${countryCode?.toUpperCase()}, communities`,
	}
}

export default function LocalBranchesPage() {
	return (
		<main className={styles.main}>
			{/* Map is now in the background via MapBackground component */}
		</main>
	)
} 