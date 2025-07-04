import RequestChangesContent from "./RequestChangesContent"
import MenuModalWrapper from "@/components/MenuModalWrapper"

export const metadata = {
	title: "Request Changes | Architectural Uprising Map",
	description: "Learn how to contribute and update data for the Architectural Uprising map",
	keywords: "contribute, request changes, architectural uprising, github, open source",
}

export default function RequestChangesPage() {
	return (
		<MenuModalWrapper title="Request Changes">
			<RequestChangesContent />
		</MenuModalWrapper>
	)
} 