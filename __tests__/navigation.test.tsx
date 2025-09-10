import { render, screen } from "@testing-library/react";
import Navigation from "@/components/navigation";

test("renders navigation", () => {
  render(<Navigation currentLang="en" onLanguageChange={() => {}} />);
  expect(screen.getByRole("navigation")).toBeInTheDocument();
});
