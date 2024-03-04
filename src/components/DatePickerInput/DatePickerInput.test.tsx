import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import dayjs from "dayjs";
import DatePickerInput from "./DatePickerInput";

describe("DatePickerInput", () => {
  test("renders with the provided date and updates date on change", () => {
    const currentDate = dayjs("2022-03-04");
    const maxDate = dayjs("2022-03-10");

    const handleChangeDate = jest.fn();

    render(
      <DatePickerInput
        date={currentDate}
        onChangeDate={handleChangeDate}
        maxDate={maxDate}
      />
    );
    const datePicker = screen.getByLabelText("Select a date");
    // Check if the label and default value are rendered correctly
    expect(datePicker).toBeInTheDocument();
    expect(datePicker).toHaveValue("03-2022");

    // Trigger a change event
    fireEvent.change(datePicker, {
      target: { value: "01-2022" },
    });

    // // Check if the input value is updated
    expect(datePicker).toHaveValue("01-2022");
  });
});
