import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "./Home";

test("renders the Latest Posts heading", () => {
  render(
    <BrowserRouter>
      <Home />
    </BrowserRouter>
  );
  const heading = screen.getByText(/Latest Posts/i);
  expect(heading).toBeInTheDocument();
});