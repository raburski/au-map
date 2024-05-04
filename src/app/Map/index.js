"use client"
import { useEffect, useRef, useState } from 'react'
import MapSVG from './map.jsx'
import countryFlagEmoji from "country-flag-emoji"
import uprisingMedia from '@/data/uprisings_media.json'
import { onlyUnique } from '../array.js'
import { MEDIA_TYPE, UPRISING_LEVEL } from '../types.js'

function useUprisingCountryCodes() {
    return uprisingMedia.flatMap(media => media.countries).filter(onlyUnique)
}

function getUprisingLevel(allMedia, country) {
    const media = allMedia.filter(m => m.countries.includes(country))
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
            return '#0ba13d'
        case UPRISING_LEVEL.BROADCAST:
            return '#1ac955'
        case UPRISING_LEVEL.INFORM:
            return '#3ddb72'
    }
}

export default function Map({ onCountryClick, selectedCountryCode }) {
    const listeners = useRef([])
    const selectedCountry = useRef()
    const uprisingCountryCodes = useUprisingCountryCodes()

    const countryStyles = uprisingCountryCodes.map(cc => {
        const level = getUprisingLevel(uprisingMedia, cc)
        const fill = getCountryFill(level)
        return `
            #worldmap #${cc.toLowerCase()} { fill: ${fill}; cursor: pointer; }
            #worldmap #${cc.toLowerCase()}:hover { opacity: 0.85; }
            #worldmap #${cc.toLowerCase()} path { fill: ${fill}; cursor: pointer; }
            #worldmap #${cc.toLowerCase()} path:hover { opacity: 0.85; }
        `
    }).join('')

    useEffect(() => {
        listeners.current.forEach(({ cc, listener }) => 
            document.querySelector(`#worldmap #${cc.toLowerCase()}`).removeEventListener('click', listener)
        )
        listeners.current = uprisingCountryCodes.map(cc => {
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
        <>
            <style>{countryStyles}</style>
            <MapSVG />
        </>
    )
}