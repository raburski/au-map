"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import ModalHeader from "./ModalHeader"
import ModalContent from "./ModalContent"
import { useModalTransition } from "./ModalTransitionContext"
import styles from "./modal-refactored.module.css"

export default function UnifiedModal({ 
	// Modal configuration
	isVisible = false,
	onClose,
	
	// Content type
	type = 'menu', // 'menu' or 'country'
	
	// Menu modal props
	title,
	children,
	
	// Country modal props
	countryCode,
	media = [],
	local = [],
	isLocalView = false
}) {
	const router = useRouter()
	const { navigateWithTransition } = useModalTransition()
	const [currentView, setCurrentView] = useState(isLocalView ? 'local' : 'main')
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

	// Handle country modal view changes
	useEffect(() => {
		if (type === 'country') {
			const newView = isLocalView ? 'local' : 'main'
			if (newView !== currentView) {
				setIsAnimating(true)
				setTimeout(() => {
					setCurrentView(newView)
					setIsAnimating(false)
				}, 300)
			}
		}
	}, [isLocalView, currentView, type])

	const handleNavigateToLocal = () => {
		if (isAnimating || type !== 'country') return
		navigateWithTransition(`/country/${countryCode.toLowerCase()}/local`, () => {
			setIsAnimating(true)
		})
	}

	const handleNavigateBack = () => {
		if (isAnimating || type !== 'country') return
		navigateWithTransition(`/country/${countryCode.toLowerCase()}`, () => {
			setIsAnimating(true)
		})
	}

	const handleCloseModal = () => {
		setIsModalVisible(false)
		setTimeout(() => {
			onClose()
		}, 300)
	}

	// Don't render if not visible
	if (!isVisible) {
		return null
	}

	return (
		<div className={`${styles.modalOverlay} ${isModalVisible ? styles.modalVisible : ''}`}>
			<a className={styles.modalBackdrop} onClick={handleCloseModal} />
			<div className={`${styles.modalPopup} ${isModalVisible ? styles.modalPopupVisible : ''}`}>
				{type === 'country' ? (
					<>
						<ModalHeader countryCode={countryCode} />
						<ModalContent 
							currentView={currentView}
							isAnimating={isAnimating}
							media={media}
							local={local}
							onNavigateToLocal={handleNavigateToLocal}
							onNavigateBack={handleNavigateBack}
						/>
					</>
				) : (
					<>
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
					</>
				)}
			</div>
		</div>
	)
} 