"use client"
import { useEffect } from "react"
import { preloadCountryEmblems } from "../../utils/imagePreloader"
import { allCountryData } from "../../app/data"

export default function ImagePreloader() {
	useEffect(() => {
		// Preload images after component mounts
		const preloadImages = async () => {
			try {
				await preloadCountryEmblems(allCountryData)
			} catch (error) {
				console.warn('Image preloading failed:', error)
			}
		}

		// Use requestIdleCallback if available, otherwise setTimeout
		if (typeof window !== 'undefined' && window.requestIdleCallback) {
			window.requestIdleCallback(preloadImages, { timeout: 2000 })
		} else {
			// Fallback for browsers that don't support requestIdleCallback
			setTimeout(preloadImages, 100)
		}
	}, [])

	// This component doesn't render anything
	return null
} 