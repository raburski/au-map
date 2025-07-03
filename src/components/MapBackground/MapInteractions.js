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

	useEffect(() => {
		listeners.current.forEach(({ cc, listener }) => {
			const element = document.querySelector(`#worldmap #${cc.toLowerCase()}`)
			if (element) {
				element.removeEventListener('click', listener)
			}
		})
		listeners.current = Object.keys(uprisingCountriesData).map(cc => {
			const selector = `#worldmap #${cc.toLowerCase()}`
			const onClick = () => onCountryClick(cc.toLowerCase())
			const element = document.querySelector(selector)
			if (element) {
				element.addEventListener('click', onClick)
				return { cc, listener: onClick }
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