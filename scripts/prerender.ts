import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import {
  renderBreakpointMap,
  renderDocs,
  renderFailureForecastOverview,
  renderFailureRadar,
  renderPreventionPosture,
  renderVerification
} from "../src/services/render.js";
import { breakpointMap, failureRadar, payload, preventionPosture, riskMap, summary, verification } from "../src/services/verticalBriefService.js";

const root = path.resolve("site");
rmSync(root, { recursive: true, force: true });
mkdirSync(root, { recursive: true });

if (existsSync("CNAME")) {
  writeFileSync(path.join(root, "CNAME"), readFileSync("CNAME", "utf8").trim() + "\n");
}

const htmlRoutes = new Map<string, [string, string]>([
  ["/", ["index.html", renderFailureForecastOverview()]],
  ["/failure-radar", ["failure-radar/index.html", renderFailureRadar()]],
  ["/breakpoint-map", ["breakpoint-map/index.html", renderBreakpointMap()]],
  ["/prevention-posture", ["prevention-posture/index.html", renderPreventionPosture()]],
  ["/verification", ["verification/index.html", renderVerification()]],
  ["/docs", ["docs/index.html", renderDocs()]]
]);

for (const [, [target, html]] of htmlRoutes) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, html);
}

writeFileSync(path.join(root, "robots.txt"), "User-agent: *\nAllow: /\nSitemap: https://failure.kineticgain.com/sitemap.xml\n");
writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>https://failure.kineticgain.com/</loc></url><url><loc>https://failure.kineticgain.com/failure-radar/</loc></url><url><loc>https://failure.kineticgain.com/breakpoint-map/</loc></url><url><loc>https://failure.kineticgain.com/prevention-posture/</loc></url><url><loc>https://failure.kineticgain.com/verification/</loc></url><url><loc>https://failure.kineticgain.com/docs/</loc></url></urlset>`
);

const api = {
  "api/dashboard/summary.json": summary(),
  "api/failure-radar.json": failureRadar(),
  "api/breakpoint-map.json": breakpointMap(),
  "api/prevention-posture.json": preventionPosture(),
  "api/risk-map.json": riskMap(),
  "api/verification.json": verification(),
  "api/sample.json": payload().sample,
  "api/payload.json": payload()
};

for (const [target, data] of Object.entries(api)) {
  const filePath = path.join(root, target);
  mkdirSync(path.dirname(filePath), { recursive: true });
  writeFileSync(filePath, JSON.stringify(data, null, 2));
}
