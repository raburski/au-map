import { forwardRef } from "react"
import LocalBranchesPanel from "./LocalBranchesPanel"
import MediaSection from "./MediaSection"
import styles from "./modal-refactored.module.css"

const MainView = forwardRef(({ media, local, onNavigateToLocal, className, countryCode }, ref) => {
	return (
		<div ref={ref} className={className}>
			{local && local.length > 0 && (
				<LocalBranchesPanel local={local} onNavigateToLocal={onNavigateToLocal} countryCode={countryCode} />
			)}
			<MediaSection media={media} />
		</div>
	)
})

MainView.displayName = 'MainView'

export default MainView 