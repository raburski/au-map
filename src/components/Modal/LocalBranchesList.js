import Image from "next/image"
import { FaDiscord, FaExternalLinkSquareAlt, FaFacebook, FaFacebookSquare, FaInstagram, FaTwitter } from "react-icons/fa"
import { MEDIA_TYPE } from "@/app/types.js"
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

function LocalBranch({ branch, countryCode }) {
	return (
		<div className={styles.localBranchCard}>
			<div className={styles.branchCardHeader}>
				<Image 
					src={`/emblems/${countryCode}/${branch.cityCode}.jpg`} 
					alt={`${branch.city} emblem`} 
					width={64} 
					height={64} 
					className={styles.cityEmblemSmall}
					unoptimized
				/>
				<span className={styles.cityName}>{branch.city}</span>
			</div>
			<div className={styles.branchCardMedia}>
				{branch.media.map((media, index) => (
					<a 
						key={index} 
						href={media.url} 
						target="_blank" 
						className={styles.branchMediaLink}
						title={media.title}
					>
						<div className={styles.branchMediaIcon}>
							{getMediaTypeIcon(media.type)}
						</div>
						<div className={styles.branchMediaContent}>
							<div className={styles.branchMediaTitle}>{media.title}</div>
							<div className={styles.branchMediaType}>{getMediaTypeLabel(media.type)}</div>
						</div>
					</a>
				))}
			</div>
		</div>
	)
}

export default function LocalBranchesList({ local, countryCode }) {
	return (
		<div className={styles.localBranchesGrid}>
			{local.map((branch, index) => (
				<LocalBranch key={`${branch.cityCode}-${index}`} branch={branch} countryCode={countryCode} />
			))}
		</div>
	)
} 