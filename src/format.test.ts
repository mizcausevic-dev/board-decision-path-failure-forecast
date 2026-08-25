import { describe, expect, it } from "vitest";
import { formatSummary } from "./format.js";

describe("formatSummary", () => {
  it("renders the failure summary lines", () => {
    const output = formatSummary({
      items: 6,
      constrainedLanes: 4,
      forecastPriorityLanes: 4,
      averageBoardConfidence: 60.5,
      valueAtStakeMillions: 141,
      leadingMessage: "Decision-path failure risk needs containment."
    });

    expect(output).toContain("Board Decision Path Failure Forecast");
    expect(output).toContain("Forecast-priority lanes: 4");
    expect(output).toContain("Decision-path failure risk needs containment.");
  });
});
