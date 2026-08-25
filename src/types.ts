export type FailureForecastTrack =
  | "AI_GOVERNANCE"
  | "IDENTITY"
  | "REVENUE_SYSTEMS"
  | "FINTECH"
  | "PROCUREMENT"
  | "BIOTECH";

export type FailureForecastAction = "STABILIZE_PATH" | "ADD_REDUNDANCY" | "REDUCE_FRICTION" | "BUFFER_LOAD";

export type FailureForecastSeverity = "LOW" | "MEDIUM" | "HIGH";

export interface BoardDecisionPathFailureForecastItem {
  id: string;
  lane: string;
  track: FailureForecastTrack;
  action: FailureForecastAction;
  failureTheme: string;
  boardQuestion: string;
  owner: string;
  audience: string;
  currentPosture: string;
  forecastHeadline: string;
  failureSignal: string;
  nextFailurePoint: string;
  preventiveMoves: string[];
  relatedSurfaces: string[];
  companyTags: string[];
  decisionHandoffs: number;
  decisionCyclesToFailure: number;
  escalationGaps: number;
  breakRecoveryScore: number;
  surgeToleranceScore: number;
  boardConfidenceScore: number;
  valueAtStakeMillions: number;
  headline: string;
  narrative: string;
  nextMove: string;
}

export interface FailureForecastAssessment {
  severity: FailureForecastSeverity;
  ok: boolean;
  message: string;
}

export interface BoardDecisionPathFailureForecastReportItem extends BoardDecisionPathFailureForecastItem {
  handoffAssessment: FailureForecastAssessment;
  cycleAssessment: FailureForecastAssessment;
  escalationAssessment: FailureForecastAssessment;
  recoveryAssessment: FailureForecastAssessment;
  toleranceAssessment: FailureForecastAssessment;
  confidenceAssessment: FailureForecastAssessment;
  compositeFailureRiskScore: number;
}

export interface BoardDecisionPathFailureForecastSummary {
  items: number;
  constrainedLanes: number;
  forecastPriorityLanes: number;
  averageBoardConfidence: number;
  valueAtStakeMillions: number;
  leadingMessage: string;
}

export interface BoardDecisionPathFailureForecastExport {
  generatedAt: string;
  summary: BoardDecisionPathFailureForecastSummary;
  items: BoardDecisionPathFailureForecastReportItem[];
}

export interface BoardDecisionPathFailureForecastPayload {
  report: BoardDecisionPathFailureForecastExport;
  failureRadar: ReturnType<typeof import("./services/verticalBriefService.js").failureRadar>;
  breakpointMap: ReturnType<typeof import("./services/verticalBriefService.js").breakpointMap>;
  preventionPosture: ReturnType<typeof import("./services/verticalBriefService.js").preventionPosture>;
  riskMap: ReturnType<typeof import("./services/verticalBriefService.js").riskMap>;
  verification: string[];
  sample: BoardDecisionPathFailureForecastItem[];
}
