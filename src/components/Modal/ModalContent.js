import { useRef, useEffect } from "react"
import MainView from "./MainView"
import LocalView from "./LocalView"
import styles from "./modal-refactored.module.css"

export default function ModalContent({ currentView, isAnimating, media, local, onNavigateToLocal, onNavigateBack, countryCode }) {
	const viewContainerRef = useRef(null)
	const mainViewRef = useRef(null)
	const localViewRef = useRef(null)

	useEffect(() => {
		if (!viewContainerRef.current) return

		const updateHeight = () => {
			const container = viewContainerRef.current
			const activeView = currentView === 'main' ? mainViewRef.current : localViewRef.current
			
			if (activeView) {
				const height = activeView.scrollHeight
				container.style.height = `${height}px`
			}
		}

		// Update height after a short delay to allow for transitions
		const timer = setTimeout(updateHeight, 50)
		return () => clearTimeout(timer)
	}, [currentView, media, local])

	return (
		<div className={`${styles.modalContent} ${isAnimating ? styles.animating : ''}`}>
			<div ref={viewContainerRef} className={styles.viewContainer}>
				<MainView 
					ref={mainViewRef}
					media={media} 
					local={local} 
					onNavigateToLocal={onNavigateToLocal}
					countryCode={countryCode}
					className={`${styles.mainView} ${currentView === 'main' ? styles.mainViewActive : ''}`}
				/>
				<LocalView 
					ref={localViewRef}
					local={local} 
					onNavigateBack={onNavigateBack}
					countryCode={countryCode}
					className={`${styles.localView} ${currentView === 'local' ? styles.localViewActive : ''}`}
				/>
			</div>
		</div>
	)
} 