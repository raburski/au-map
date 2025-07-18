import MapSVG from '../Map/map.jsx'
import { MEDIA_TYPE, UPRISING_LEVEL } from '@/app/types.js'
import { uprisingCountries, allCountryData } from '@/app/data.js'
import styles from './mapBackground.module.css'
import MapInteractions from './MapInteractions.js'

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
	// Use preloaded uprising countries data
	const uprisingCountriesData = uprisingCountries.reduce((acc, code) => {
		const data = allCountryData[code]
		if (data) {
			acc[code] = data
		}
		return acc
	}, {})

	const countryStyles = Object.entries(uprisingCountriesData).map(([code, data]) => {
		const level = getUprisingLevel(data.media)
		const fill = getCountryFill(level)
		return `#worldmap #${code.toLowerCase()} { fill: ${fill}; cursor: pointer; }
#worldmap #${code.toLowerCase()}:hover { opacity: 0.85; }
#worldmap #${code.toLowerCase()} path { fill: ${fill}; cursor: pointer; }
#worldmap #${code.toLowerCase()} path:hover { opacity: 0.85; }
`
	}).join('')

	return (
		<div className={styles.mapBackground}>
			<style>{countryStyles}</style>
			<MapSVG />
			<MapInteractions uprisingCountriesData={uprisingCountriesData} />
		</div>
	)
} 