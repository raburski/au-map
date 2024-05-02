"use client"
import { useEffect, useRef, useState } from 'react'
import MapSVG from './map.jsx'
import countryFlagEmoji from "country-flag-emoji"


export default function Map({ onCountryClick, countryCodes }) {
    const listeners = useRef([])
    const allCountryCodes = countryFlagEmoji.countryCodes

    useEffect(() => {
        listeners.current.forEach(({ cc, listener }) => 
            document.querySelector(`#worldmap #${cc.toLowerCase()}`).removeEventListener('click', listener)
        )
        listeners.current = allCountryCodes.map(cc => {
            const selector = `#worldmap #${cc.toLowerCase()}`
            const onClick = () => onCountryClick(cc)
            const element = document.querySelector(selector)
            if (element) {
                return { cc, listener: document.querySelector(selector).addEventListener('click', onClick) }
            } else {
                return null
            }
        }).filter(Boolean)
    }, [onCountryClick])

    return <MapSVG />
}