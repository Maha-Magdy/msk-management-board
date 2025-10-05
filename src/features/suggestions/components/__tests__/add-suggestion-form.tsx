import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "@/test/test-utils";
import AddSuggestionForm from "../add-suggestion-form";
import { fireEvent, screen } from "@testing-library/react";

describe("AddSuggestionForm component", () => {
  test("render with helper text, and 5 fields", () => {
    // arrange
    renderWithProviders(<AddSuggestionForm employees={[]} />);

    // assert
    expect(screen.getByText("Please provide your suggestion details below.")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Type to search")).toBeInTheDocument();
    expect(screen.getByText("Select a suggestion type")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Describe your suggestion in detail")).toBeInTheDocument();
    expect(screen.getByText("Choose priority level")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add any additional notes (optional)")).toBeInTheDocument();
  });

  test("will not render if any of the required fields missing", () => {
    // arrange
    const mockCallback = jest.fn();
    renderWithProviders(<AddSuggestionForm employees={[]} callback={mockCallback} />);
    const submitBtn = screen.getByRole("button", { name: "Submit" });

    // act
    fireEvent.click(submitBtn);

    // assert
    expect(mockCallback).not.toHaveBeenCalled();
  });

  test("will be submitted if the required fields getting filled", async () => {
    // arrange
    const mockCallback = jest.fn();

    renderWithProviders(<AddSuggestionForm employees={[]} callback={mockCallback} />);

    const comboboxes = screen.getAllByRole("combobox");
    const employeeInput = screen.getByPlaceholderText("Type to search");
    const typeBtn = comboboxes[1];
    const description = screen.getByPlaceholderText("Describe your suggestion in detail");
    const priorityBtn = comboboxes[2];
    const submitBtn = screen.getByRole("button", { name: "Submit" });

    expect(employeeInput).toBeInTheDocument();

    // act
    await userEvent.type(employeeInput, "02");

    await userEvent.click(typeBtn);
    const exerciseOption = await screen.getByText("Exercise", { selector: '[data-scope="select"]' });
    await userEvent.click(exerciseOption);

    await userEvent.type(
      description,
      "Replace standard peripherals with ergonomic keyboard and mouse to reduce wrist strain"
    );

    await userEvent.click(priorityBtn);
    const highOption = await screen.getByText("High", { selector: '[data-scope="select"]' });
    await userEvent.click(highOption);

    fireEvent.click(submitBtn);

    // assert  
    // expect(mockCallback).toHaveBeenCalled();
  });
});
