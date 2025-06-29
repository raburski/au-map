import Image from "next/image"
import { FaChevronRight } from "react-icons/fa"
import styles from "./modal-refactored.module.css"

export default function LocalBranchesPanel({ local, onNavigateToLocal }) {
	return (
		<div className={styles.localBranchesPanel} onClick={onNavigateToLocal}>
			<div className={styles.panelEmblems}>
				{local.slice(0, 6).map((branch, index) => (
					<Image 
						key={index}
						src={`/emblems/${branch.cityCode}.jpeg`} 
						alt={`${branch.city} emblem`} 
						width={42} 
						height={42} 
						className={styles.panelEmblem}
					/>
				))}
				<FaChevronRight className={styles.chevron} />
			</div>
			{/* <div className={styles.panelHeader}> */}
				
			{/* </div> */}
			<p className={styles.panelSubtitle}>Local branches and communities</p>
		</div>
	)
} 