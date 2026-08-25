export function formatSummary(
  summary: {
    items: number;
    constrainedLanes: number;
    forecastPriorityLanes: number;
    averageBoardConfidence: number;
    valueAtStakeMillions: number;
    leadingMessage: string;
  },
  title = "Board Decision Path Failure Forecast"
) {
  return [
    title,
    `Lanes: ${summary.items}`,
    `Constrained lanes: ${summary.constrainedLanes}`,
    `Forecast-priority lanes: ${summary.forecastPriorityLanes}`,
    `Average board confidence: ${summary.averageBoardConfidence}`,
    `Value at stake: $${summary.valueAtStakeMillions}M`,
    `Leading message: ${summary.leadingMessage}`
  ].join("\n");
}
