"use client"
import { usePathname, useRouter } from "next/navigation"
import { useState, useEffect } from "react"
import ModalContainer from "./Modal/ModalContainer"
import { allCountryData } from "./data.js"

export default function ModalWrapper() {
	const pathname = usePathname()
	const router = useRouter()
	const [countryData, setCountryData] = useState(null)
	const [isLocalView, setIsLocalView] = useState(false)
	
	// Extract country code from pathname
	const countryMatch = pathname.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const countryCode = countryMatch ? countryMatch[1].toLowerCase() : undefined
	const isLocal = pathname.includes('/local')

	useEffect(() => {
		if (!countryCode) {
			setCountryData(null)
			setIsLocalView(false)
			return
		}

		// Use preloaded data instead of fetching
		const data = allCountryData[countryCode]
		if (data) {
			setCountryData(data)
			setIsLocalView(isLocal)
		} else {
			// Country data not found, redirect to home
			router.replace('/')
		}
	}, [countryCode, isLocal, router])

	const onClickAway = () => {
		router.push('/')
	}

	const modalCountryCode = countryData?.country?.toLowerCase()
	

	return (
		<ModalContainer 
			countryCode={modalCountryCode} 
			media={countryData?.media || []} 
			local={countryData?.local || []}
			isLocalView={isLocalView}
			onClickAway={onClickAway}
		/>
	)
} 