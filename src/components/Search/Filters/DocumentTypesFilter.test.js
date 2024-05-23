import { fireEvent, render, screen } from "@testing-library/react";
import { mockUseListsData } from "__mocks__";

import { useSearch } from "contexts/Search";

import useLists from "queries/useLists";

import DocumentTypesFilter from "./DocumentTypesFilter";

import { FILTER_KEYS, LIST_TYPE_FILTER_KEYS } from "constants/filters";

jest.mock("contexts/Search");
jest.mock("queries/useLists");

describe("DocumentTypesFilter tests", () => {
	const mockOnFilterChange = jest.fn();

	beforeEach(() => {
		useLists.mockReturnValue({
			data: mockUseListsData,
		});
		useSearch.mockReturnValue({
			onFilterChange: mockOnFilterChange,
			selectedFilters: [],
		});
	});

	test("renders the DocumentTypesFilter component", () => {
		render(<DocumentTypesFilter />);

		expect(screen.getByRole("button", { name: "Select Document Types" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<DocumentTypesFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Document Types" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(
			mockUseListsData[0].searchResults.filter(
				(item) => item.type === LIST_TYPE_FILTER_KEYS[FILTER_KEYS.DOCUMENT_TYPES],
			).length,
		);
	});
});
