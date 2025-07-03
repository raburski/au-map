"use client"
import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useModalTransition } from '../contexts/ModalTransitionContext'
import MapSVG from '../Map/map.jsx'
import countryFlagEmoji from "country-flag-emoji"
import { MEDIA_TYPE, UPRISING_LEVEL } from '../types.js'
import { uprisingCountries, allCountryData } from '../data.js'
import styles from './mapBackground.module.css'

function getUprisingLevel(media) {
    const fbGroup = media.find(m => m.type === MEDIA_TYPE.FB_GROUP)
    const informMedia = media.filter(m => m.type === MEDIA_TYPE.FB_PAGE || m.type === MEDIA_TYPE.INSTAGRAM || m.type === MEDIA_TYPE.WEBSITE)
    if (fbGroup && informMedia.length > 0) {
        return UPRISING_LEVEL.FULL
    } else if (fbGroup && informMedia.length === 0) {
        return UPRISING_LEVEL.INVOLVE
    } else if (informMedia.length > 1) {
        return UPRISING_LEVEL.BROADCAST
    } else {
        return UPRISING_LEVEL.INFORM
    }
}

function getCountryFill(uprisingLevel) {
    switch (uprisingLevel) {
        case UPRISING_LEVEL.FULL:
            return '#038d31'
        case UPRISING_LEVEL.INVOLVE:
            return '#0dba47'
        case UPRISING_LEVEL.BROADCAST:
            return '#1ac955'
        case UPRISING_LEVEL.INFORM:
            return '#3ddb72'
    }
}

export default function MapBackground() {
    const listeners = useRef([])
    const selectedCountry = useRef()
    const router = useRouter()
    const pathname = usePathname()
    const { startTransition } = useModalTransition()

	// Use preloaded uprising countries data
	const uprisingCountriesData = uprisingCountries.reduce((acc, code) => {
		const data = allCountryData[code]
		if (data) {
			acc[code] = data
		}
		return acc
	}, {})

	// Extract country code from pathname for highlighting
	const countryMatch = pathname?.match(/^\/country\/([^\/]+)(?:\/local)?$/)
	const selectedCountryCode = countryMatch ? countryMatch[1].toUpperCase() : undefined

	const countryStyles = Object.entries(uprisingCountriesData).map(([code, data]) => {
		const level = getUprisingLevel(data.media)
        const fill = getCountryFill(level)
		return `#worldmap #${code.toLowerCase()} { fill: ${fill}; cursor: pointer; }
#worldmap #${code.toLowerCase()}:hover { opacity: 0.85; }
#worldmap #${code.toLowerCase()} path { fill: ${fill}; cursor: pointer; }
#worldmap #${code.toLowerCase()} path:hover { opacity: 0.85; }
`
    }).join('')

    const onCountryClick = (cc) => {
        startTransition(`/country/${cc}`, router)
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

    return (
        <div className={styles.mapBackground}>
            <style>{countryStyles}</style>
            <MapSVG />
        </div>
    )
} 