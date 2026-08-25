import { analyze } from "../analyze.js";
import { sampleBoardDecisionPathFailureForecast } from "../data/sampleVerticalBrief.js";

const report = analyze(sampleBoardDecisionPathFailureForecast, { now: "2026-06-01T00:00:00Z" });

export function summary() {
  return {
    ...report.summary,
    generatedAt: report.generatedAt,
    boardMessage:
      "Stabilize the AI and procurement paths first, add redundancy in revenue and biotech second, reduce identity friction third, and buffer the FinTech lane before more board-facing load arrives."
  };
}

export function failureRadar() {
  return sampleBoardDecisionPathFailureForecast.map((item) => ({
    lane: item.lane,
    action: item.action,
    owner: item.owner,
    audience: item.audience,
    failureTheme: item.failureTheme,
    boardConfidenceScore: item.boardConfidenceScore,
    nextMove: item.nextMove,
    decisionHandoffs: item.decisionHandoffs,
    decisionCyclesToFailure: item.decisionCyclesToFailure
  }));
}

export function breakpointMap() {
  return sampleBoardDecisionPathFailureForecast.map((item) => ({
    lane: item.lane,
    forecastHeadline: item.forecastHeadline,
    failureSignal: item.failureSignal,
    nextFailurePoint: item.nextFailurePoint,
    preventiveMoves: item.preventiveMoves,
    decisionCyclesToFailure: item.decisionCyclesToFailure,
    escalationGaps: item.escalationGaps
  }));
}

export function preventionPosture() {
  return report.items.map((item) => ({
    lane: item.lane,
    action: item.action,
    compositeFailureRiskScore: item.compositeFailureRiskScore,
    handoffs: item.handoffAssessment,
    failureCycles: item.cycleAssessment,
    escalationGaps: item.escalationAssessment,
    recovery: item.recoveryAssessment,
    tolerance: item.toleranceAssessment,
    boardConfidence: item.confidenceAssessment
  }));
}

export function riskMap() {
  return report.items.map((item) => ({
    lane: item.lane,
    track: item.track,
    valueAtStakeMillions: item.valueAtStakeMillions,
    compositeFailureRiskScore: item.compositeFailureRiskScore,
    boardConfidenceScore: item.boardConfidenceScore,
    companyTags: item.companyTags
  }));
}

export function verification() {
  return [
    "Synthetic decision-path-failure data only - no live board packets, actual committee routes, or real operational escalations are included.",
    "Scores are modeled to show how Kinetic Gain can turn likely breakpoints, weak recovery, and thin surge tolerance into board-readable prevention decisions.",
    "All routes are read-only and demonstrate board-facing failure forecasting, not production workflow automation."
  ];
}

export function payload() {
  return {
    report,
    failureRadar: failureRadar(),
    breakpointMap: breakpointMap(),
    preventionPosture: preventionPosture(),
    riskMap: riskMap(),
    verification: verification(),
    sample: sampleBoardDecisionPathFailureForecast
  };
}
