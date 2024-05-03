import Image from "next/image"
import styles from "./modal.module.css"
import { FaFacebook, FaFacebookSquare, FaInstagram, FaThList } from "react-icons/fa";
import countryFlagEmoji from "country-flag-emoji"
import { MEDIA_TYPE } from "../types";

function getMediaTypeIcon(type) {
    switch (type) {
        case MEDIA_TYPE.FB_GROUP:
            return <FaFacebookSquare />
        case MEDIA_TYPE.FB_PAGE:
            return <FaFacebook />
        case MEDIA_TYPE.INSTAGRAM:
            return <FaInstagram />
        case MEDIA_TYPE.WEBSITE:
            return <FaThList />
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

export default function Modal({ countryCode, media}) {
    const country = countryFlagEmoji.get(countryCode)

    console.log('country', media)

    return (
        <div id="country" className={styles.overlay}>
            <a className={styles.goBack} href="/#"/>
            <div className={styles.popup}>
                <Image src={`/emblems/${countryCode.toLowerCase()}.jpeg`} width={128} height={128} className={styles.emblem}/>
                <div class={styles.content}>
                    <h2>{country.name}</h2>
                    {media.map(m => <MediaRow media={m}/>)}
                </div>
            </div>
        </div>
    )
}