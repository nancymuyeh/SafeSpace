import { render, screen } from "@testing-library/react";
import { Navigation } from "./Navigation";

jest.mock("@/lib/keycloak", () => ({
  authenticated: false,
}));

describe("Navigation", () => {
  it("renders the navigation links", () => {
    render(<Navigation />);
    expect(screen.getByText("SafeSpace")).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Community")).toBeInTheDocument();
    expect(screen.getByText("Get Help")).toBeInTheDocument();
  });
});
