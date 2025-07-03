import Link from "next/link"
import styles from "./staticModal.module.css"

export default function StaticModal({ title, children }) {
	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalPopup}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>{title}</h2>
					<Link href="/" className={styles.closeButton} aria-label="Close modal">
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</Link>
				</div>
				<div className={styles.modalContent}>
					{children}
				</div>
			</div>
		</div>
	)
} 