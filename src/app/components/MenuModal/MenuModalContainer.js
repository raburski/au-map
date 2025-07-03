"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import styles from "./menuModal.module.css"

export default function MenuModalContainer({ title, children, isVisible, onClose }) {
	const router = useRouter()
	const [isAnimating, setIsAnimating] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const hasInitialized = useRef(false)

	// Handle modal opening animation
	useEffect(() => {
		if (isVisible && !hasInitialized.current) {
			hasInitialized.current = true
			// Start animation on next frame
			requestAnimationFrame(() => {
				setIsModalVisible(true)
			})
		} else if (!isVisible && hasInitialized.current) {
			hasInitialized.current = false
			setIsModalVisible(false)
		}
	}, [isVisible])

	const handleCloseModal = () => {
		setIsModalVisible(false)
		setTimeout(() => {
			onClose()
		}, 300)
	}

	if (!isVisible) {
		return null
	}

	return (
		<div className={`${styles.modalOverlay} ${isModalVisible ? styles.modalVisible : ''}`}>
			<a className={styles.modalBackdrop} onClick={handleCloseModal} />
			<div className={`${styles.modalPopup} ${isModalVisible ? styles.modalPopupVisible : ''}`}>
				<div className={styles.modalHeader}>
					<h2 className={styles.modalTitle}>{title}</h2>
					<button 
						className={styles.closeButton}
						onClick={handleCloseModal}
						aria-label="Close modal"
					>
						<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
							<line x1="18" y1="6" x2="6" y2="18"></line>
							<line x1="6" y1="6" x2="18" y2="18"></line>
						</svg>
					</button>
				</div>
				<div className={styles.modalContent}>
					{children}
				</div>
			</div>
		</div>
	)
} 