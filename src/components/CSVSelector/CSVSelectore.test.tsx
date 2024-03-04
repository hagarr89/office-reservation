// CSVSelector.test.js
import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CSVSelector from "./CSVSelector";

describe("CSVSelector", () => {
  test("renders file input", () => {
    const onChange = jest.fn();
    render(<CSVSelector onChange={onChange} />);
    const fileInput = screen.getByTestId("csvFileInput");
    expect(fileInput).toBeInTheDocument();
  });

  test("handles file change", async () => {
    const onChange = jest.fn();
    render(<CSVSelector onChange={onChange} />);
    const fileInput = screen.getByTestId("csvFileInput");

    // Create a sample CSV file
    const csvFile = new File(["name,age\nJohn,25\nJane,30"], "sample.csv", {
      type: "text/csv",
    });

    // Trigger file change event
    fireEvent.change(fileInput, { target: { files: [csvFile] } });

    // Wait for the file parsing to complete (assuming it's an asynchronous operation)
    await waitFor(() => {
      // Assert that onChange is called with the expected data
      expect(onChange).toHaveBeenCalledWith([
        { name: "John", age: "25" },
        { name: "Jane", age: "30" },
      ]);
    });
  });

  test("handles empty file", async () => {
    const onChange = jest.fn();
    render(<CSVSelector onChange={onChange} />);
    const fileInput = screen.getByTestId("csvFileInput");

    // Trigger file change event with an empty file
    fireEvent.change(fileInput, { target: { files: [] } });

    // Wait for the file parsing to complete (assuming it's an asynchronous operation)
    await waitFor(() => {
      // Assert that onChange is called with an empty array
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });

  test("handles file parsing error", async () => {
    const onChange = jest.fn();
    render(<CSVSelector onChange={onChange} />);
    const fileInput = screen.getByTestId("csvFileInput");

    // Trigger file change event with an invalid file (e.g., non-CSV file)
    fireEvent.change(fileInput, {
      target: { files: [new File([], "invalid.txt")] },
    });

    // Wait for the file parsing to complete (assuming it's an asynchronous operation)
    await waitFor(() => {
      // Assert that onChange is called with an empty array (or handle error in your actual implementation)
      expect(onChange).toHaveBeenCalledWith([]);
    });
  });
});
