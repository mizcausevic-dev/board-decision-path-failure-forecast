import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.js";

describe("board-decision-path-failure-forecast app", () => {
  const app = createApp();

  it("serves the overview route", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.text).toContain("Board Decision Path Failure Forecast");
  });

  it("serves the failure radar route", async () => {
    const response = await request(app).get("/failure-radar");
    expect(response.status).toBe(200);
  });

  it("serves the breakpoint map route", async () => {
    const response = await request(app).get("/breakpoint-map");
    expect(response.status).toBe(200);
  });

  it("serves the prevention posture route", async () => {
    const response = await request(app).get("/prevention-posture");
    expect(response.status).toBe(200);
  });

  it("serves the verification route", async () => {
    const response = await request(app).get("/verification");
    expect(response.status).toBe(200);
  });

  it("serves the docs route", async () => {
    const response = await request(app).get("/docs");
    expect(response.status).toBe(200);
  });

  it("serves the payload API", async () => {
    const response = await request(app).get("/api/payload");
    expect(response.status).toBe(200);
    expect(response.body.report.summary.items).toBeGreaterThan(0);
  });

  it("serves the failure radar API", async () => {
    const response = await request(app).get("/api/failure-radar");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("serves the breakpoint map API", async () => {
    const response = await request(app).get("/api/breakpoint-map");
    expect(response.status).toBe(200);
    expect(response.body.length).toBeGreaterThan(0);
  });
});
