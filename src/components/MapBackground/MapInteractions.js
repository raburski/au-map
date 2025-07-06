"use client"
import { useEffect, useRef } from 'react'
import { useRouter, usePathname } from 'next/navigation'

export default function MapInteractions({ uprisingCountriesData }) {
	const listeners = useRef([])
	const selectedCountry = useRef()
	const router = useRouter()
	const pathname = usePathname()

	// Extract country code from pathname for highlighting
	const countryMatch = pathname?.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const selectedCountryCode = countryMatch ? countryMatch[1].toUpperCase() : undefined

	const onCountryClick = (cc) => {
		router.push(`/country/${cc}`)
	}

	// Prefetch country routes on hover
	const onCountryHover = (cc) => {
		router.prefetch(`/country/${cc}`)
		
		// Only prefetch local route if country has local branches
		const countryData = uprisingCountriesData[cc.toUpperCase()]
		if (countryData?.local && countryData.local.length > 0) {
			router.prefetch(`/country/${cc}/local`)
		}
	}

	useEffect(() => {
		listeners.current.forEach(({ cc, listener, hoverListener }) => {
			const element = document.querySelector(`#worldmap #${cc.toLowerCase()}`)
			if (element) {
				element.removeEventListener('click', listener)
				element.removeEventListener('mouseenter', hoverListener)
			}
		})
		listeners.current = Object.keys(uprisingCountriesData).map(cc => {
			const selector = `#worldmap #${cc.toLowerCase()}`
			const onClick = () => onCountryClick(cc.toLowerCase())
			const onMouseEnter = () => onCountryHover(cc.toLowerCase())
			const element = document.querySelector(selector)
			if (element) {
				element.addEventListener('click', onClick)
				element.addEventListener('mouseenter', onMouseEnter)
				return { cc, listener: onClick, hoverListener: onMouseEnter }
			} else {
				return null
			}
		}).filter(Boolean)
	}, [onCountryClick, uprisingCountriesData])

	useEffect(() => {
		if (selectedCountry.current) {
			selectedCountry.current.classList.remove('selectedCountry')
		}
		selectedCountry.current = document.querySelector(`#worldmap #${selectedCountryCode}`)
		if (selectedCountry.current) {
			selectedCountry.current.classList.add('selectedCountry')
		}
	}, [selectedCountryCode])

	return null
} 