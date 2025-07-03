import CountryListContent from "../../../components/MenuModal/CountryListContent"
import MenuModalWrapper from "../../../components/MenuModalWrapper"

export const metadata = {
	title: "Country List | Architectural Uprising Map",
	description: "Browse all countries with architectural uprising movements on the interactive map",
	keywords: "countries, architectural uprising, map, movements, list",
}

export default function CountryListPage() {
	return (
		<MenuModalWrapper title="Country List">
			<CountryListContent />
		</MenuModalWrapper>
	)
} 