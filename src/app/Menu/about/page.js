import AboutContent from "../../../components/MenuModal/AboutContent"
import MenuModalWrapper from "../../../components/MenuModalWrapper"

export const metadata = {
	title: "About | Architectural Uprising Map",
	description: "Learn about the Architectural Uprising movement and this open-source interactive map project",
	keywords: "architectural uprising, about, open source, community, architecture movement",
}

export default function AboutPage() {
	return (
		<MenuModalWrapper title="About">
			<AboutContent />
		</MenuModalWrapper>
	)
} 