"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import ModalHeader from "./ModalHeader"
import ModalContent from "./ModalContent"
import styles from "./modal-refactored.module.css"

export default function ModalContainer({ countryCode, media = [], local = [], isLocalView = false, onClickAway }) {
	const router = useRouter()
	const [currentView, setCurrentView] = useState(isLocalView ? 'local' : 'main')
	const [isAnimating, setIsAnimating] = useState(false)
	const [isModalVisible, setIsModalVisible] = useState(false)
	const isNavigatingRef = useRef(false)
	const hasInitialized = useRef(false)

	// Handle modal opening animation
	useEffect(() => {
		if (countryCode && !hasInitialized.current) {
			hasInitialized.current = true
			// Use requestAnimationFrame to ensure the DOM is ready
			requestAnimationFrame(() => {
				setIsModalVisible(true)
			})
		} else if (!countryCode && hasInitialized.current) {
			hasInitialized.current = false
			setIsModalVisible(false)
		}
	}, [countryCode])

	useEffect(() => {
		// Don't trigger animation if we're already navigating
		if (isNavigatingRef.current) {
			return
		}

		// Sync internal state with URL changes
		const newView = isLocalView ? 'local' : 'main'
		if (newView !== currentView) {
			setIsAnimating(true)
			setTimeout(() => {
				setCurrentView(newView)
				setIsAnimating(false)
			}, 300)
		}
	}, [isLocalView, currentView])

	const handleNavigateToLocal = () => {
		if (isAnimating) return // Prevent multiple clicks
		
		isNavigatingRef.current = true
		setIsAnimating(true)
		setTimeout(() => {
			setCurrentView('local')
			setIsAnimating(false)
			// Update URL after animation
			router.push(`/country/${countryCode.toLowerCase()}/local`)
			// Reset navigation flag after a short delay
			setTimeout(() => {
				isNavigatingRef.current = false
			}, 100)
		}, 300)
	}

	const handleNavigateBack = () => {
		if (isAnimating) return // Prevent multiple clicks
		
		isNavigatingRef.current = true
		setIsAnimating(true)
		setTimeout(() => {
			setCurrentView('main')
			setIsAnimating(false)
			// Update URL after animation
			router.push(`/country/${countryCode.toLowerCase()}`)
			// Reset navigation flag after a short delay
			setTimeout(() => {
				isNavigatingRef.current = false
			}, 100)
		}, 300)
	}

	const handleCloseModal = () => {
		setIsModalVisible(false)
		// Wait for animation to complete before calling onClickAway
		setTimeout(() => {
			onClickAway()
		}, 300)
	}

	if (!countryCode) {
		return null
	}

	return (
		<div className={`${styles.modalOverlay} ${isModalVisible ? styles.modalVisible : ''}`}>
			<a className={styles.modalBackdrop} onClick={handleCloseModal} />
			<div className={`${styles.modalPopup} ${isModalVisible ? styles.modalPopupVisible : ''}`}>
				<ModalHeader countryCode={countryCode} />
				<ModalContent 
					currentView={currentView}
					isAnimating={isAnimating}
					media={media}
					local={local}
					onNavigateToLocal={handleNavigateToLocal}
					onNavigateBack={handleNavigateBack}
				/>
			</div>
		</div>
	)
} 