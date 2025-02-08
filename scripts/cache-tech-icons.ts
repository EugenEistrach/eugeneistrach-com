import fs from "fs/promises";
import path from "path";

const technologies = [
  "react",
  "typescript",
  "motion",
  "astro",
  "shopify",
  "tailwindcss",
  "figma",
  "playwright",
  "tanstack",
  "nodejs",
  "postgresql",
  "sqlite",
  "azure",
  "vercel",
  "github",
  "git",
  "anthropic",
  "v0",
  "raycast",
  "cursor",
  "claude-ai",
  "openai",
];

interface SVGLResponse {
  id: number;
  title: string;
  category: string;
  route:
    | string
    | {
        light: string;
        dark: string;
      };
  url: string;
}

interface DownloadResult {
  tech: string;
  success: boolean;
  error?: string;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

async function getAllIcons(): Promise<SVGLResponse[]> {
  console.log("Fetching all icons from SVGL...");
  const response = await fetch("https://api.svgl.app");
  if (!response.ok) {
    throw new Error(`Failed to fetch icons. Status: ${response.status}`);
  }
  return response.json();
}

async function downloadSvg(url: string, filePath: string) {
  const svgResponse = await fetch(url);
  console.log(`SVG download status: ${svgResponse.status}`);

  if (!svgResponse.ok) {
    const errorText = await svgResponse.text();
    throw new Error(
      `Failed to fetch SVG. Status: ${svgResponse.status}. Response: ${errorText}`
    );
  }

  const svg = await svgResponse.text();
  if (!svg.includes("<svg")) {
    console.log(`Invalid SVG content:`, svg.substring(0, 100));
    throw new Error("Invalid SVG response");
  }

  await fs.writeFile(filePath, svg);
  console.log(`✓ Downloaded SVG to ${filePath}`);
}

async function downloadIcon(
  tech: string,
  allIcons: SVGLResponse[]
): Promise<DownloadResult> {
  const baseIconPath = path.join(
    process.cwd(),
    "public",
    "icons",
    "tech",
    tech
  );

  try {
    // Find matching icon
    const icon = allIcons.find(
      (i) => i.title.toLowerCase() === tech.toLowerCase()
    );

    if (!icon) {
      throw new Error(`No icon found for ${tech}`);
    }

    console.log(`Found icon for ${tech}:`, icon);

    if (typeof icon.route === "string") {
      // Isomorphic icon
      console.log(`Downloading isomorphic icon from ${icon.route}`);
      await downloadSvg(icon.route, `${baseIconPath}.svg`);
    } else {
      // Light and dark variants
      console.log(`Downloading light variant from ${icon.route.light}`);
      await downloadSvg(icon.route.light, `${baseIconPath}-light.svg`);

      await delay(500);

      console.log(`Downloading dark variant from ${icon.route.dark}`);
      await downloadSvg(icon.route.dark, `${baseIconPath}-dark.svg`);
    }

    return { tech, success: true };
  } catch (error) {
    console.error(`✗ Failed to download ${tech} icon:`, error);
    if (error instanceof Error) {
      console.error("Error details:", error.message);
    }
    return {
      tech,
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

async function cacheIcons() {
  console.log("Starting icon download...");
  await fs.mkdir(path.join(process.cwd(), "public", "icons", "tech"), {
    recursive: true,
  });

  const allIcons = await getAllIcons();
  console.log(`Found ${allIcons.length} total icons in SVGL`);

  const results: DownloadResult[] = [];

  // Process icons sequentially to avoid rate limits
  for (const tech of technologies) {
    const result = await downloadIcon(tech, allIcons);
    results.push(result);
    await delay(1000);
  }

  // Summarize results
  const failedDownloads = results.filter((r) => !r.success);

  console.log("\n=== Download Summary ===");
  console.log(`Total icons attempted: ${results.length}`);
  console.log(
    `Successfully downloaded: ${results.length - failedDownloads.length}`
  );

  if (failedDownloads.length > 0) {
    console.log("\nFailed downloads:");
    failedDownloads.forEach(({ tech, error }) => {
      console.log(`- ${tech}: ${error}`);
    });
  }

  console.log("\nFinished downloading icons");
}

cacheIcons().catch((error) => {
  console.error("Fatal error:", error);
  process.exit(1);
});
