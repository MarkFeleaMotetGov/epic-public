import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import UpdateTypesFilter from "./UpdateTypesFilter";

import { UPDATE_TYPES } from "constants/filters";

jest.mock("contexts/Search");

describe("UpdateTypesFilter tests", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the UpdateTypesFilter component", () => {
		render(<UpdateTypesFilter />);

		expect(screen.getByRole("button", { name: "Select Types of Update" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<UpdateTypesFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Types of Update" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(UPDATE_TYPES.length);
	});
});
