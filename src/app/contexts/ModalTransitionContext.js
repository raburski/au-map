"use client"
import { createContext, useContext, useState, useCallback, useRef } from 'react'

const ModalTransitionContext = createContext()

export function ModalTransitionProvider({ children }) {
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [pendingRoute, setPendingRoute] = useState(null)
	const routerRef = useRef(null)

	const startTransition = useCallback((route, router) => {
		setIsTransitioning(true)
		setPendingRoute(route)
		routerRef.current = router
	}, [])

	const endTransition = useCallback(() => {
		setIsTransitioning(false)
		setPendingRoute(null)
		routerRef.current = null
	}, [])

	const executePendingRoute = useCallback(() => {
		if (pendingRoute && routerRef.current) {
			routerRef.current.push(pendingRoute)
		}
	}, [pendingRoute])

	return (
		<ModalTransitionContext.Provider value={{
			isTransitioning,
			pendingRoute,
			startTransition,
			endTransition,
			executePendingRoute
		}}>
			{children}
		</ModalTransitionContext.Provider>
	)
}

export function useModalTransition() {
	const context = useContext(ModalTransitionContext)
	if (!context) {
		throw new Error('useModalTransition must be used within ModalTransitionProvider')
	}
	return context
} 