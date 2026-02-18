/**
 * After static export, rewrite HTML files so asset paths (/_next/, /Images/) are relative.
 * This way CSS and images load correctly on every page (root and subpages).
 */

const path = require("path");
const fs = require("fs");

const outDir = path.resolve(__dirname, "..", "out");

function getDepth(relativePath) {
  const dir = path.dirname(relativePath);
  if (dir === "." || dir === "" || dir === path.sep) return 0;
  return dir.split(path.sep).filter(Boolean).length;
}

function fixFile(filePath) {
  const relativePath = path.relative(outDir, filePath);
  const depth = getDepth(relativePath);
  const prefix = depth === 0 ? "./" : "../".repeat(depth);

  let content = fs.readFileSync(filePath, "utf8");

  const replacements = [
    [/\bhref="\/_next\//g, `href="${prefix}_next/`],
    [/\bsrc="\/_next\//g, `src="${prefix}_next/`],
    [/\bhref="\/Images\//g, `href="${prefix}Images/`],
    [/\bsrc="\/Images\//g, `src="${prefix}Images/`],
    [/\bcontent="\/Images\//g, `content="${prefix}Images/`],
  ];

  for (const [re, replacement] of replacements) {
    content = content.replace(re, replacement);
  }

  fs.writeFileSync(filePath, content, "utf8");
}

function walkDir(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const ent of entries) {
    const full = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walkDir(full);
    } else if (ent.isFile() && ent.name.endsWith(".html")) {
      fixFile(full);
    }
  }
}

if (!fs.existsSync(outDir)) {
  console.error("out folder not found. Run npm run build:static first.");
  process.exit(1);
}

walkDir(outDir);
console.log("Fixed asset paths in static HTML files.");
