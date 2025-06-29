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

	// Debug logging
	console.log('ModalWrapper render:', {
		pathname,
		countryCode,
		isLocal,
		hasCountryData: !!countryData,
		isLocalView
	})

	useEffect(() => {
		console.log('ModalWrapper effect triggered:', { countryCode, isLocal })
		
		if (!countryCode) {
			console.log('No countryCode - clearing data')
			setCountryData(null)
			setIsLocalView(false)
			return
		}

		// Use preloaded data instead of fetching
		const data = allCountryData[countryCode]
		if (data) {
			console.log('Setting country data:', countryCode)
			setCountryData(data)
			setIsLocalView(isLocal)
		} else {
			console.log('Country data not found, redirecting to home')
			// Country data not found, redirect to home
			router.replace('/')
		}
	}, [countryCode, isLocal, router])

	const onClickAway = () => {
		console.log('ModalWrapper onClickAway - navigating to home')
		router.push('/')
	}

	const modalCountryCode = countryData?.country?.toUpperCase()
	
	console.log('ModalWrapper returning ModalContainer with:', {
		modalCountryCode,
		mediaCount: countryData?.media?.length || 0,
		localCount: countryData?.local?.length || 0,
		isLocalView
	})

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