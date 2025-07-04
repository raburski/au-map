"use client"
import { createContext, useContext, useState, useCallback } from "react"
import { useRouter } from "next/navigation"

const ModalTransitionContext = createContext()

export function ModalTransitionProvider({ children }) {
	const router = useRouter()
	const [isTransitioning, setIsTransitioning] = useState(false)

	const navigateWithTransition = useCallback((path, onAnimationComplete) => {
		if (isTransitioning) return

		setIsTransitioning(true)
		
		// Start the animation
		if (onAnimationComplete) {
			onAnimationComplete()
		}

		// Wait for animation to complete before navigating
		setTimeout(() => {
			router.push(path)
			setIsTransitioning(false)
		}, 300) // Match the CSS transition duration
	}, [router, isTransitioning])

	const value = {
		isTransitioning,
		navigateWithTransition
	}

	return (
		<ModalTransitionContext.Provider value={value}>
			{children}
		</ModalTransitionContext.Provider>
	)
}

export function useModalTransition() {
	const context = useContext(ModalTransitionContext)
	if (!context) {
		throw new Error('useModalTransition must be used within a ModalTransitionProvider')
	}
	return context
} 