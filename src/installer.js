'use strict';

const fs = require('fs');
const path = require('path');
const {
  readTemplate,
  mergeAliasBlock,
  ensureDir,
  writeIfDifferent,
} = require('./utils');

const ALIAS_START = '<!-- ALIAS SYSTEM — DO NOT REMOVE THIS BLOCK -->';
const ALIAS_END = '<!-- END ALIAS SYSTEM -->';

function buildAliasBlock(templatePath) {
  return ALIAS_START + '\n' + readTemplate(templatePath) + '\n' + ALIAS_END;
}

function installClaude(projectRoot, { verbose = false } = {}) {
  const results = [];

  // 1. Create .claude/rules/ directory
  const rulesDir = path.join(projectRoot, '.claude', 'rules');
  ensureDir(rulesDir);

  // 2. Write project-aliases.md
  const aliasesTemplate = readTemplate('claude/project-aliases.md');
  const aliasesPath = path.join(rulesDir, 'project-aliases.md');

  if (!fs.existsSync(aliasesPath)) {
    fs.writeFileSync(aliasesPath, aliasesTemplate, 'utf8');
    results.push({ file: aliasesPath, action: 'created' });
  } else {
    results.push({ file: aliasesPath, action: 'skipped (already exists — edit manually)' });
  }

  // 3. Update or create CLAUDE.md
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');
  const importLine = '@rules/project-aliases.md';

  if (fs.existsSync(claudeMdPath)) {
    const existing = fs.readFileSync(claudeMdPath, 'utf8');
    if (!existing.includes(importLine)) {
      const updated = existing.trimEnd() + '\n\n' + importLine + '\n';
      fs.writeFileSync(claudeMdPath, updated, 'utf8');
      results.push({ file: claudeMdPath, action: 'updated (alias import added)' });
    } else {
      results.push({ file: claudeMdPath, action: 'skipped (import already present)' });
    }
  } else {
    const claudeTemplate = readTemplate('claude/CLAUDE.md');
    fs.writeFileSync(claudeMdPath, claudeTemplate, 'utf8');
    results.push({ file: claudeMdPath, action: 'created' });
  }

  return results;
}

function installCodex(projectRoot, { verbose = false, force = false } = {}) {
  const results = [];
  const agentsMdPath = path.join(projectRoot, 'AGENTS.md');

  if (fs.existsSync(agentsMdPath)) {
    const existing = fs.readFileSync(agentsMdPath, 'utf8');
    if (existing.includes(ALIAS_START) && !force) {
      results.push({ file: agentsMdPath, action: 'skipped (alias block exists — use --force to overwrite)' });
      return results;
    }
    const aliasSection = readTemplate('codex/AGENTS.md').split('---').slice(1).join('---').trim();
    const block = ALIAS_START + '\n\n' + aliasSection + '\n\n' + ALIAS_END;
    const updated = mergeAliasBlock(existing, block, ALIAS_START, ALIAS_END);
    const changed = writeIfDifferent(agentsMdPath, updated);
    results.push({ file: agentsMdPath, action: changed ? 'updated (alias block merged)' : 'skipped (no changes)' });
  } else {
    const fullTemplate = readTemplate('codex/AGENTS.md');
    fs.writeFileSync(agentsMdPath, fullTemplate, 'utf8');
    results.push({ file: agentsMdPath, action: 'created' });
  }

  return results;
}

function installGemini(projectRoot, { verbose = false, force = false } = {}) {
  const results = [];
  const geminiMdPath = path.join(projectRoot, 'GEMINI.md');

  if (fs.existsSync(geminiMdPath)) {
    const existing = fs.readFileSync(geminiMdPath, 'utf8');
    if (existing.includes(ALIAS_START) && !force) {
      results.push({ file: geminiMdPath, action: 'skipped (alias block exists — use --force to overwrite)' });
      return results;
    }
    const aliasSection = readTemplate('gemini/GEMINI.md').split('---').slice(1).join('---').trim();
    const block = ALIAS_START + '\n\n' + aliasSection + '\n\n' + ALIAS_END;
    const updated = mergeAliasBlock(existing, block, ALIAS_START, ALIAS_END);
    const changed = writeIfDifferent(geminiMdPath, updated);
    results.push({ file: geminiMdPath, action: changed ? 'updated (alias block merged)' : 'skipped (no changes)' });
  } else {
    const fullTemplate = readTemplate('gemini/GEMINI.md');
    fs.writeFileSync(geminiMdPath, fullTemplate, 'utf8');
    results.push({ file: geminiMdPath, action: 'created' });
  }

  return results;
}

function installAll(projectRoot, opts = {}) {
  return {
    claude: installClaude(projectRoot, opts),
    codex: installCodex(projectRoot, opts),
    gemini: installGemini(projectRoot, opts),
  };
}

function getStatus(projectRoot) {
  const status = [];

  const claudeRulesPath = path.join(projectRoot, '.claude', 'rules', 'project-aliases.md');
  const claudeMdPath = path.join(projectRoot, 'CLAUDE.md');
  const agentsMdPath = path.join(projectRoot, 'AGENTS.md');
  const geminiMdPath = path.join(projectRoot, 'GEMINI.md');

  const claudeAliasesExist = fs.existsSync(claudeRulesPath);
  const claudeMdImports =
    fs.existsSync(claudeMdPath) &&
    fs.readFileSync(claudeMdPath, 'utf8').includes('@rules/project-aliases.md');

  status.push({
    tool: 'claude',
    installed: claudeAliasesExist,
    details: claudeAliasesExist
      ? claudeMdImports
        ? 'project-aliases.md + CLAUDE.md import'
        : 'project-aliases.md only (CLAUDE.md import missing)'
      : 'not installed',
  });

  const codexInstalled =
    fs.existsSync(agentsMdPath) &&
    fs.readFileSync(agentsMdPath, 'utf8').includes(ALIAS_START);
  status.push({
    tool: 'codex',
    installed: codexInstalled,
    details: codexInstalled ? 'AGENTS.md with alias block' : 'not installed',
  });

  const geminiInstalled =
    fs.existsSync(geminiMdPath) &&
    fs.readFileSync(geminiMdPath, 'utf8').includes(ALIAS_START);
  status.push({
    tool: 'gemini',
    installed: geminiInstalled,
    details: geminiInstalled ? 'GEMINI.md with alias block' : 'not installed',
  });

  return status;
}

function validateAliases(projectRoot) {
  const aliasesPath = path.join(projectRoot, '.claude', 'rules', 'project-aliases.md');
  const agentsMdPath = path.join(projectRoot, 'AGENTS.md');
  const geminiMdPath = path.join(projectRoot, 'GEMINI.md');

  // Build defined alias set from all available alias files
  const defined = new Set();
  const aliasPattern = /\|\s*([`]?)([~@$#&%]\w+)\1\s*\|/g;

  for (const filePath of [aliasesPath, agentsMdPath, geminiMdPath]) {
    if (!fs.existsSync(filePath)) continue;
    const content = fs.readFileSync(filePath, 'utf8');
    for (const match of content.matchAll(aliasPattern)) {
      defined.add(match[2]);
    }
  }

  // Scan markdown files for used aliases
  const usagePattern = /[~@$#&%][A-Z][a-zA-Z0-9]+/g;
  const undefined_ = new Map(); // alias -> [files]
  const mdFiles = findMdFiles(projectRoot);

  for (const file of mdFiles) {
    if (
      file.includes('project-aliases.md') ||
      file.includes('AGENTS.md') ||
      file.includes('GEMINI.md') ||
      file.includes('node_modules')
    ) continue;

    const content = fs.readFileSync(file, 'utf8');
    for (const match of content.matchAll(usagePattern)) {
      const alias = match[0];
      if (!defined.has(alias)) {
        if (!undefined_.has(alias)) undefined_.set(alias, []);
        undefined_.get(alias).push(path.relative(projectRoot, file));
      }
    }
  }

  return { defined: [...defined], undefined: [...undefined_.entries()] };
}

function findMdFiles(dir, results = []) {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory() && entry.name !== 'node_modules' && !entry.name.startsWith('.')) {
        findMdFiles(full, results);
      } else if (entry.isFile() && entry.name.endsWith('.md')) {
        results.push(full);
      }
    }
  } catch {}
  return results;
}

module.exports = {
  installClaude,
  installCodex,
  installGemini,
  installAll,
  getStatus,
  validateAliases,
};
