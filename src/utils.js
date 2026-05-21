'use strict';

const fs = require('fs');
const path = require('path');
const os = require('os');

function findProjectRoot(startDir = process.cwd()) {
  let dir = startDir;
  while (true) {
    if (
      fs.existsSync(path.join(dir, 'package.json')) ||
      fs.existsSync(path.join(dir, '.git')) ||
      fs.existsSync(path.join(dir, 'CLAUDE.md')) ||
      fs.existsSync(path.join(dir, 'AGENTS.md')) ||
      fs.existsSync(path.join(dir, 'GEMINI.md'))
    ) {
      return dir;
    }
    const parent = path.dirname(dir);
    if (parent === dir) return startDir;
    dir = parent;
  }
}

function detectInstalledTools(projectRoot) {
  const tools = [];
  if (fs.existsSync(path.join(projectRoot, 'CLAUDE.md'))) tools.push('claude');
  if (fs.existsSync(path.join(projectRoot, '.claude'))) tools.push('claude');
  if (fs.existsSync(path.join(projectRoot, 'AGENTS.md'))) tools.push('codex');
  if (fs.existsSync(path.join(projectRoot, 'GEMINI.md'))) tools.push('gemini');
  return [...new Set(tools)];
}

function readTemplate(templatePath) {
  const fullPath = path.join(__dirname, '..', 'templates', templatePath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }
  return fs.readFileSync(fullPath, 'utf8');
}

function mergeAliasBlock(existingContent, newBlock, startMarker, endMarker) {
  const start = existingContent.indexOf(startMarker);
  const end = existingContent.indexOf(endMarker);

  if (start !== -1 && end !== -1) {
    // Replace existing block
    return (
      existingContent.slice(0, start) +
      newBlock +
      existingContent.slice(end + endMarker.length)
    );
  }

  // Append new block
  return existingContent.trimEnd() + '\n\n' + newBlock + '\n';
}

function ensureDir(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

function writeIfDifferent(filePath, content) {
  if (fs.existsSync(filePath)) {
    const existing = fs.readFileSync(filePath, 'utf8');
    if (existing === content) return false;
  }
  fs.writeFileSync(filePath, content, 'utf8');
  return true;
}

module.exports = {
  findProjectRoot,
  detectInstalledTools,
  readTemplate,
  mergeAliasBlock,
  ensureDir,
  writeIfDifferent,
};
