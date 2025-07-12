// Image preloader utility
const preloadImage = (src) => {
	return new Promise((resolve, reject) => {
		const img = new Image()
		img.onload = () => resolve(img)
		img.onerror = () => reject(new Error(`Failed to load image: ${src}`))
		img.src = src
	})
}

// Preload country emblems
export const preloadCountryEmblems = async (allCountryData) => {
	const countryCodes = Object.keys(allCountryData)
	
	const emblemPromises = countryCodes.map(code => 
		preloadImage(`/emblems/${code}.jpg`)
	)
	
	try {
		await Promise.allSettled(emblemPromises)
		console.log('Country emblems preloaded successfully')
	} catch (error) {
		console.warn('Some emblems failed to preload:', error)
	}
}

// Preload specific images
export const preloadImages = async (imageUrls) => {
	const promises = imageUrls.map(url => preloadImage(url))
	
	try {
		await Promise.allSettled(promises)
		console.log('Images preloaded successfully')
	} catch (error) {
		console.warn('Some images failed to preload:', error)
	}
}

// Preload all modal-related images
export const preloadModalImages = async (allCountryData) => {
	const imageUrls = []
	
	// Add country emblems
	Object.keys(allCountryData).forEach(code => {
		imageUrls.push(`/emblems/${code}.jpg`)
	})
	
	// Add local branch emblems
	Object.entries(allCountryData).forEach(([countryCode, country]) => {
		if (country.local && country.local.length > 0) {
			country.local.forEach(branch => {
				imageUrls.push(`/emblems/${countryCode}/${branch.cityCode}.jpg`)
			})
		}
	})
	
	await preloadImages(imageUrls)
} 