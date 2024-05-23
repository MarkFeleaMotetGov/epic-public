import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import ProjectRegionsFilter from "./ProjectRegionsFilter";

import { PROJECT_REGIONS } from "constants/filters";

jest.mock("contexts/Search");

describe("ProjectRegionsFilter gtests", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the ProjectRegionsFilter component", () => {
		render(<ProjectRegionsFilter />);

		expect(screen.getByRole("button", { name: "Select Project Regions" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<ProjectRegionsFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Project Regions" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(PROJECT_REGIONS.length);
	});
});
