"use client"
import styles from "./page.module.css";
import Map from "./Map";
import { useState } from "react";
import Modal from "./Modal";
import uprisingMedia from '@/data/uprisings_media.json'

function getCountryFromURL() {
  const element = typeof window !== "undefined" ? `${window.location}`.split('#') : []
  return element[1] ? element[1].replace('country=', '') : undefined
}

export default function Home() {
  const [selectedCountry, setSelectedCountry] = useState(getCountryFromURL())
  const onCountryClick = cc => {
    setSelectedCountry(cc)
    window.location = `/#country=${cc}`
  }

  const onClickAway = () => setSelectedCountry(undefined)

  const selectedCountryMedia = selectedCountry ? uprisingMedia.filter(m => m.countries.includes(selectedCountry.toLowerCase())) : []

  return (
    <main className={styles.main}>
      <div className={styles.mapContainer}>
        <Map onCountryClick={onCountryClick}/>
      </div>
      <Modal countryCode={selectedCountry} media={selectedCountryMedia} onClickAway={onClickAway}/>
    </main>
  );
}
