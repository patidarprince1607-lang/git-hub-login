import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { Route } from "@/routes/index";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

function renderDemo() {
  const Page = Route.options.component;
  if (!Page) throw new Error("Missing demo page");
  render(<Page />);
}

describe("Educational demo credential safeguards", () => {
  it("does not transmit credentials when the simulation is submitted", () => {
    const fetchSpy = vi.spyOn(globalThis, "fetch");
    renderDemo();
    fireEvent.change(screen.getByLabelText(/demo username/i), { target: { value: "attacker_test" } });
    fireEvent.change(screen.getByLabelText(/demo password/i), { target: { value: "hunter2" } });
    fireEvent.click(screen.getByRole("button", { name: /^Sign in$/ }));
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("does not store credentials when the simulation is submitted", () => {
    const storageSpy = vi.spyOn(Storage.prototype, "setItem");
    renderDemo();
    fireEvent.click(screen.getByRole("button", { name: /^Sign in$/ }));
    expect(storageSpy).not.toHaveBeenCalled();
  });

  it("does not log credentials when the simulation is submitted", () => {
    const logSpy = vi.spyOn(console, "log");
    const infoSpy = vi.spyOn(console, "info");
    const warnSpy = vi.spyOn(console, "warn");
    const errorSpy = vi.spyOn(console, "error");
    renderDemo();
    fireEvent.click(screen.getByRole("button", { name: /^Sign in$/ }));
    expect(logSpy).not.toHaveBeenCalled();
    expect(infoSpy).not.toHaveBeenCalled();
    expect(warnSpy).not.toHaveBeenCalled();
    expect(errorSpy).not.toHaveBeenCalled();
  });
});