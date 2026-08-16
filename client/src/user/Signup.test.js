import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Signup from "./Signup";

test("renders Sign Up form fields", () => {
  render(
    <BrowserRouter>
      <Signup />
    </BrowserRouter>
  );
  expect(screen.getByText(/Sign Up/i)).toBeInTheDocument();
  expect(screen.getByText(/Name/i)).toBeInTheDocument();
  expect(screen.getByText(/Email/i)).toBeInTheDocument();
});