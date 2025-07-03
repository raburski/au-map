"use client"
import { useRouter } from "next/navigation"
import BackButton from "../BackButton"
import UnifiedModal from "../Modal/UnifiedModal"

export default function MenuModalWrapper({ title, children }) {
	const router = useRouter()

	const handleClose = () => {
		router.push('/')
	}

	return (
		<>
			{/* <BackButton /> */}
			<UnifiedModal
				type="menu"
				isVisible={true}
				onClose={handleClose}
				title={title}
			>
				{children}
			</UnifiedModal>
		</>
	)
} 