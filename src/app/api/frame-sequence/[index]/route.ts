import { readFile } from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { framesDirectory, getFrameFiles } from "@/lib/frames/get-frame-files";

function getContentType(fileName: string): string {
  const ext = path.extname(fileName).toLowerCase();

  if (ext === ".png") {
    return "image/png";
  }

  if (ext === ".webp") {
    return "image/webp";
  }

  return "image/jpeg";
}

type RouteProps = {
  params: Promise<{ index: string }>;
};

export async function GET(_: Request, { params }: RouteProps) {
  const { index } = await params;
  const frameIndex = Number(index);

  if (!Number.isInteger(frameIndex) || frameIndex < 0) {
    return new NextResponse("Invalid frame index", { status: 400 });
  }

  const files = await getFrameFiles();
  const fileName = files[frameIndex];

  if (!fileName) {
    return new NextResponse("Frame not found", { status: 404 });
  }

  const filePath = path.join(framesDirectory, fileName);
  const buffer = await readFile(filePath);

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": getContentType(fileName),
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
