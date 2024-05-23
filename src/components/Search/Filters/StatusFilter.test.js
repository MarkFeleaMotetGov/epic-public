import { fireEvent, render, screen } from "@testing-library/react";

import { useSearch } from "contexts/Search";

import StatusFilter from "./StatusFilter";

import { STATUSES } from "constants/filters";

jest.mock("contexts/Search");

describe("StatusFilter tests", () => {
	beforeEach(() => {
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the StatusFilter component", () => {
		render(<StatusFilter />);

		expect(screen.getByRole("button", { name: "Select Status" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<StatusFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Status" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(STATUSES.length);
	});
});
