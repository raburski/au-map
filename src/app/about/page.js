import AboutContent from "./AboutContent"
import StaticModal from "@/components/StaticModal"

export const metadata = {
	title: "About | Architectural Uprising Map",
	description: "Learn about the Architectural Uprising movement and this open-source interactive map project",
	keywords: "architectural uprising, about, open source, community, architecture movement",
}

export default function AboutPage() {
	return (
		<StaticModal title="About">
			<AboutContent />
		</StaticModal>
	)
} 