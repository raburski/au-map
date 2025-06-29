import { allCountryData } from '../../data.js'
import { onlyUnique } from '../../array'

export async function generateMetadata({ params }) {
	const countryCode = params.code?.toLowerCase()
	const countryData = allCountryData[countryCode]
	const mediaCount = countryData?.media?.length || 0
	
	return {
		title: `Architectural Uprising - ${countryCode?.toUpperCase()}`,
		description: `Architectural Uprising movement in ${countryCode?.toUpperCase()} with ${mediaCount} media sources`
	}
}

export default function CountryLayout({ children }) {
	return children
} 