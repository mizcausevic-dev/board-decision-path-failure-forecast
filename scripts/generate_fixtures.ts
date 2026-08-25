import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { sampleBoardDecisionPathFailureForecast } from "../src/data/sampleVerticalBrief.js";

const fixturesDir = path.resolve("fixtures");
mkdirSync(fixturesDir, { recursive: true });

rmSync(path.join(fixturesDir, "board-decision-path-failure-forecast.json"), { force: true });
rmSync(path.join(fixturesDir, "board-decision-path-failure-forecast-clean.json"), { force: true });

writeFileSync(
  path.join(fixturesDir, "board-decision-path-failure-forecast.json"),
  JSON.stringify(sampleBoardDecisionPathFailureForecast, null, 2)
);

writeFileSync(
  path.join(fixturesDir, "board-decision-path-failure-forecast-clean.json"),
  JSON.stringify(sampleBoardDecisionPathFailureForecast.map(({ narrative: _narrative, currentPosture: _currentPosture, ...item }) => item), null, 2)
);
