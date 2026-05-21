#!/usr/bin/env node
'use strict';

const path = require('path');
const fs = require('fs');
const { findProjectRoot, detectInstalledTools } = require('../src/utils');
const {
  installClaude,
  installCodex,
  installGemini,
  installAll,
  getStatus,
  validateAliases,
} = require('../src/installer');
const { runWizard } = require('../src/prompts');

const args = process.argv.slice(2);
const command = args[0] || 'help';
const subcommand = args.find(a => !a.startsWith('--') && a !== command);
const force = args.includes('--force');

const projectRoot = findProjectRoot();

function printResults(results) {
  if (Array.isArray(results)) {
    for (const r of results) {
      console.log(`  ${r.action.padEnd(50)} ${path.relative(projectRoot, r.file)}`);
    }
  } else {
    for (const [tool, toolResults] of Object.entries(results)) {
      console.log(`\n  [${tool}]`);
      for (const r of toolResults) {
        console.log(`    ${r.action.padEnd(48)} ${path.relative(projectRoot, r.file)}`);
      }
    }
  }
}

async function main() {
  switch (command) {
    case 'init': {
      const { runWizard } = require('../src/prompts');
      const content = await runWizard();
      const rulesDir = path.join(projectRoot, '.claude', 'rules');
      if (!fs.existsSync(rulesDir)) fs.mkdirSync(rulesDir, { recursive: true });
      const outPath = path.join(rulesDir, 'project-aliases.md');
      fs.writeFileSync(outPath, content, 'utf8');
      console.log(`\nCreated: ${path.relative(projectRoot, outPath)}`);
      console.log('\nNext steps:');
      console.log('  pnpm dlx ai-alias-system install');
      break;
    }

    case 'install': {
      const target = subcommand;
      console.log(`\nInstalling alias system${target ? ` for ${target}` : ' for all tools'}...\n`);

      let results;
      if (target === 'claude') {
        results = installClaude(projectRoot, { verbose: true, force });
      } else if (target === 'codex') {
        results = installCodex(projectRoot, { verbose: true, force });
      } else if (target === 'gemini') {
        results = installGemini(projectRoot, { verbose: true, force });
      } else if (!target) {
        results = installAll(projectRoot, { verbose: true, force });
      } else {
        console.error(`Unknown tool: ${target}. Use claude, codex, or gemini.`);
        process.exit(1);
      }

      printResults(results);
      console.log('\nDone. Edit the alias tables with your actual project entities.');
      console.log('Run `pnpm dlx ai-alias-system validate` to check for undefined aliases.');
      break;
    }

    case 'status': {
      const statuses = getStatus(projectRoot);
      console.log('\nAlias system status:\n');
      for (const s of statuses) {
        const indicator = s.installed ? '✓' : '✗';
        console.log(`  ${indicator} ${s.tool.padEnd(8)} ${s.details}`);
      }
      console.log('');
      break;
    }

    case 'validate': {
      console.log('\nValidating alias usage...\n');
      const { defined, undefined: undef } = validateAliases(projectRoot);
      console.log(`  Defined aliases: ${defined.length}`);
      if (undef.length === 0) {
        console.log('  Undefined aliases: none\n  All clear.');
      } else {
        console.log(`  Undefined aliases: ${undef.length}`);
        for (const [alias, files] of undef) {
          console.log(`    ${alias} — used in: ${files.slice(0, 3).join(', ')}`);
        }
        process.exit(1);
      }
      console.log('');
      break;
    }

    case 'update': {
      console.log('\nRe-syncing alias configs (use --force to overwrite existing alias tables)...\n');
      const results = installAll(projectRoot, { verbose: true, force });
      printResults(results);
      console.log('\nSync complete.');
      break;
    }

    case 'help':
    default: {
      console.log(`
ai-alias-system — Symbol shorthand for AI coding assistants

Usage:
  pnpm dlx ai-alias-system <command> [options]
  aias <command> [options]           (if installed globally)

Commands:
  init                    Interactive wizard — create project-aliases.md
  install                 Install alias section into all detected AI tools
  install claude          Claude Code only
  install codex           OpenAI Codex CLI only (writes AGENTS.md)
  install gemini          Google Gemini CLI only (writes GEMINI.md)
  install [--force]       Overwrite existing alias blocks (preserves by default)
  status                  Show what alias configs are installed and where
  validate                Check that all used aliases are defined
  update [--force]        Re-sync installed files (--force overwrites existing tables)
  help                    Show this help

Examples:
  pnpm dlx ai-alias-system init
  pnpm dlx ai-alias-system install
  pnpm dlx ai-alias-system install claude
  pnpm dlx ai-alias-system install --force
  pnpm dlx ai-alias-system status

Docs: https://github.com/DevCraftXCoder/ai-alias-system
`);
    }
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
