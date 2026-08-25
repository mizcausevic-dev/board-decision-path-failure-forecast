import { describe, expect, it } from "vitest";
import {
  renderBreakpointMap,
  renderDocs,
  renderFailureForecastOverview,
  renderFailureRadar,
  renderPreventionPosture,
  renderVerification
} from "./render.js";

describe("render", () => {
  it("includes the product title in the overview", () => {
    expect(renderFailureForecastOverview()).toContain("Board Decision Path Failure Forecast");
  });

  it("renders the failure radar route", () => {
    expect(renderFailureRadar()).toContain("/failure-radar");
  });

  it("renders the breakpoint map route", () => {
    expect(renderBreakpointMap()).toContain("/breakpoint-map");
  });

  it("renders the prevention posture route", () => {
    expect(renderPreventionPosture()).toContain("Composite failure risk");
  });

  it("renders verification notes", () => {
    expect(renderVerification()).toContain("Synthetic decision-path-failure data only");
  });

  it("renders docs payload guidance", () => {
    expect(renderDocs()).toContain("/api/payload");
  });
});
