"use client"
import Image from "next/image"
import styles from "./modal.module.css"
import { FaExternalLinkSquareAlt, FaFacebook, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa";
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
            setTimeout(() => {
                _setCountryCode(undefined)
                _setMedia([])
            }, 500)
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
                <Image src={`/emblems/${_countryCode}.jpeg`} width={128} height={128} className={styles.emblem}/>
                <div class={styles.content}>
                    <h2>{country.name}</h2>
                    {_media.map(m => <MediaRow media={m}/>)}
                </div>
            </div>
        </div>
    )
}