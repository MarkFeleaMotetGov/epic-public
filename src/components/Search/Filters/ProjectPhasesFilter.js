import PropTypes from "prop-types";
import { useMemo } from "react";

import AccountTreeOutlinedIcon from "@mui/icons-material/AccountTreeOutlined";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";

import Filter from "components/Filter";

import { LIST_TYPE_FILTER_KEYS } from "constants/filters";

const ProjectPhasesFilter = ({ filterKey }) => {
	const { onFilterChange, selectedFilters } = useSearch();

	const { data = [{ searchResults: [] }] } = useLists({ enabled: true });

	const items = useMemo(() => {
		return data[0].searchResults
			.filter((item) => item.type === LIST_TYPE_FILTER_KEYS[filterKey])
			.reduce((acc, item) => {
				const existingItem = acc.find((i) => i.description === item.name);
				if (existingItem) {
					existingItem.key.push(item._id);
				} else {
					acc.push({
						description: item.name,
						key: [item._id],
						filterKey,
					});
				}
				return acc;
			}, [])
			.map((item) => {
				return { ...item, key: item.key.join(",") };
			})
			.sort((a, b) => a.description > b.description);
	}, [data, filterKey]);

	const selected = useMemo(
		() => selectedFilters.filter(({ filterKey: fk }) => fk === filterKey),
		[filterKey, selectedFilters],
	);

	return (
		<Filter
			filterKey={filterKey}
			icon={<AccountTreeOutlinedIcon />}
			items={items}
			onChange={(filters) => onFilterChange(filterKey, filters)}
			selected={selected}
			title="Project Phases"
		/>
	);
};

ProjectPhasesFilter.propTypes = {
	filterKey: PropTypes.string,
};

export default ProjectPhasesFilter;
