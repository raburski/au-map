"use client"
import { useState, useEffect, useRef } from "react"
import { useRouter, usePathname } from "next/navigation"
import { allCountryData } from "@/app/data.js"
import UnifiedModal from "../Modal/UnifiedModal"

export default function CountryModal() {
	const pathname = usePathname()
	const router = useRouter()
	const [isVisible, setIsVisible] = useState(false)
	const hasInitialized = useRef(false)

	// Extract country code from pathname
	const countryMatch = pathname?.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const countryCode = countryMatch ? countryMatch[1].toLowerCase() : undefined
	const isLocal = pathname?.includes('/local')

	// Get country data
	const countryData = countryCode ? allCountryData[countryCode] : null

	// Handle modal visibility
	useEffect(() => {
		if (countryCode && countryData && !hasInitialized.current) {
			hasInitialized.current = true
			setIsVisible(true)
		} else if (!countryCode && hasInitialized.current) {
			hasInitialized.current = false
			setIsVisible(false)
		}
	}, [countryCode, countryData])

	// Redirect to home if country doesn't exist
	useEffect(() => {
		if (countryCode && !countryData) {
			router.replace('/')
		}
	}, [countryCode, countryData, router])

	const handleCloseModal = () => {
		router.push('/')
	}

	if (!countryCode || !countryData) {
		return null
	}

	return (
		<UnifiedModal
			type="country"
			isVisible={isVisible}
			onClose={handleCloseModal}
			countryCode={countryCode}
			media={countryData.media || []}
			local={countryData.local || []}
			isLocalView={isLocal}
		/>
	)
} 