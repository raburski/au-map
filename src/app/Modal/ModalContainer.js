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
	const hasInitialized = useRef(false)

	// Handle modal opening animation
	useEffect(() => {
		if (countryCode && !hasInitialized.current) {
			hasInitialized.current = true
			// Start animation on next frame
			requestAnimationFrame(() => {
				setIsModalVisible(true)
			})
		} else if (!countryCode && hasInitialized.current) {
			hasInitialized.current = false
			setIsModalVisible(false)
		}
	}, [countryCode])

	// Handle view changes
	useEffect(() => {
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
		if (isAnimating) return
		router.push(`/country/${countryCode.toLowerCase()}/local`)
	}

	const handleNavigateBack = () => {
		if (isAnimating) return
		router.push(`/country/${countryCode.toLowerCase()}`)
	}

	const handleCloseModal = () => {
		setIsModalVisible(false)
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