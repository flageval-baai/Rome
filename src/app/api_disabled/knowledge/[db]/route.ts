import { NextResponse } from "next/server";
import { readKnowledgeFile, getDatabases } from "@/utils/fileUtils";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const databases = getDatabases();
  return databases.map((db) => ({
    db,
  }));
}

export async function GET(
  request: Request,
  { params }: { params: { db: string } }
) {
  try {
    const { db: dbName } = params;
    const data = readKnowledgeFile(dbName);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to get knowledge" },
      { status: 500 }
    );
  }
}
