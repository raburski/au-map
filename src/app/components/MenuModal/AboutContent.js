"use client"
import styles from "./aboutContent.module.css"

export default function AboutContent() {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h3>This Project</h3>
				<p>
					This interactive map is an open-source, community-maintained project created as a response 
					and enhancement to the{' '}
					<a 
						href="https://www.architecturaluprising.com/" 
						target="_blank" 
						rel="noopener noreferrer"
						className={styles.link}
					>
						Architectural Uprising movement
					</a>.
				</p>
				<p>
					The Architectural Uprising is a people's movement against the continued uglification of our cities, 
					advocating for beautiful, human-scaled architecture that reflects our cultural identity and values.
				</p>
			</div>

			<div className={styles.section}>
				<h3>Open Source & Community Driven</h3>
				<p>
					This map is completely open source and maintained by the community. All data, code, and contributions 
					are welcome from anyone who wants to help document and expand the global architectural uprising movement.
				</p>
				<p>
					The project aims to provide a comprehensive, interactive view of architectural uprising movements 
					worldwide, making it easy to discover and connect with local groups and initiatives.
				</p>
			</div>

			<div className={styles.section}>
				<h3>How to Contribute</h3>
				<p>
					You can contribute by adding your country's uprising movement data, updating existing information, 
					or helping with the technical development. Visit the{' '}
					<a 
						href="https://github.com/raburski/au-map" 
						target="_blank" 
						rel="noopener noreferrer"
						className={styles.link}
					>
						GitHub repository
					</a>{' '}
					to get started.
				</p>
				<p className={styles.note}>
					For questions or help with contributions, contact us at{' '}
					<a 
						href="mailto:map@rewolta.org" 
						className={styles.link}
					>
						map@rewolta.org
					</a>
				</p>
			</div>
		</div>
	)
} 