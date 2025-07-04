"use client"
import { useRouter } from "next/navigation"
import BackButton from "../BackButton"
import UnifiedModal from "../Modal/UnifiedModal"
import { useModalTransition } from "../Modal/ModalTransitionContext"

export default function MenuModalWrapper({ title, children }) {
	const router = useRouter()
	const { navigateWithTransition } = useModalTransition()

	const handleClose = () => {
		navigateWithTransition('/', () => {
			// Start close animation if needed
		})
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