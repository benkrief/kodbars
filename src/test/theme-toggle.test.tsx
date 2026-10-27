import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "@/components/theme-toggle";

afterEach(() => {
  cleanup();
  document.documentElement.classList.remove("dark");
  localStorage.clear();
  vi.restoreAllMocks();
});

describe("Theme toggle", () => {
  it("switches both ways and remembers the selection", () => {
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Activer le mode sombre" }));
    expect(document.documentElement).toHaveClass("dark");
    expect(localStorage.getItem("kodbars-theme")).toBe("dark");
    fireEvent.click(screen.getByRole("button", { name: "Activer le mode clair" }));
    expect(document.documentElement).not.toHaveClass("dark");
    expect(localStorage.getItem("kodbars-theme")).toBe("light");
  });
  it("reflects the theme already applied before hydration", () => {
    document.documentElement.classList.add("dark");
    render(<ThemeToggle />);
    expect(screen.getByRole("button", { name: "Activer le mode clair" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
  it("keeps working if browser storage is blocked", () => {
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("Blocked");
    });
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: "Activer le mode sombre" }));
    expect(document.documentElement).toHaveClass("dark");
  });
});
