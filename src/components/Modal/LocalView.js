import { forwardRef } from "react"
import LocalBranchesList from "./LocalBranchesList"
import styles from "./modal-refactored.module.css"

const LocalView = forwardRef(({ local, onNavigateBack, className, countryCode }, ref) => {
	return (
		<div ref={ref} className={className}>
			<div className={styles.localViewHeader}>
				<button className={styles.backButton} onClick={onNavigateBack}>
					← Back
				</button>
			</div>
			<LocalBranchesList local={local} countryCode={countryCode} />
		</div>
	)
})

LocalView.displayName = 'LocalView'

export default LocalView 