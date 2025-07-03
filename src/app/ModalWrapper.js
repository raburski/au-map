"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import ModalContainer from "./Modal/ModalContainer"
import { allCountryData } from "./data.js"
import { useModalTransition } from "./contexts/ModalTransitionContext"

export default function ModalWrapper() {
	const pathname = usePathname()
	const router = useRouter()
	const { isTransitioning, pendingRoute, endTransition, executePendingRoute } = useModalTransition()
	
	// Extract country code from pathname or pending route
	const currentRoute = isTransitioning ? pendingRoute : pathname
	const countryMatch = currentRoute?.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const countryCode = countryMatch ? countryMatch[1].toLowerCase() : undefined
	const isLocal = currentRoute?.includes('/local')

	// Memoize country data to prevent unnecessary re-renders
	const countryData = useMemo(() => {
		if (!countryCode) return null
		return allCountryData[countryCode] || null
	}, [countryCode])

	// Handle route changes
	useEffect(() => {
		if (!countryCode) {
			return
		}

		if (!countryData) {
			router.replace('/')
			return
		}
		
		// Execute pending route after animation starts, then end transition
		if (isTransitioning) {
			const executeTimer = setTimeout(() => {
				executePendingRoute()
			}, 50) // Small delay to ensure modal animation has started
			
			const endTimer = setTimeout(() => {
				endTransition()
			}, 350) // Wait for animation to complete (300ms + buffer)
			
			return () => {
				clearTimeout(executeTimer)
				clearTimeout(endTimer)
			}
		}
	}, [countryCode, countryData, isTransitioning, endTransition, executePendingRoute, router])

	const handleCloseModal = () => {
		router.push('/')
	}

	const modalCountryCode = countryData?.country?.toLowerCase()

	// Don't render if no country code or no data
	if (!countryCode || !countryData) {
		return null
	}

	return (
		<ModalContainer 
			countryCode={modalCountryCode} 
			media={countryData.media || []} 
			local={countryData.local || []}
			isLocalView={isLocal}
			onClickAway={handleCloseModal}
		/>
	)
} 