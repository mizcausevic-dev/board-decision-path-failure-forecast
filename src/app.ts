import express from "express";
import { breakpointMap, failureRadar, payload, preventionPosture, riskMap, summary, verification } from "./services/verticalBriefService.js";
import {
  renderBreakpointMap,
  renderDocs,
  renderFailureForecastOverview,
  renderFailureRadar,
  renderPreventionPosture,
  renderVerification
} from "./services/render.js";

export function createApp() {
  const app = express();

  app.get("/", (_req, res) => res.type("html").send(renderFailureForecastOverview()));
  app.get("/failure-radar", (_req, res) => res.type("html").send(renderFailureRadar()));
  app.get("/breakpoint-map", (_req, res) => res.type("html").send(renderBreakpointMap()));
  app.get("/prevention-posture", (_req, res) => res.type("html").send(renderPreventionPosture()));
  app.get("/verification", (_req, res) => res.type("html").send(renderVerification()));
  app.get("/docs", (_req, res) => res.type("html").send(renderDocs()));

  app.get("/api/dashboard/summary", (_req, res) => res.json(summary()));
  app.get("/api/failure-radar", (_req, res) => res.json(failureRadar()));
  app.get("/api/breakpoint-map", (_req, res) => res.json(breakpointMap()));
  app.get("/api/prevention-posture", (_req, res) => res.json(preventionPosture()));
  app.get("/api/risk-map", (_req, res) => res.json(riskMap()));
  app.get("/api/verification", (_req, res) => res.json(verification()));
  app.get("/api/sample", (_req, res) => res.json(payload().sample));
  app.get("/api/payload", (_req, res) => res.json(payload()));

  return app;
}

/* c8 ignore next 5 */
if (process.argv[1] && import.meta.url === new URL(`file://${process.argv[1].replace(/\\/g, "/")}`).href) {
  const port = Number(process.env.PORT ?? 4318);
  createApp().listen(port, () => {
    console.log(`board-decision-path-failure-forecast listening on http://127.0.0.1:${port}`);
  });
}
