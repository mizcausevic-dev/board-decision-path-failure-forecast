$ErrorActionPreference = "Stop"

$root = Split-Path -Parent $PSScriptRoot
$screenshots = Join-Path $root "screenshots"
New-Item -ItemType Directory -Force -Path $screenshots | Out-Null
Get-ChildItem -Path $screenshots -File -ErrorAction SilentlyContinue | Remove-Item -Force

Add-Type -AssemblyName System.Drawing

function New-ScenarioImage {
  param(
    [string]$Title,
    [string]$Subtitle,
    [string[]]$Bullets,
    [string]$OutputPath
  )

  $width = 1600
  $height = 900
  $bmp = New-Object System.Drawing.Bitmap($width, $height)
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = "AntiAlias"
  $bg = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(7, 10, 15))
  $panelPen = New-Object System.Drawing.Pen ([System.Drawing.Color]::FromArgb(60, 120, 255, 170), 2)
  $textBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(233, 243, 255))
  $mutedBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(186, 200, 218))
  $accentBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(55, 255, 139))
  $dotBrush = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::FromArgb(25, 199, 255))
  $fontTitle = New-Object System.Drawing.Font("Georgia", 30, [System.Drawing.FontStyle]::Bold)
  $fontSub = New-Object System.Drawing.Font("Segoe UI", 16)
  $fontBody = New-Object System.Drawing.Font("Segoe UI", 14)

  $g.FillRectangle($bg, 0, 0, $width, $height)
  $rect = New-Object System.Drawing.Rectangle(40, 40, 1520, 820)
  $g.DrawRectangle($panelPen, $rect)
  $g.DrawString("Board Decision Path Failure Forecast", $fontSub, $accentBrush, 70, 85)
  $g.DrawString($Title, $fontTitle, $textBrush, 70, 135)
  $subtitleRect = New-Object System.Drawing.RectangleF(70, 220, 1400, 80)
  $g.DrawString($Subtitle, $fontSub, $mutedBrush, $subtitleRect)

  $y = 320
  foreach ($bullet in $Bullets) {
    $g.FillEllipse($dotBrush, 85, $y + 8, 10, 10)
    $bulletRect = New-Object System.Drawing.RectangleF(110, $y, 1320, 48)
    $g.DrawString($bullet, $fontBody, $textBrush, $bulletRect)
    $y += 72
  }

  $g.DrawString("Synthetic scenario render for README packaging.", $fontSub, $mutedBrush, 70, 800)
  $bmp.Save($OutputPath, [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose()
  $bmp.Dispose()
}

New-ScenarioImage -Title "Board-ready overview for decision-path failure risk" -Subtitle "One executive scorecard for fragile handoffs, thin recovery, weak surge tolerance, and confidence loss." -Bullets @(
  "The overview keeps constrained lanes, prevention priorities, and value at stake visible in one board-safe surface.",
  "Leadership can see which decision paths will break first and which ones need buffering or redundancy before another cycle.",
  "This layer turns scattered fragility into one repeatable failure-forecast packet instead of another manual memo."
) -OutputPath (Join-Path $screenshots "01-overview-proof.png")

New-ScenarioImage -Title "Failure radar keeps owner, audience, fragility theme, and next move connected" -Subtitle "Every route retains the owner, audience, action, failure theme, handoff counts, failure proximity, and board confidence." -Bullets @(
  "The failure-radar view makes it obvious which systems will absorb another board cycle and which ones still depend on a path that will snap under pressure.",
  "Board questions stay attached to actual path weakness instead of vague operating language.",
  "Leadership can reinforce one lane at a time without losing sight of the portfolio story."
) -OutputPath (Join-Path $screenshots "02-failure-radar-proof.png")

New-ScenarioImage -Title "Breakpoint map shows where the next board cycle will expose a weak path" -Subtitle "Forecast headlines, failure signals, escalation gaps, and required preventive moves stay visible in one board readout." -Bullets @(
  "This view keeps AI, identity, revenue, procurement, FinTech, and biotech lanes tied to the exact failure point that would break the next board-facing packet.",
  "Thin recovery and weak surge tolerance stay visible before the board assumes the path can absorb more scope.",
  "Leadership can see exactly where one hardening move or redundant route would buy another clean cycle."
) -OutputPath (Join-Path $screenshots "03-breakpoint-map-proof.png")

New-ScenarioImage -Title "Prevention posture keeps action, severity, and failure exposure tied together" -Subtitle "Composite failure risk, severity signals, and board-safe action stay grounded in the same operating view." -Bullets @(
  "The prevention-posture view keeps handoff strain, failure proximity, escalation fragility, recovery weakness, and board-confidence loss in one scorecard.",
  "Weak tolerance remains visible before leadership assumes the path can absorb another burst of load.",
  "This creates a repeatable packet that can travel into board, diligence, and operating reviews."
) -OutputPath (Join-Path $screenshots "04-prevention-posture-proof.png")
