"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect, useMemo } from "react"
import ModalContainer from "./Modal/ModalContainer"
import MenuModalContainer from "./components/MenuModal/MenuModalContainer"
import CountryListContent from "./components/MenuModal/CountryListContent"
import RequestChangesContent from "./components/MenuModal/RequestChangesContent"
import ContactUsContent from "./components/MenuModal/ContactUsContent"
import { allCountryData } from "./data.js"
import { useModalTransition } from "./contexts/ModalTransitionContext"

export default function ModalWrapper() {
	const pathname = usePathname()
	const router = useRouter()
	const { isTransitioning, pendingRoute, endTransition, executePendingRoute } = useModalTransition()
	
	// Extract route info from pathname or pending route
	const currentRoute = isTransitioning ? pendingRoute : pathname
	const countryMatch = currentRoute?.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const menuMatch = currentRoute?.match(/^\/menu\/([^\/]+)$/)
	
	const countryCode = countryMatch ? countryMatch[1].toLowerCase() : undefined
	const menuType = menuMatch ? menuMatch[1] : undefined
	const isLocal = currentRoute?.includes('/local')

	// Memoize country data to prevent unnecessary re-renders
	const countryData = useMemo(() => {
		if (!countryCode) return null
		return allCountryData[countryCode] || null
	}, [countryCode])

	// Handle route changes
	useEffect(() => {
		if (!countryCode && !menuType) {
			return
		}

		if (countryCode && !countryData) {
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
	}, [countryCode, countryData, menuType, isTransitioning, endTransition, executePendingRoute, router])

	const handleCloseModal = () => {
		router.push('/')
	}

	const modalCountryCode = countryData?.country?.toLowerCase()

	// Handle country modal
	if (countryCode && countryData) {
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

	// Handle menu modal
	if (menuType) {
		const getModalTitle = () => {
			switch (menuType) {
				case 'country-list':
					return 'Country List'
				case 'request-changes':
					return 'Request Changes'
				case 'contact-us':
					return 'Contact Us'
				default:
					return 'Menu'
			}
		}

		const getModalContent = () => {
			switch (menuType) {
				case 'country-list':
					return <CountryListContent />
				case 'request-changes':
					return <RequestChangesContent />
				case 'contact-us':
					return <ContactUsContent />
				default:
					return <div>Content not found</div>
			}
		}

		return (
			<MenuModalContainer 
				title={getModalTitle()}
				isVisible={true}
				onClose={handleCloseModal}
			>
				{getModalContent()}
			</MenuModalContainer>
		)
	}

	// Don't render anything if no modal should be shown
	return null
} 