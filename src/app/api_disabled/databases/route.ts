import { NextResponse } from "next/server";
import { getDatabases } from "@/utils/fileUtils";

export const dynamic = "force-static";

export async function GET() {
  try {
    const databases = getDatabases();
    return NextResponse.json(databases);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get databases" },
      { status: 500 }
    );
  }
}
