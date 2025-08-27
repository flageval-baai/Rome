/// <reference types="node" />

import type { DataEntry, KnowledgeEntry } from "./types";

// Re-export the types
export type { DataEntry, KnowledgeEntry };

// Get the base path for assets in GitHub Pages
export function getBasePath(): string {
  // For GitHub Pages deployment
  if (process.env.DEPLOY_TARGET === 'GH_PAGES') {
    return '/livesqlbench.github.io';
  }
  // For Netlify deployment or local development
  return '';
}

// 预定义的数据库列表
const DATABASES = [
  "alien",
  "archeology"
];

// 预定义的大数据库列表
const LARGE_DATABASES = ["alien_large", "archeology_large"];

export function getDatabases(): string[] {
  return DATABASES;
}

export function getLargeDatabases(): string[] {
  return LARGE_DATABASES;
}

// Helper function to parse JSONL file
async function parseJSONL(response: Response): Promise<any[]> {
  const text = await response.text();
  return text
    .split('\n')
    .filter(line => line.trim()) // Remove empty lines
    .map(line => JSON.parse(line));
}

export async function readDataFile(dbName: string): Promise<DataEntry[]> {
  try {
    const basePath = getBasePath();
    const path = basePath ? `${basePath}/data/${dbName}/${dbName}_data.jsonl` : `/data/${dbName}/${dbName}_data.jsonl`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load data for ${dbName}`);
    }
    return await parseJSONL(response);
  } catch (error) {
    console.error(`Error loading data for ${dbName}:`, error);
    return [];
  }
}

export async function readKnowledgeFile(
  dbName: string
): Promise<KnowledgeEntry[]> {
  try {
    const basePath = getBasePath();
    const path = basePath ? `${basePath}/data/${dbName}/${dbName}_kb.jsonl` : `/data/${dbName}/${dbName}_kb.jsonl`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load knowledge for ${dbName}`);
    }
    return await parseJSONL(response);
  } catch (error) {
    console.error(`Error loading knowledge for ${dbName}:`, error);
    return [];
  }
}

export async function readSchemaFile(dbName: string): Promise<any> {
  try {
    const basePath = getBasePath();
    const path = basePath ? `${basePath}/data/${dbName}/public.dot` : `/data/${dbName}/public.dot`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load schema for ${dbName}`);
    }
    const dotContent = await response.text();
    return { dotContent };
  } catch (error) {
    console.error(`Error loading schema for ${dbName}:`, error);
    return null;
  }
}

export async function readKnowledgeMarkdownFile(dbName: string): Promise<string | null> {
  try {
    const basePath = getBasePath();
    const path = basePath ? `${basePath}/data/${dbName}/${dbName}_kb.md` : `/data/${dbName}/${dbName}_kb.md`;
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load knowledge markdown for ${dbName}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading knowledge markdown for ${dbName}:`, error);
    return null;
  }
}
