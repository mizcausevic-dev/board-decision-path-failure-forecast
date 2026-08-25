import { describe, expect, it } from "vitest";
import { breakpointMap, failureRadar, payload, preventionPosture, summary, verification } from "./verticalBriefService.js";

describe("verticalBriefService", () => {
  it("returns the failure forecast summary", () => {
    expect(summary().items).toBeGreaterThan(0);
  });

  it("returns the failure radar view", () => {
    expect(failureRadar().length).toBeGreaterThan(0);
  });

  it("returns the breakpoint map view", () => {
    expect(breakpointMap().length).toBeGreaterThan(0);
  });

  it("returns the prevention posture view", () => {
    expect(preventionPosture().length).toBeGreaterThan(0);
  });

  it("returns verification notes", () => {
    expect(verification().length).toBeGreaterThan(0);
  });

  it("returns the payload", () => {
    expect(payload().report.summary.items).toBeGreaterThan(0);
  });
});
