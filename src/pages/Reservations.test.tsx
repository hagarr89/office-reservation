import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Reservations from "./Reservations";

//TODO -missing tests
describe("Reservations Component", () => {
  it("renders the component with initial state", () => {
    render(<Reservations />);

    // Assert initial state
    expect(screen.getByText("Reservation Page")).toBeInTheDocument();
    expect(screen.getByText("expected revenue: $0")).toBeInTheDocument();
    expect(
      screen.getByText("expected total capacity of the unreserved offices: 0")
    ).toBeInTheDocument();
  });
});
