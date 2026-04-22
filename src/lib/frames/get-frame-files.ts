import "server-only";

import { readdir } from "node:fs/promises";
import path from "node:path";
import type { Dirent } from "node:fs";

const framesDirectory = path.join(process.cwd(), "frames_software");

function getFrameNumber(fileName: string): number {
  const bracketMatch = fileName.match(/\((\d+)\)/);
  if (bracketMatch) {
    return Number(bracketMatch[1]);
  }

  const numericMatch = fileName.match(/(\d+)/);
  return numericMatch ? Number(numericMatch[1]) : 0;
}

export async function getFrameFiles(): Promise<string[]> {
  let entries: Dirent[];
  try {
    entries = (await readdir(framesDirectory, { withFileTypes: true })) as unknown as Dirent[];
  } catch (err) {
    const e = err as { code?: string };
    if (e?.code === "ENOENT") {
      return [];
    }
    throw err;
  }

  return entries
    .filter((entry) => entry.isFile() && /\.(jpg|jpeg|png|webp)$/i.test(entry.name))
    .map((entry) => entry.name)
    .sort((a, b) => getFrameNumber(a) - getFrameNumber(b));
}

export async function getFrameCount(): Promise<number> {
  const files = await getFrameFiles();
  return files.length;
}

export { framesDirectory };
