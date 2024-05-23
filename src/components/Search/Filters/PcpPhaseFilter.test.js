import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import PcpPhaseFilter from "./PcpPhaseFilter";

import { PCP_PROJECT_PHASES } from "constants/filters";

jest.mock("contexts/Search");

describe("PcpPhaseFilter tests", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the PcpPhaseFilter component", () => {
		render(<PcpPhaseFilter />);

		expect(screen.getByRole("button", { name: "Select Project Phase" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<PcpPhaseFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Project Phase" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(PCP_PROJECT_PHASES.length);
	});
});
