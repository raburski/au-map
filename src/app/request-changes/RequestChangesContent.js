"use client"
import styles from "./requestChangesContent.module.css"

export default function RequestChangesContent() {
	return (
		<div className={styles.container}>
			<div className={styles.section}>
				<h3>How to Update Your Country Data</h3>
				<p>
					All data for this map is stored on GitHub and is open for contributions. 
					You can find the repository at:{' '}
					<a 
						href="https://github.com/raburski/au-map" 
						target="_blank" 
						rel="noopener noreferrer"
						className={styles.link}
					>
						https://github.com/raburski/au-map
					</a>
				</p>
			</div>

			<div className={styles.section}>
				<h3>For Developers</h3>
				<p>If you want to update your country's data:</p>
				<ol className={styles.steps}>
					<li>
						<strong>Check data format:</strong> reference to Polish <a 
							href="https://github.com/raburski/au-map/blob/main/src/data/uprisings/pl.json" 
							target="_blank" 
							rel="noopener noreferrer"
							className={styles.fileLink}
						>
							<code>pl.json</code>
						</a> file to see how data should be structured
					</li>
					<li>
						<strong>Find your country file:</strong> Look for a file named after your country code 
						(e.g., <a 
							href="https://github.com/raburski/au-map/blob/main/src/data/uprisings/pl.json" 
							target="_blank" 
							rel="noopener noreferrer"
							className={styles.fileLink}
						>
							<code>pl.json</code>
						</a> for Poland, <a 
							href="https://github.com/raburski/au-map/blob/main/src/data/uprisings/de.json" 
							target="_blank" 
							rel="noopener noreferrer"
							className={styles.fileLink}
						>
							<code>de.json</code>
						</a> for Germany). You can find all country files in the{' '}
						<a 
							href="https://github.com/raburski/au-map/tree/main/src/data/uprisings" 
							target="_blank" 
							rel="noopener noreferrer"
							className={styles.link}
						>
							uprisings directory
						</a>
					</li>
					<li>
						<strong>Edit the file:</strong> Click on the file and then click the pencil icon to edit it
					</li>
					<li>
						<strong>Make your changes:</strong> Update the media links, add new sources, or modify existing information
					</li>
					<li>
						<strong>Commit your changes:</strong> Scroll down, add a descriptive commit message, and click "Commit changes"
					</li>
					<li>
						<strong>Create a Pull Request:</strong> GitHub will automatically suggest creating a PR - click "Create pull request"
					</li>
					<li>
						<strong>Submit for review:</strong> Add a description of your changes and submit the PR
					</li>
				</ol>
			</div>

			<div className={styles.section}>
				<h3>Need Help?</h3>
				<p>
					If you don't know how to use GitHub or want to add/change an emblem, 
					please contact us at:{' '}
					<a 
						href="mailto:map@rewolta.org" 
						className={styles.link}
					>
						map@rewolta.org
					</a>
				</p>
				<p className={styles.note}>
					We're happy to help you make changes or add new countries to the map!
				</p>
			</div>
		</div>
	)
} 