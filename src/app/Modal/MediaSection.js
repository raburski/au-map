import { FaDiscord, FaExternalLinkSquareAlt, FaFacebook, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa"
import { MEDIA_TYPE } from "../types"
import styles from "./modal-refactored.module.css"

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

function getMediaTypeLabel(type) {
	switch (type) {
		case MEDIA_TYPE.FB_GROUP:
			return "Facebook Group"
		case MEDIA_TYPE.FB_PAGE:
			return "Facebook Page"
		case MEDIA_TYPE.INSTAGRAM:
			return "Instagram"
		case MEDIA_TYPE.WEBSITE:
			return "Website"
		case MEDIA_TYPE.TWITTER:
			return "Twitter"
		case MEDIA_TYPE.DISCORD:
			return "Discord"
		default:
			return "Link"
	}
}

function MediaRow({ media }) {
	return (
		<a href={media.url} target="_blank" className={styles.mediaBox}>
			<div className={styles.mediaIcon}>{getMediaTypeIcon(media.type)}</div>
			<div className={styles.mediaContent}>
				<div className={styles.mediaLink}>{media.title}</div>
				<div className={styles.mediaSubtitle}>{getMediaTypeLabel(media.type)}</div>
			</div>
		</a>
	)
}

export default function MediaSection({ media }) {
	return (
		<div className={styles.mediaSection}>
			{media.map((m, i) => <MediaRow key={i} media={m}/>)}
		</div>
	)
} 