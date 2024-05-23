import { fireEvent, render, screen } from "@testing-library/react";
import { mockUseListsData } from "__mocks__";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";

import ProjectPhasesFilter from "./ProjectPhasesFilter";

import { FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

jest.mock("contexts/Search");
jest.mock("queries/useLists");

describe("ProjectPhasesFilter tests", () => {
	beforeEach(() => {
		useLists.mockReturnValue({
			data: mockUseListsData,
		});
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the ProjectPhasesFilter component", () => {
		render(<ProjectPhasesFilter filterKey={FILTER_KEYS.PROJECT_PHASES} />);

		expect(screen.getByRole("button", { name: "Select Project Phases" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<ProjectPhasesFilter filterKey={FILTER_KEYS.PROJECT_PHASES} />);

		const filterButton = screen.getByRole("button", { name: "Select Project Phases" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(
			mockUseListsData[0].searchResults.filter(
				(item) => item.type === LIST_TYPE_FILTER_KEYS[FILTER_KEYS.PROJECT_PHASES],
			).length,
		);
	});
});
