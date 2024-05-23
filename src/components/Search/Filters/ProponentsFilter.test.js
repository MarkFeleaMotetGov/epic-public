import { fireEvent, render, screen } from "@testing-library/react";
import { mockUseOrganizationsData } from "__mocks__";

import { useSearch } from "contexts/Search";

import useOrganizations from "queries/useOrganizations";

import ProponentsFilter from "./ProponentsFilter";

jest.mock("contexts/Search");
jest.mock("queries/useOrganizations");

describe("ProponentsFilter gtests", () => {
	beforeEach(() => {
		useOrganizations.mockReturnValue({
			data: mockUseOrganizationsData,
		});
		useSearch.mockReturnValue({
			onFilterChange: jest.fn(),
			selectedFilters: [],
		});
	});

	test("renders the ProponentsFilter component", () => {
		render(<ProponentsFilter />);

		expect(screen.getByRole("button", { name: "Select Proponents" })).toBeInTheDocument();
	});

	test("contains the correct number of selectable items", () => {
		render(<ProponentsFilter />);

		const filterButton = screen.getByRole("button", { name: "Select Proponents" });
		expect(filterButton).toBeInTheDocument();
		fireEvent.click(filterButton);

		const filterItems = screen.getAllByRole("checkbox");
		expect(filterItems.length).toBe(mockUseOrganizationsData.length);
	});
});
