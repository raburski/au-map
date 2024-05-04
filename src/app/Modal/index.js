"use client"
import Image from "next/image"
import styles from "./modal.module.css"
import { FaDiscord, FaExternalLinkSquareAlt, FaFacebook, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
import countryFlagEmoji from "country-flag-emoji"
import { MEDIA_TYPE } from "../types";
import { useEffect, useState } from "react";

function getMediaTypeIcon(type) {
    switch (type) {
        case MEDIA_TYPE.FB_GROUP:
            return <FaFacebookSquare />
        case MEDIA_TYPE.FB_PAGE:
            return <FaFacebook />
        case MEDIA_TYPE.INSTAGRAM:
            return <FaInstagram />
        case MEDIA_TYPE.WEBSITE:
            return <FaExternalLinkSquareAlt />
        case MEDIA_TYPE.TWITTER:
            return <FaTwitter />
        case MEDIA_TYPE.DISCORD:
            return <FaDiscord />
        default:
            return null
    }
}

function MediaRow({ media }) {
    return (
        <a href={media.url} target="_blank" class={styles.mediaBox}>
            <div class={styles.mediaIcon}>{getMediaTypeIcon(media.type)}</div>
            <div class={styles.mediaLink}>{media.title}</div>
        </a>
    )
}

export default function Modal({ countryCode, media = [], onClickAway }) {
    const [_countryCode, _setCountryCode] = useState(countryCode)
    const [_media, _setMedia] = useState(media)
    useEffect(() => {
        if (!countryCode) {
            const timerId = setTimeout(() => {
                _setCountryCode(undefined)
                _setMedia([])
            }, 500)
            return () => clearTimeout(timerId)
        } else {
            _setCountryCode(countryCode)
            _setMedia(media)
        }

    }, [countryCode])

    const country = _countryCode ? countryFlagEmoji.get(_countryCode) : {}
    const className = [styles.overlay, countryCode ? styles.overlayVisible : undefined].filter(Boolean).join(' ')

    return (
        <div id="modal" className={className}>
            <a className={styles.goBack} href="/#" onClick={onClickAway}/>
            <div className={styles.popup}>
                {_countryCode ? <Image src={`/emblems/${_countryCode}.jpeg`} alt={`AU ${country.name} emblem`} width={128} height={128} className={styles.emblem}/> : null}
                <div class={styles.content}>
                    <h2>{country.name}</h2>
                    {_media.map((m, i) => <MediaRow key={`${_countryCode} ${i}`} media={m}/>)}
                </div>
            </div>
        </div>
    )
}