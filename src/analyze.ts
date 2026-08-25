import type {
  BoardDecisionPathFailureForecastExport,
  BoardDecisionPathFailureForecastItem,
  BoardDecisionPathFailureForecastReportItem,
  FailureForecastAssessment,
  FailureForecastSeverity
} from "./types.js";

function assessDelay(
  score: number,
  healthy: number,
  pressured: number,
  healthyMessage: string,
  pressureMessage: string,
  highMessage: string
): FailureForecastAssessment {
  let severity: FailureForecastSeverity = "HIGH";
  let ok = false;
  let message = highMessage;

  if (score <= healthy) {
    severity = "LOW";
    ok = true;
    message = healthyMessage;
  } else if (score <= pressured) {
    severity = "MEDIUM";
    message = pressureMessage;
  }

  return { severity, ok, message };
}

function assessStrength(
  score: number,
  strong: number,
  watch: number,
  strongMessage: string,
  watchMessage: string,
  weakMessage: string
): FailureForecastAssessment {
  let severity: FailureForecastSeverity = "HIGH";
  let ok = false;
  let message = weakMessage;

  if (score >= strong) {
    severity = "LOW";
    ok = true;
    message = strongMessage;
  } else if (score >= watch) {
    severity = "MEDIUM";
    message = watchMessage;
  }

  return { severity, ok, message };
}

export function analyze(
  items: BoardDecisionPathFailureForecastItem[],
  options: { now?: string } = {}
): BoardDecisionPathFailureForecastExport {
  const generatedAt = options.now ?? new Date().toISOString();

  const reportItems: BoardDecisionPathFailureForecastReportItem[] = items.map((item) => {
    const handoffAssessment = assessDelay(
      item.decisionHandoffs,
      2,
      4,
      "Decision handoffs remain short enough to keep the failure path contained.",
      "Decision handoffs are stretching and may soon push this path into failure.",
      "Decision handoffs are now too long to trust before the next board cycle."
    );

    const cycleAssessment = assessDelay(
      item.decisionCyclesToFailure,
      1,
      2,
      "The path can absorb another cycle before failure pressure becomes material.",
      "The path is only a cycle or two away from visible breakage.",
      "The path is already too close to failure for another clean cycle."
    );

    const escalationAssessment = assessDelay(
      item.escalationGaps,
      0,
      1,
      "Escalation gaps are low enough to keep the path stable.",
      "Escalation gaps are starting to push this path toward failure.",
      "Escalation gaps are now overwhelming the path."
    );

    const recoveryAssessment = assessStrength(
      item.breakRecoveryScore,
      78,
      62,
      "Recovery strength is high enough to absorb path breakage.",
      "Recovery strength is uneven and may soon expose failure.",
      "Recovery strength is too weak to support another cycle."
    );

    const toleranceAssessment = assessStrength(
      item.surgeToleranceScore,
      78,
      62,
      "Surge tolerance is strong enough to absorb added load.",
      "Surge tolerance is thinning and may soon expose bottlenecks.",
      "Surge tolerance is too weak to support the current load."
    );

    const confidenceAssessment = assessStrength(
      item.boardConfidenceScore,
      78,
      62,
      "Board confidence remains strong enough to trust the path.",
      "Board confidence is becoming dependent on extra explanation.",
      "Board confidence is too thin to trust the path under another cycle."
    );

    const compositeFailureRiskScore =
      Math.round(
        ((item.decisionHandoffs * 10 +
          item.decisionCyclesToFailure * 12 +
          item.escalationGaps * 12 +
          (100 - item.breakRecoveryScore) +
          (100 - item.surgeToleranceScore) +
          (100 - item.boardConfidenceScore)) /
          7) *
          10
      ) / 10;

    return {
      ...item,
      handoffAssessment,
      cycleAssessment,
      escalationAssessment,
      recoveryAssessment,
      toleranceAssessment,
      confidenceAssessment,
      compositeFailureRiskScore
    };
  });

  const constrainedLanes = reportItems.filter(
    (item) =>
      item.handoffAssessment.severity === "HIGH" ||
      item.cycleAssessment.severity === "HIGH" ||
      item.escalationAssessment.severity === "HIGH" ||
      item.recoveryAssessment.severity === "HIGH" ||
      item.toleranceAssessment.severity === "HIGH" ||
      item.confidenceAssessment.severity === "HIGH"
  ).length;

  const forecastPriorityLanes = reportItems.filter(
    (item) => item.action === "STABILIZE_PATH" || item.action === "ADD_REDUNDANCY"
  ).length;

  const averageBoardConfidence =
    reportItems.length === 0
      ? 0
      : Math.round((reportItems.reduce((sum, item) => sum + item.boardConfidenceScore, 0) / reportItems.length) * 10) / 10;

  const valueAtStakeMillions = reportItems.reduce((sum, item) => sum + item.valueAtStakeMillions, 0);

  const leadingMessage =
    constrainedLanes === 0
      ? "Decision-path failure risk remains contained enough to support the current board packet."
      : constrainedLanes <= 2
        ? "A few lanes need preventive reinforcement before the next board cycle compounds breakage."
        : "Decision-path failure risk is now a shared operating constraint and should be contained across multiple board-facing lanes.";

  return {
    generatedAt,
    summary: {
      items: reportItems.length,
      constrainedLanes,
      forecastPriorityLanes,
      averageBoardConfidence,
      valueAtStakeMillions,
      leadingMessage
    },
    items: reportItems
  };
}

export function toExport(items: BoardDecisionPathFailureForecastItem[], options: { now?: string } = {}) {
  return analyze(items, options);
}
