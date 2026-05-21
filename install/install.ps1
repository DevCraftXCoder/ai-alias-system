# ai-alias-system installer — PowerShell (Windows)
# Usage: irm https://raw.githubusercontent.com/DevCraftXCoder/ai-alias-system/main/install/install.ps1 | iex
# Or: .\install.ps1 [-claude] [-codex] [-gemini]

param(
    [switch]$claude,
    [switch]$codex,
    [switch]$gemini
)

$Repo = "https://github.com/DevCraftXCoder/ai-alias-system"
$Pkg  = "ai-alias-system"

function Write-Info  { param($msg) Write-Host "[aias] $msg" -ForegroundColor Green }
function Write-Warn  { param($msg) Write-Host "[warn] $msg" -ForegroundColor Yellow }
function Write-Err   { param($msg) Write-Host "[error] $msg" -ForegroundColor Red; exit 1 }

# Detect package manager
$pm = $null
if (Get-Command pnpm -ErrorAction SilentlyContinue) {
    $pm = "pnpm dlx"
    Write-Info "Using pnpm"
} elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    $pm = "npx"
    Write-Warn "pnpm not found — using npx. pnpm recommended: https://pnpm.io/installation"
} else {
    Write-Err "Neither pnpm nor npx found. Install Node.js 18+ from https://nodejs.org"
}

# Run install
if ($claude) {
    Write-Info "Installing for Claude Code..."
    Invoke-Expression "$pm $Pkg install claude"
} elseif ($codex) {
    Write-Info "Installing for OpenAI Codex CLI..."
    Invoke-Expression "$pm $Pkg install codex"
} elseif ($gemini) {
    Write-Info "Installing for Google Gemini CLI..."
    Invoke-Expression "$pm $Pkg install gemini"
} else {
    Write-Info "Installing alias system for all AI tools..."
    Invoke-Expression "$pm $Pkg install"
}

Write-Host ""
Write-Info "Done! Edit the alias tables with your project entities."
Write-Info "Docs: $Repo"
