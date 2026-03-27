import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const VIEW_FILE = path.join(process.cwd(), "views.json");

function getViews() {
  try {
    if (!fs.existsSync(VIEW_FILE)) {
      return { count: 0 };
    }
    const data = fs.readFileSync(VIEW_FILE, "utf-8");
    return JSON.parse(data);
  } catch {
    return { count: 0 };
  }
}

function setViews(count: number) {
  fs.writeFileSync(VIEW_FILE, JSON.stringify({ count }), "utf-8");
}

export async function GET() {
  const views = getViews();
  return NextResponse.json(views);
}

export async function POST() {
  const views = getViews();
  const nextCount = views.count + 1;
  setViews(nextCount);
  return NextResponse.json({ count: nextCount });
}
