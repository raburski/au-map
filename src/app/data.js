// Import all country data at build time to bundle with the app
import uprisingIndex from '../data/uprisings/index.json'
import atData from '../data/uprisings/at.json'
import auData from '../data/uprisings/au.json'
import brData from '../data/uprisings/br.json'
import chData from '../data/uprisings/ch.json'
import deData from '../data/uprisings/de.json'
import dkData from '../data/uprisings/dk.json'
import eeData from '../data/uprisings/ee.json'
import esData from '../data/uprisings/es.json'
import fiData from '../data/uprisings/fi.json'
import frData from '../data/uprisings/fr.json'
import grData from '../data/uprisings/gr.json'
import ilData from '../data/uprisings/il.json'
import isData from '../data/uprisings/is.json'
import itData from '../data/uprisings/it.json'
import ltData from '../data/uprisings/lt.json'
import luData from '../data/uprisings/lu.json'
import mdData from '../data/uprisings/md.json'
import meData from '../data/uprisings/me.json'
import mxData from '../data/uprisings/mx.json'
import nlData from '../data/uprisings/nl.json'
import noData from '../data/uprisings/no.json'
import plData from '../data/uprisings/pl.json'
import ptData from '../data/uprisings/pt.json'
import roData from '../data/uprisings/ro.json'
import rsData from '../data/uprisings/rs.json'
import seData from '../data/uprisings/se.json'
import siData from '../data/uprisings/si.json'
import skData from '../data/uprisings/sk.json'
import syData from '../data/uprisings/sy.json'

// Map of all country data
const allCountryData = {
	at: atData,
	au: auData,
	br: brData,
	ch: chData,
	de: deData,
	dk: dkData,
	ee: eeData,
	es: esData,
	fi: fiData,
	fr: frData,
	gr: grData,
	il: ilData,
	is: isData,
	it: itData,
	lt: ltData,
	lu: luData,
	md: mdData,
	me: meData,
	mx: mxData,
	nl: nlData,
	no: noData,
	pl: plData,
	pt: ptData,
	ro: roData,
	rs: rsData,
	se: seData,
	si: siData,
	sk: skData,
	sy: syData
}

// List of all uprising countries
const uprisingCountries = uprisingIndex

// All media from all countries (including local branches)
const allImages = uprisingCountries.flatMap(countryCode => {
	const countryData = allCountryData[countryCode]
	const nationalMedia = countryData?.media || []
	const localMedia = countryData?.local?.flatMap(branch => branch.media) || []
	return [...nationalMedia, ...localMedia]
})

export { allCountryData, uprisingCountries, allImages } 