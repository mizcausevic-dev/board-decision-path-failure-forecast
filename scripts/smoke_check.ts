import assert from "node:assert/strict";
import { createServer } from "node:http";
import { AddressInfo } from "node:net";

import { createApp } from "../src/app.js";

async function main() {
  const app = createApp();
  const server = createServer(app);

  await new Promise<void>((resolve) => server.listen(0, "127.0.0.1", () => resolve()));
  const { port } = server.address() as AddressInfo;
  const base = `http://127.0.0.1:${port}`;

  const htmlRoutes = ["/", "/failure-radar", "/breakpoint-map", "/prevention-posture", "/verification", "/docs"];
  const apiRoutes = [
    "/api/dashboard/summary",
    "/api/failure-radar",
    "/api/breakpoint-map",
    "/api/prevention-posture",
    "/api/risk-map",
    "/api/verification",
    "/api/sample",
    "/api/payload"
  ];

  for (const route of htmlRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `Expected ${route} to return 200`);
    const body = await response.text();
    assert.match(body, /Board Decision Path Failure Forecast|Failure radar|Breakpoint map|Prevention posture/);
  }

  for (const route of apiRoutes) {
    const response = await fetch(`${base}${route}`);
    assert.equal(response.status, 200, `Expected ${route} to return 200`);
  }

  server.close();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
