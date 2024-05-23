import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import ProjectTypesFilter from "./ProjectTypesFilter";

import { PROJECT_TYPES } from "constants/filters";

jest.mock("contexts/Search");

describe("ProjectTypesFilter tests", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the ProjectTypesFilter component", () => {
		render(<ProjectTypesFilter />);

		expect(screen.getByRole("button", { name: "Select Project Type" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<ProjectTypesFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Project Type" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(PROJECT_TYPES.length);
	});
});
