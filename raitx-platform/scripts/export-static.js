/**
 * Build static HTML export (output in /out).
 * Usage: npm run build:static
 *
 * دیتا (مقالات، دربارهٔ ما و...) فقط موقع بیلد از API گرفته می‌شود.
 * اگر اینترنت یا mrpremiumhub.org در دسترس نباشد، صفحات با لیست خالی بیلد می‌شوند.
 */

const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

const root = path.resolve(__dirname, "..");
const outDir = path.join(root, "out");
const appDir = path.join(root, "app");
const apiDir = path.join(appDir, "api");
const apiBackup = path.join(appDir, "_api_disabled_for_export");
const actionsFile = path.join(appDir, "(main)", "admin", "articles", "actions.ts");
const actionsBackup = path.join(appDir, "(main)", "admin", "articles", "actions.ts.bak");

const ARTICLES_API = "https://mrpremiumhub.org/api.ashx?action=Article";

const ACTIONS_STUB = `// Stub for static export (Server Actions not supported with output: export)
export async function revalidateNews(_slug?: string): Promise<void> {}
`;

/** قبل از بیلد چک می‌کند API مقالات در دسترس باشد؛ اگر نبود هشدار می‌دهد. */
function checkDataApiReachable() {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(false);
    }, 10000);
    fetch(ARTICLES_API, { method: "GET" })
      .then((res) => {
        clearTimeout(timeout);
        if (!res.ok) {
          resolve(false);
          return;
        }
        return res.json().then((data) => {
          const arr = Array.isArray(data) ? data : (data?.data ?? data?.items ?? data?.list ?? []);
          resolve(Array.isArray(arr) && arr.length > 0);
        }).catch(() => resolve(false));
      })
      .catch(() => {
        clearTimeout(timeout);
        resolve(false);
      });
  });
}

function run() {
  (async () => {
    console.log("Checking if data API is reachable (for articles, about, etc.)...");
    const ok = await checkDataApiReachable();
    if (!ok) {
      console.warn("");
      console.warn("  ⚠ داده‌ها (مقالات، بخش دربارهٔ ما) موقع بیلد از API لود می‌شوند.");
      console.warn("  ⚠ به نظر می‌رسد الان به اینترنت یا به آدرس زیر دسترسی نیست:");
      console.warn("     " + ARTICLES_API);
      console.warn("  ⚠ در خروجی استاتیک، صفحات اخبار و دربارهٔ ما با لیست خالی ساخته می‌شوند.");
      console.warn("  ⚠ برای داشتن دیتا: اتصال اینترنت را چک کنید و دوباره بیلد بگیرید.");
      console.warn("");
    } else {
      console.log("  Data API is reachable. Articles and about data will be included in the build.");
    }
  })().then(() => {
    doRun();
  }).catch((e) => {
    console.warn("Pre-build check failed:", e.message);
    doRun();
  });
}

function doRun() {
  try {
    if (!fs.existsSync(apiDir)) {
      console.log("app/api not found; running static build...");
      build();
      return;
    }
    console.log("Temporarily moving app/api...");
    if (fs.existsSync(apiBackup)) fs.rmSync(apiBackup, { recursive: true });
    fs.renameSync(apiDir, apiBackup);

    let restoredActions = false;
    if (fs.existsSync(actionsFile)) {
      console.log("Temporarily stubbing Server Actions for static export...");
      fs.copyFileSync(actionsFile, actionsBackup);
      fs.writeFileSync(actionsFile, ACTIONS_STUB, "utf8");
      restoredActions = true;
    }

    if (fs.existsSync(outDir)) {
      try {
        console.log("Cleaning previous out folder...");
        fs.rmSync(outDir, { recursive: true, maxRetries: 2 });
      } catch (e) {
        if (e.code === "EPERM" || e.code === "EBUSY" || e.code === "ENOTEMPTY") {
          console.error("\nCannot delete 'out' folder (file in use or locked).");
          console.error("Do this then run again:");
          console.error("  1. Close any window showing the 'out' folder (Explorer, terminal running serve).");
          console.error("  2. Delete the folder manually: raitx-platform\\out");
          console.error("  3. Run: npm run build:static\n");
          process.exit(1);
        }
        throw e;
      }
    }
    console.log("Building static output...");
    build();
    console.log("Fixing asset paths for CSS and images...");
    try {
      require("./fix-static-asset-paths.js");
    } catch (e) {
      console.warn("Path fix warning:", e.message);
    }
  } catch (err) {
    console.error("Error:", err.message);
    throw err;
  } finally {
    if (fs.existsSync(apiBackup) && !fs.existsSync(apiDir)) {
      console.log("Restoring app/api...");
      fs.renameSync(apiBackup, apiDir);
    }
    if (fs.existsSync(actionsBackup)) {
      console.log("Restoring Server Actions file...");
      fs.copyFileSync(actionsBackup, actionsFile);
      fs.unlinkSync(actionsBackup);
    }
  }
  console.log("Done. Output is in the 'out' folder.");
}

function build() {
  try {
    execSync("npx next build", {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, BUILD_STATIC: "1" },
    });
  } catch (err) {
    console.error("\n--- Build failed. If the error above is ENOTEMPTY or about 'out' folder:");
    console.error("1. Close any program using the 'out' folder (Explorer, previous serve).");
    console.error("2. Manually delete the folder: raitx-platform\\out");
    console.error("3. Run again: npm run build:static\n");
    throw err;
  }
}

run();
