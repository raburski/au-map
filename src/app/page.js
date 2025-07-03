import styles from "./page.module.css"

export const metadata = {
	title: "Architectural Uprising Map",
	description: "Interactive map showing architectural uprising movements around the world",
	keywords: "architectural uprising, architecture, urban planning, activism",
}

export default function Home() {
	return (
		<main className={styles.main}>
			{/* Map is now in the background via MapBackground component */}
		</main>
	)
}
