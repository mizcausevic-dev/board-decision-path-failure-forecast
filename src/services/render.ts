import { breakpointMap, failureRadar, payload, preventionPosture, riskMap, summary, verification } from "./verticalBriefService.js";

const productTitle = "Board Decision Path Failure Forecast";
const domain = "https://failure.kineticgain.com";

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function shell(title: string, path: string, body: string, description: string) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)} · Kinetic Gain</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <style>
      :root {
        color-scheme: dark;
        --bg: #07111d;
        --panel: #0d1a2b;
        --border: rgba(103, 224, 190, 0.22);
        --text: #edf2ff;
        --muted: #9fb0cf;
        --accent: #67e0be;
        --accent-2: #7dc4ff;
      }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        font-family: "Segoe UI", system-ui, sans-serif;
        background:
          radial-gradient(circle at top left, rgba(125, 196, 255, 0.12), transparent 30%),
          linear-gradient(180deg, #050c16 0%, var(--bg) 100%);
        color: var(--text);
      }
      a { color: var(--accent-2); text-decoration: none; }
      .wrap { max-width: 1180px; margin: 0 auto; padding: 32px 24px 64px; }
      .hero, .section {
        background: linear-gradient(180deg, rgba(14, 28, 45, 0.95), rgba(10, 19, 33, 0.98));
        border: 1px solid var(--border);
        border-radius: 28px;
        padding: 28px;
        box-shadow: 0 18px 60px rgba(2, 7, 16, 0.35);
      }
      .hero { margin-bottom: 24px; }
      .eyebrow {
        display: inline-block;
        padding: 10px 16px;
        border-radius: 999px;
        border: 1px solid var(--border);
        background: rgba(103, 224, 190, 0.08);
        color: var(--accent);
        font-size: 12px;
        text-transform: uppercase;
        letter-spacing: 0.28em;
      }
      h1, h2 { margin: 18px 0 12px; font-family: Georgia, serif; line-height: 0.95; }
      h1 { font-size: clamp(56px, 8vw, 92px); max-width: 980px; }
      h2 { font-size: clamp(36px, 4vw, 54px); }
      .lede { color: var(--muted); font-size: 20px; line-height: 1.6; max-width: 920px; }
      .nav { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 22px; }
      .nav a {
        padding: 10px 14px;
        border: 1px solid rgba(125, 196, 255, 0.18);
        border-radius: 999px;
        color: var(--muted);
      }
      .nav a.active { color: var(--text); border-color: var(--accent); background: rgba(103, 224, 190, 0.08); }
      .metrics, .grid { display: grid; gap: 18px; }
      .metrics { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); margin-top: 26px; }
      .metric, .card, .table-wrap {
        background: rgba(16, 32, 50, 0.76);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 22px;
        padding: 18px;
      }
      .metric-label, .chip { color: var(--accent); text-transform: uppercase; letter-spacing: 0.18em; font-size: 12px; }
      .metric-value { display: block; font-size: 40px; font-weight: 700; margin-top: 10px; }
      .metric-copy { margin-top: 10px; color: var(--muted); line-height: 1.5; }
      .section { margin-top: 24px; }
      .grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); }
      .card h3 { margin: 12px 0 10px; font-size: 30px; line-height: 1.05; }
      .card p, li { color: var(--muted); line-height: 1.6; }
      .table-wrap { overflow-x: auto; }
      table { width: 100%; border-collapse: collapse; }
      th, td { text-align: left; padding: 12px; border-bottom: 1px solid rgba(125, 196, 255, 0.12); vertical-align: top; }
      th { color: var(--accent); font-size: 12px; text-transform: uppercase; letter-spacing: 0.18em; }
      ul { padding-left: 20px; }
      pre {
        white-space: pre-wrap;
        overflow-wrap: anywhere;
        color: var(--muted);
        background: rgba(7, 17, 29, 0.75);
        border: 1px solid rgba(125, 196, 255, 0.12);
        border-radius: 18px;
        padding: 18px;
      }
      .footer {
        margin-top: 24px;
        color: var(--muted);
        font-size: 14px;
        display: flex;
        gap: 18px;
        flex-wrap: wrap;
      }
    </style>
  </head>
  <body>
    <div class="wrap">
      ${body}
      <div class="footer">
        <span>${productTitle}</span>
        <a href="${domain}">${domain.replace("https://", "")}</a>
        <a href="https://github.com/mizcausevic-dev/">GitHub</a>
        <a href="https://www.linkedin.com/in/mirzacausevic/">LinkedIn</a>
        <a href="https://kineticgain.com/">Kinetic Gain</a>
      </div>
    </div>
  </body>
</html>`;
}

function navLinks(path: string) {
  return [
    ["/", "Overview"],
    ["/failure-radar", "Failure radar"],
    ["/breakpoint-map", "Breakpoint map"],
    ["/prevention-posture", "Prevention posture"],
    ["/verification", "Verification"],
    ["/docs", "Docs"]
  ]
    .map(([href, label]) => `<a${href === path ? ' class="active"' : ""} href="${href}">${label}</a>`)
    .join("");
}

export function renderFailureForecastOverview() {
  const executiveSummary = summary();
  const lanes = failureRadar().slice(0, 4);
  const findings = riskMap().slice(0, 5);
  const cards = lanes
    .map(
      (item) => `<article class="card">
        <div class="chip">${escapeHtml(item.action)}</div>
        <h3>${escapeHtml(item.owner)}</h3>
        <p><strong>Audience:</strong> ${escapeHtml(item.audience)}</p>
        <p><strong>Failure theme:</strong> ${escapeHtml(item.failureTheme)}</p>
        <p><strong>Decision handoffs:</strong> ${item.decisionHandoffs} · <strong>Cycles to failure:</strong> ${item.decisionCyclesToFailure}</p>
        <p><strong>Board confidence:</strong> ${item.boardConfidenceScore}</p>
        <p>${escapeHtml(item.nextMove)}</p>
      </article>`
    )
    .join("");

  const risks = findings
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.lane)}</strong> · risk ${item.compositeFailureRiskScore} · confidence ${item.boardConfidenceScore} · $${item.valueAtStakeMillions}M at stake</li>`
    )
    .join("");

  return shell(
    productTitle,
    "/",
    `<section class="hero">
      <span class="eyebrow">Failure forecast</span>
      <h1>Which decision paths will fail first, where will the next cycle stall, and what should the board reinforce before the breakage compounds?</h1>
      <p class="lede">Board Decision Path Failure Forecast turns fragile handoffs, thin recovery, weak surge tolerance, and shrinking board confidence into one executive packet for prevention before another cycle compounds the damage.</p>
      <div class="nav">${navLinks("/")}</div>
      <div class="metrics">
        <div class="metric"><span class="metric-label">Forecast lanes</span><span class="metric-value">${executiveSummary.items}</span><div class="metric-copy">Modeled decision paths in the current board-facing estate.</div></div>
        <div class="metric"><span class="metric-label">Constrained lanes</span><span class="metric-value">${executiveSummary.constrainedLanes}</span><div class="metric-copy">Paths already showing high breakage risk, weak recovery, or low tolerance.</div></div>
        <div class="metric"><span class="metric-label">Priority lanes</span><span class="metric-value">${executiveSummary.forecastPriorityLanes}</span><div class="metric-copy">Paths that justify stabilization or redundancy before more load arrives.</div></div>
        <div class="metric"><span class="metric-label">Value at stake</span><span class="metric-value">$${executiveSummary.valueAtStakeMillions}M</span><div class="metric-copy">Modeled exposure tied to fragile board-facing decision paths.</div></div>
      </div>
    </section>
    <section class="section">
      <h2>Failure radar</h2>
      <p class="lede">${escapeHtml(executiveSummary.boardMessage)}</p>
      <div class="grid">${cards}</div>
    </section>
    <section class="section">
      <h2>Board-visible breakage pressure</h2>
      <ul>${risks}</ul>
    </section>`,
    "Board-ready failure forecast for exposing fragile decision paths, likely breakpoints, and what boards should reinforce first."
  );
}

export function renderFailureRadar() {
  const rows = failureRadar()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.owner)}</td>
        <td>${escapeHtml(item.audience)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${escapeHtml(item.failureTheme)}</td>
        <td>${item.decisionHandoffs}</td>
        <td>${item.decisionCyclesToFailure}</td>
        <td>${item.boardConfidenceScore}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Failure radar",
    "/failure-radar",
    `<section class="hero">
      <span class="eyebrow">Failure radar</span>
      <h1>Each lane keeps one owner, one audience, one failure theme, and one next preventive move attached.</h1>
      <p class="lede">The failure-radar view keeps decision-path breakage readable instead of hiding it inside more committee motion.</p>
      <div class="nav">${navLinks("/failure-radar")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Owner</th><th>Audience</th><th>Action</th><th>Failure theme</th><th>Handoffs</th><th>Cycles to failure</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Failure-radar view showing owners, actions, breakage pressure, and board-confidence strength."
  );
}

export function renderBreakpointMap() {
  const rows = breakpointMap()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.forecastHeadline)}</td>
        <td>${escapeHtml(item.failureSignal)}</td>
        <td>${escapeHtml(item.nextFailurePoint)}</td>
        <td>${item.decisionCyclesToFailure}</td>
        <td>${item.escalationGaps}</td>
        <td>${escapeHtml(item.preventiveMoves.join(", "))}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Breakpoint map",
    "/breakpoint-map",
    `<section class="hero">
      <span class="eyebrow">Breakpoint map</span>
      <h1>Failure points, escalation load, and preventive moves stay visible in one scorecard instead of scattering across review notes.</h1>
      <p class="lede">This view compares forecast headlines, breakage signals, and the exact preventive moves needed to keep the next board packet from landing on a broken path.</p>
      <div class="nav">${navLinks("/breakpoint-map")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Headline</th><th>Failure signal</th><th>Next failure point</th><th>Cycles to failure</th><th>Escalation gaps</th><th>Preventive moves</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Breakpoint-map view showing fragility signals, next failure points, and preventive moves before another board cycle."
  );
}

export function renderPreventionPosture() {
  const rows = preventionPosture()
    .map(
      (item) => `<tr>
        <td>${escapeHtml(item.lane)}</td>
        <td>${escapeHtml(item.action)}</td>
        <td>${item.compositeFailureRiskScore}</td>
        <td>${escapeHtml(item.handoffs.severity)}</td>
        <td>${escapeHtml(item.failureCycles.severity)}</td>
        <td>${escapeHtml(item.escalationGaps.severity)}</td>
        <td>${escapeHtml(item.recovery.severity)}</td>
        <td>${escapeHtml(item.tolerance.severity)}</td>
        <td>${escapeHtml(item.boardConfidence.severity)}</td>
      </tr>`
    )
    .join("");

  return shell(
    "Prevention posture",
    "/prevention-posture",
    `<section class="hero">
      <span class="eyebrow">Prevention posture</span>
      <h1>Composite failure risk stays tied to the exact weakness making another board cycle unsafe.</h1>
      <p class="lede">This prevention view keeps handoff strain, failure proximity, escalation gaps, recovery weakness, surge tolerance, and board confidence in one board-readable posture instead of separate operating stories.</p>
      <div class="nav">${navLinks("/prevention-posture")}</div>
    </section>
    <section class="section table-wrap">
      <table>
        <thead><tr><th>Lane</th><th>Action</th><th>Risk</th><th>Handoffs</th><th>Failure cycles</th><th>Escalation gaps</th><th>Recovery</th><th>Tolerance</th><th>Board confidence</th></tr></thead>
        <tbody>${rows}</tbody>
      </table>
    </section>`,
    "Prevention posture view for failure risk, recovery weakness, surge tolerance, and board-confidence severity."
  );
}

export function renderVerification() {
  const notes = verification().map((item) => `<li>${escapeHtml(item)}</li>`).join("");

  return shell(
    "Verification",
    "/verification",
    `<section class="hero">
      <span class="eyebrow">Verification</span>
      <h1>How this failure packet is modeled and what it is safe to infer from it.</h1>
      <p class="lede">The verification layer keeps synthetic assumptions and safe-use boundaries visible before anyone mistakes the sample for a live board decision path forecast.</p>
      <div class="nav">${navLinks("/verification")}</div>
    </section>
    <section class="section">
      <ul>${notes}</ul>
      <pre>${escapeHtml(JSON.stringify(payload().report.summary, null, 2))}</pre>
    </section>`,
    "Verification notes for the Board Decision Path Failure Forecast sample and modeled outputs."
  );
}

export function renderDocs() {
  return shell(
    "Docs",
    "/docs",
    `<section class="hero">
      <span class="eyebrow">Docs</span>
      <h1>Board Decision Path Failure Forecast docs</h1>
      <p class="lede">This surface packages board-readable failure signals into reproducible routes and JSON outputs.</p>
      <div class="nav">${navLinks("/docs")}</div>
    </section>
    <section class="section">
      <ul>
        <li><code>/failure-radar</code> keeps owner, audience, action, and breakage pressure attached.</li>
        <li><code>/breakpoint-map</code> compares forecast headlines, failure points, and preventive moves.</li>
        <li><code>/prevention-posture</code> scores handoffs, failure proximity, escalation gaps, recovery, tolerance, and board-confidence strain.</li>
        <li><code>/api/payload</code> exposes the reproducible failure-forecast packet.</li>
      </ul>
    </section>`,
    "Product documentation for Board Decision Path Failure Forecast and its board-ready routes."
  );
}
