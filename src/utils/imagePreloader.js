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
		preloadImage(`/emblems/${code}.jpeg`)
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
		imageUrls.push(`/emblems/${code}.jpeg`)
	})
	
	// Add any other images from country data if needed
	Object.values(allCountryData).forEach(country => {
		// Add any other image URLs from country data here if they exist
		// For example, if there are additional images in media or local branches
	})
	
	await preloadImages(imageUrls)
} 