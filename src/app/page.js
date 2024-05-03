"use client"
import Image from "next/image";
import { useRouter } from 'next/router'
import styles from "./page.module.css";
import Map from "./Map";
import { useState } from "react";
import Modal from "./Modal";
import uprisingMedia from '@/data/uprisings_media.json'

export default function Home() {
  // const router = useRouter()
  const [selectedCountry, setSelectedCountry] = useState()
  const onCountryClick = cc => {
    setSelectedCountry(cc)
    // router.push(`?cc=${cc}`)
  }

  const selectedCountryMedia = selectedCountry ? uprisingMedia.filter(m => m.countries.includes(selectedCountry.toLowerCase())) : []

  return (
    <main className={styles.main}>
      <div className={styles.mapContainer}>
        <Map onCountryClick={onCountryClick}/>
      </div>
      <Modal countryCode={selectedCountry} media={selectedCountryMedia}/>
    </main>
  );
}
