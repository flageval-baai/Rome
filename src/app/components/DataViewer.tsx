"use client";

import React, { useState, useEffect } from "react";
import type { DataEntry, KnowledgeEntry } from "@/utils/fileUtils";
import SqlViewer from "@/components/SqlViewer";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import type { SyntaxHighlighterProps } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";
import SchemaViewer from "./SchemaViewer";
import {
  getDatabases,
  readDataFile,
  readKnowledgeFile,
  readSchemaFile,
  getLargeDatabases,
  readKnowledgeMarkdownFile,
} from "@/utils/fileUtils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import type { Components } from 'react-markdown';
import 'katex/dist/katex.min.css';
import { Virtuoso } from 'react-virtuoso';

function KnowledgeList({ knowledge }: { knowledge: KnowledgeEntry[] }) {
  return (
    <Virtuoso
      style={{ height: 600 }}           // same visual size as before
      totalCount={knowledge.length}
      itemContent={index => (
        <KnowledgeEntryRenderer entry={knowledge[index]} />
      )}
    />
  );
}


// Add a new component for rendering knowledge entries
const KnowledgeEntryRenderer = ({ entry }: { entry: KnowledgeEntry }) => {
  const components: Components = {
    p({children}) {
      if (typeof children === 'string' && children.includes('•')) {
        const parts = children.split(/(•[^•]+)/);
        return (
          <div className="space-y-0.5 text-xs">
            {parts.map((part, i) => {
              if (part.startsWith('•')) {
                return (
                  <div key={i} className="flex items-start">
                    <span className="mr-2 text-gray-500">•</span>
                    <span className="text-xs">{part.slice(1).trim()}</span>
                  </div>
                );
              }
              return part ? <p key={i} className="text-xs">{part}</p> : null;
            })}
          </div>
        );
      }
      return <p className="text-xs">{children}</p>;
    }
  };

  const formatChildrenKnowledge = (children: number | number[]) => {
    if (children === -1) return "None";
    if (Array.isArray(children)) return children.join(", ");
    return children.toString();
  };

  return (
    <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="relative mb-2">
        <h4 className="font-medium text-gray-900 pr-20">
          {entry.knowledge}
        </h4>
        <span className="absolute top-0 right-0 text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-medium">
          ID: {entry.id}
        </span>
      </div>
      <p className="text-sm text-gray-600 mb-2">
        {entry.description}
      </p>
      <div className="prose prose-xs max-w-none bg-gray-50 p-3 rounded-lg border border-gray-100
        [&>*]:text-xs [&>*]:leading-relaxed
        prose-p:text-gray-700 prose-p:text-xs prose-p:leading-relaxed
        prose-strong:text-gray-900 prose-strong:font-semibold prose-strong:text-xs
        [&_.katex]:text-gray-900 [&_.katex]:text-xs
        [&_.katex-display]:my-2
        [&_.katex-display_.katex]:text-xs
        prose-ul:text-xs prose-ul:my-1 prose-ul:pl-4
        prose-li:text-xs prose-li:my-0.5
        prose-blockquote:text-xs prose-blockquote:border-l-2
        prose-code:text-xs prose-code:bg-gray-200 prose-code:px-1 prose-code:py-0.5 prose-code:rounded">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {entry.definition}
        </ReactMarkdown>
      </div>
      <div className="flex flex-wrap gap-2 text-xs mt-3">
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
          Type: {entry.type}
        </span>
        <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
          Children: {formatChildrenKnowledge(entry.children_knowledge)}
        </span>
      </div>
    </div>
  );
};

export default function DataViewer() {
  const [selectedDb, setSelectedDb] = useState<string>("");
  const [databases, setDatabases] = useState<string[]>([]);
  const [largeDatabases, setLargeDatabases] = useState<string[]>([]);
  const [data, setData] = useState<any[]>([]);
  const [knowledge, setKnowledge] = useState<any[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DataEntry | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [expandedSections, setExpandedSections] = useState<
    Record<string, boolean>
  >({
    mainQuery: true,
    ambiguity: true,
    followUp: true,
  });
  const [schemaDot, setSchemaDot] = useState<string | null>(null);
  const [showSchema, setShowSchema] = useState(false);
  const [schema, setSchema] = useState<any>(null);
  const [kbMarkdown, setKbMarkdown] = useState<string | null>(null);
  const [showKbDoc, setShowKbDoc] = useState(false);

  useEffect(() => {
    const loadDatabases = async () => {
      try {
        const dbs = getDatabases();
        setDatabases(dbs);

        // Load large databases
        const largeDbs = getLargeDatabases();
        setLargeDatabases(largeDbs);

        if (dbs.length > 0) {
          setSelectedDb(dbs[0]);
        }
      } catch (error) {
        console.error("Failed to load databases:", error);
      }
    };

    loadDatabases();
  }, []);

  useEffect(() => {
    const loadData = async () => {
      if (!selectedDb) return;

      try {
        const [dataEntries, knowledgeEntries, schemaData, kbContent] = await Promise.all([
          readDataFile(selectedDb),
          readKnowledgeFile(selectedDb),
          readSchemaFile(selectedDb),
          readKnowledgeMarkdownFile(selectedDb),
        ]);

        setData(dataEntries);
        setKnowledge(knowledgeEntries);
        if (schemaData?.dotContent) {
          setSchemaDot(schemaData.dotContent);
        }
        setKbMarkdown(kbContent);
      } catch (error) {
        console.error("Failed to load data:", error);
      }
    };

    loadData();
  }, [selectedDb]);

  const handleDbSelect = async (dbName: string) => {
    setSelectedDb(dbName);
    setLoading(true);
    setError(null);
    setSelectedEntry(null);
    setShowDetails(false);
    setSchemaDot(null);
    setShowSchema(false);
    setKbMarkdown(null);
    setShowKbDoc(false);

    try {
      // Load data directly from static JSON files
      const [dataEntries, knowledgeEntries, schemaData, kbContent] = await Promise.all([
        readDataFile(dbName),
        readKnowledgeFile(dbName),
        readSchemaFile(dbName),
        readKnowledgeMarkdownFile(dbName),
      ]);

      setData(dataEntries);
      setKnowledge(knowledgeEntries);
      if (schemaData?.dotContent) {
        setSchemaDot(schemaData.dotContent);
      }
      setKbMarkdown(kbContent);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleEntrySelect = (entry: DataEntry) => {
    setSelectedEntry(entry);
    setShowDetails(true);
    // Reset expanded sections when selecting a new entry
    setExpandedSections({
      mainQuery: true,
      ambiguity: true,
      followUp: true,
    });
    // Scroll to the details section
    setTimeout(() => {
      document
        .getElementById("entry-details")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  // Helper function to get knowledge entry by ID
  const getKnowledgeById = (id: number) => {
    return knowledge.find((k) => k.id === id);
  };

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  // Add copy button component
  const CopyButton = ({ content }: { content: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(content);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy text: ", err);
      }
    };

    return (
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 p-1 rounded-md bg-gray-700 hover:bg-gray-600 transition-colors"
        title="Copy to clipboard"
      >
        {copied ? (
          <Check className="w-4 h-4 text-green-400" />
        ) : (
          <Copy className="w-4 h-4 text-gray-300" />
        )}
      </button>
    );
  };

  // Modify renderSqlSnippet to include copy button
  const renderSqlSnippet = (sql: string) => {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <CopyButton content={sql} />
        <SyntaxHighlighter
          language="sql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {sql}
        </SyntaxHighlighter>
      </div>
    );
  };

  // Modify renderPythonCode to include copy button
  const renderPythonCode = (code: string) => {
    return (
      <div className="relative rounded-lg overflow-hidden">
        <CopyButton content={code} />
        <SyntaxHighlighter
          language="python"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: "0.75rem",
            borderRadius: "0.5rem",
            fontSize: "0.875rem",
          }}
        >
          {code}
        </SyntaxHighlighter>
      </div>
    );
  };

  // Modify SqlViewer usage to include copy button
  const SqlViewerWithCopy = ({ sql }: { sql: string }) => {
    return (
      <div className="relative">
        <CopyButton content={sql} />
        <SqlViewer sql={sql} />
      </div>
    );
  };

  // Format children knowledge IDs for display
  const formatChildrenKnowledge = (children: number | number[]) => {
    if (children === -1) return "None";
    if (Array.isArray(children)) return children.join(", ");
    return children.toString();
  };

  // Render a collapsible section
  const renderCollapsibleSection = (
    id: string,
    title: string,
    content: React.ReactNode,
    defaultExpanded: boolean = true
  ) => {
    const isExpanded = expandedSections[id] ?? defaultExpanded;

    return (
      <div className="border rounded-lg bg-white overflow-hidden">
        <button
          className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100 transition-colors"
          onClick={() => toggleSection(id)}
        >
          <h4 className="font-medium">{title}</h4>
          <svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isExpanded && <div className="p-4">{content}</div>}
      </div>
    );
  };

  // Render test cases
  const renderTestCases = (testCases: any[], title: string = "Test Cases") => {
    if (!testCases || testCases.length === 0) return null;

    return (
      <div className="p-3 border rounded bg-gray-50">
        <h5 className="font-medium mb-2">{title}</h5>
        <div className="space-y-2">
          {testCases.map((testCase, index) => (
            <div key={index} className="p-2 border rounded bg-white">
              <h6 className="font-medium text-green-800 mb-1">
                Test Case {index + 1}
              </h6>
              {typeof testCase === "string" &&
              testCase.includes("def test_case") ? (
                renderPythonCode(testCase)
              ) : (
                <pre className="text-sm overflow-x-auto p-2 bg-gray-100 rounded">
                  {JSON.stringify(testCase, null, 2)}
                </pre>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMarkdown = (content: string) => {
    const components: Components = {
      code({node, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '');
        if (!match) {
          return (
            <code className={className} {...props}>
              {children}
            </code>
          );
        }

        const language = match[1];
        const codeProps: SyntaxHighlighterProps = {
          style: vscDarkPlus,
          language,
          PreTag: "div",
          children: String(children).replace(/\n$/, '')
        };

        return <SyntaxHighlighter {...codeProps} />;
      }
    };

    return (
      <div className={`
        prose prose-sm md:prose-base lg:prose-lg max-w-none
        prose-headings:text-gray-900 prose-headings:font-semibold
        prose-p:text-gray-700 prose-p:leading-relaxed
        prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
        prose-strong:text-gray-900 prose-strong:font-semibold
        prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
        prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
        prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
        prose-li:my-1 prose-li:text-gray-700
        prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
        prose-table:w-full prose-table:my-4 prose-table:border-collapse
        prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-900 prose-th:p-3 prose-th:border prose-th:border-gray-300
        prose-td:p-3 prose-td:border prose-td:border-gray-300 prose-td:text-gray-700
        prose-hr:my-8 prose-hr:border-gray-200
        [&>*:first-child]:mt-0
        [&>*:last-child]:mb-0
        [&_.katex]:text-gray-900
        [&_.katex-display]:my-4 [&_.katex-display]:w-full [&_.katex-display]:overflow-hidden [&_.katex-display]:px-2 [&_.katex-display]:py-1 [&_.katex-display]:bg-gray-50 [&_.katex-display]:rounded
        [&_.katex-display_.katex]:text-base [&_.katex-display_.katex]:scale-[0.85] [&_.katex-display_.katex]:origin-left
        [&_.katex-inline]:text-sm [&_.katex-inline]:scale-[0.9] [&_.katex-inline]:origin-left
      `}>
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkMath]}
          rehypePlugins={[rehypeKatex]}
          components={components}
        >
          {content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <section className="bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            LiveSQLBench-Base-Lite Data
          </h2>
          <div className="text-gray-600 max-w-3xl mx-auto space-y-2">
            <p>
              Please explore{" "}
              <strong className="text-purple-600">LiveSQLBench-Base-Lite</strong>{" "}
              examples with DBs, tasks, and HKB-JSON, our initial release featuring 270 tasks across 18 end-user level databases. Each task features unambiguous and straightforward user queries grounded in external knowledge, with medium to hard complexity SQL statements.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-3">
              <div className="bg-blue-50 p-3 rounded-lg border border-blue-100">
                <div className="font-semibold text-blue-700">180</div>
                <div className="text-gray-600">SELECT Queries</div>
                <div className="text-xs text-blue-600 mt-1">(Base Version)</div>
              </div>
              <div className="bg-purple-50 p-3 rounded-lg border border-purple-100">
                <div className="font-semibold text-purple-700">90</div>
                <div className="text-gray-600">Management SQLs</div>
                <div className="text-xs text-purple-600 mt-1">
                  (Base Version)
                </div>
              </div>
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="font-semibold text-green-700">360</div>
                <div className="text-gray-600">Avg SQL Tokens</div>
                <div className="text-xs text-green-600 mt-1">Current Avg</div>
              </div>
              <div className="bg-indigo-50 p-3 rounded-lg border border-indigo-100">
                <div className="font-semibold text-indigo-700">18</div>
                <div className="text-gray-600">Databases</div>
                <div className="text-xs text-indigo-600 mt-1">
                  (Base Version)
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-blue-700 text-center">
              <strong>Preview: </strong> <strong>Large Version (Industrial Level) DBs</strong>  and unstructured <strong>HKB-Document</strong> will be supported in the future <strong className="text-purple-600">LiveSQLBench-Full</strong> version.
              </p>
              {/* <p className="text-sm text-black-700">
                <strong>Large Version (Industrial Level) Preview:</strong> 
                We are currently
                developing large versions of each db, featuring 1340+ columns. 
                Demo versions of{" "}
                <code className="px-1 py-0.5 bg-indigo-100 rounded">
                  alien_large
                </code>{" "}
                and{" "}
                <code className="px-1 py-0.5 bg-indigo-100 rounded">
                  archeology_large
                </code>{" "}
                are available for preview with very complex ER diagrams.
              </p>
              <p className="text-sm text-black-700">
                <strong>Knowledge Base (Document) Preview:</strong> Knowledge Base (Document) is the document-format of Knowledge Base (JSON), which is more realistic and requires LLM's long-context reasoning ability.
              </p> */}
            </div>
            {/* <div className="mt-4 p-3 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-blue-700 text-center">
              Two features will be supported in the future LiveSQLBench-Full version.
              </p>
              <p className="text-sm text-black-700">
                <strong>Large Version (Industrial Level) Preview:</strong> 
                We are currently
                developing large versions of each db, featuring 1340+ columns. 
                Demo versions of{" "}
                <code className="px-1 py-0.5 bg-indigo-100 rounded">
                  alien_large
                </code>{" "}
                and{" "}
                <code className="px-1 py-0.5 bg-indigo-100 rounded">
                  archeology_large
                </code>{" "}
                are available for preview with very complex ER diagrams.
              </p>
              <p className="text-sm text-black-700">
                <strong>Knowledge Base (Document) Preview:</strong> Knowledge Base (Document) is the document-format of Knowledge Base (JSON), which is more realistic and requires LLM's long-context reasoning ability.
              </p>
            </div> */}
          </div>
        </div>

        <div className="mb-8 max-w-md mx-auto">
          <label className="block text-sm font-medium text-gray-700 mb-2 text-center">
            Select Database
          </label>
          <div className="relative">
            <select
              className="w-full p-3 pl-4 pr-10 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition-all duration-200 hover:border-blue-400"
              value={selectedDb}
              onChange={(e) => handleDbSelect(e.target.value)}
            >
              <option value="">Select a database...</option>
              <optgroup label="Base Versions">
                {databases.map((db) => (
                  <option key={db} value={db}>
                    {db}
                  </option>
                ))}
              </optgroup>
              {largeDatabases.length > 0 && (
                <optgroup label="Large Versions (Preview)">
                  {largeDatabases.map((db) => (
                    <option key={db} value={db}>
                      {db}
                    </option>
                  ))}
                </optgroup>
              )}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        {error && (
          <div className="max-w-2xl mx-auto p-4 mb-6 text-red-700 bg-red-50 border border-red-200 rounded-xl shadow-sm">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              {error}
            </div>
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent"></div>
            <p className="mt-4 text-gray-600 font-medium">Loading data...</p>
          </div>
        ) : (
          selectedDb && (
            <>
              {/* Add Schema Viewer Toggle Button */}
              {schemaDot && (
                <div className="max-w-4xl mx-auto mb-6">
                  <button
                    onClick={() => setShowSchema(!showSchema)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-indigo-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                        ></path>
                      </svg>
                      <span className="font-medium text-gray-900">
                        Database Schema
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        showSchema ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* Schema Viewer */}
              {showSchema && schemaDot && (
                <div className="max-w-4xl mx-auto mb-8">
                  <SchemaViewer dbName={selectedDb} dotContent={schemaDot} />
                </div>
              )}

              {/* Add Knowledge Base Document Toggle Button */}
              {kbMarkdown && (
                <div className="max-w-4xl mx-auto mb-6">
                  <button
                    onClick={() => setShowKbDoc(!showKbDoc)}
                    className="w-full flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-purple-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        ></path>
                      </svg>
                      <span className="font-medium text-gray-900">
                        HKB-Document Preview
                      </span>
                    </div>
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        showKbDoc ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                      ></path>
                    </svg>
                  </button>
                </div>
              )}

              {/* Knowledge Base Document Viewer */}
              {showKbDoc && kbMarkdown && (
                <div className="max-w-4xl mx-auto mb-8">
                  <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                    {/* macOS-style window header */}
                    <div className="bg-gradient-to-b from-gray-100 to-gray-50 px-4 py-2 border-b border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        {/* Traffic light buttons */}
                        <div className="flex space-x-1.5">
                          <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"></button>
                          <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></button>
                          <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"></button>
                        </div>
                        {/* Window title */}
                        <div className="flex-1 text-center">
                          <div className="bg-white rounded-md px-4 py-1 inline-flex items-center shadow-sm border border-gray-200">
                            <svg
                              className="w-4 h-4 mr-2 text-gray-500"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              ></path>
                            </svg>
                            <span className="text-sm font-medium text-gray-700">
                              {selectedDb.charAt(0).toUpperCase() + selectedDb.slice(1)} Knowledge Base.pdf
                            </span>
                          </div>
                        </div>
                        {/* Window controls */}
                        <div className="flex items-center space-x-2">
                          <button className="p-1 rounded hover:bg-gray-200 transition-colors">
                            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>
                      </div>
                      {/* Toolbar */}
                      <div className="flex items-center space-x-4 px-2 py-1 bg-white rounded-md border border-gray-200">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <span className="px-2 py-0.5 bg-gray-100 rounded">File</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded">Edit</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded">View</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded">Window</span>
                          <span className="px-2 py-0.5 bg-gray-100 rounded">Help</span>
                        </div>
                      </div>
                    </div>

                    {/* Window content */}
                    <div className="relative bg-[#fafafa] min-h-[600px]">
                      {/* Paper-like background with subtle texture */}
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBvcGFjaXR5PSIwLjAyIj48cGF0aCBkPSJNMTAgMTBsMTAgMTBIMHYtMTB6IiBmaWxsPSIjMDAwIi8+PC9nPjwvc3ZnPg==')]"></div>
                      
                      {/* Content area with paper-like margins and shadow */}
                      <div className="relative mx-8 my-6 bg-white rounded-lg shadow-[0_0_15px_rgba(0,0,0,0.1)]">
                        {/* Document content with proper margins */}
                        <div className="px-12 py-8">
                          <div className={`
                            prose prose-sm md:prose-base lg:prose-lg max-w-none
                            prose-headings:text-gray-900 prose-headings:font-semibold
                            prose-p:text-gray-700 prose-p:leading-relaxed
                            prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            prose-code:text-gray-900 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-sm
                            prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-lg prose-pre:overflow-x-auto
                            prose-ul:list-disc prose-ul:pl-6 prose-ul:my-4
                            prose-ol:list-decimal prose-ol:pl-6 prose-ol:my-4
                            prose-li:my-1 prose-li:text-gray-700
                            prose-blockquote:border-l-4 prose-blockquote:border-gray-300 prose-blockquote:pl-4 prose-blockquote:italic prose-blockquote:text-gray-600
                            prose-table:w-full prose-table:my-4 prose-table:border-collapse
                            prose-th:bg-gray-100 prose-th:font-semibold prose-th:text-gray-900 prose-th:p-3 prose-th:border prose-th:border-gray-300
                            prose-td:p-3 prose-td:border prose-td:border-gray-300 prose-td:text-gray-700
                            prose-hr:my-8 prose-hr:border-gray-200
                            [&>*:first-child]:mt-0
                            [&>*:last-child]:mb-0
                            [&_.katex]:text-gray-900
                            [&_.katex-display]:my-4 [&_.katex-display]:w-full [&_.katex-display]:overflow-hidden [&_.katex-display]:px-2 [&_.katex-display]:py-1 [&_.katex-display]:bg-gray-50 [&_.katex-display]:rounded
                            [&_.katex-display_.katex]:text-base [&_.katex-display_.katex]:scale-[0.85] [&_.katex-display_.katex]:origin-left
                            [&_.katex-inline]:text-sm [&_.katex-inline]:scale-[0.9] [&_.katex-inline]:origin-left
                          `}>
                            <ReactMarkdown
                              remarkPlugins={[remarkGfm, remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                              components={{
                                code({node, className, children, ...props}) {
                                  const match = /language-(\w+)/.exec(className || '');
                                  if (!match) {
                                    return (
                                      <code className={className} {...props}>
                                        {children}
                                      </code>
                                    );
                                  }

                                  const language = match[1];
                                  const codeProps: SyntaxHighlighterProps = {
                                    style: vscDarkPlus,
                                    language,
                                    PreTag: "div",
                                    children: String(children).replace(/\n$/, '')
                                  };

                                  return <SyntaxHighlighter {...codeProps} />;
                                }
                              }}
                            >
                              {kbMarkdown}
                            </ReactMarkdown>
                          </div>
                        </div>

                        {/* Page footer with subtle line and page number */}
                        <div className="border-t border-gray-100 px-8 py-4 bg-gray-50">
                          <div className="flex justify-between items-center text-sm text-gray-500">
                            <span>LiveSQLBench Knowledge Base</span>
                            <span>Page 1</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Window status bar */}
                    <div className="bg-gray-50 border-t border-gray-200 px-4 py-1.5 flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center space-x-4">
                        <span>Ready</span>
                        <span>•</span>
                        <span>UTF-8</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span>100%</span>
                        <span>•</span>
                        <span>PDF</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {selectedEntry && showDetails && (
                <div className="w-full py-6">
                  <div
                    id="entry-details"
                    className="mx-auto max-w-4xl bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-xl font-semibold text-white">
                          Selected Entry Details
                        </h3>
                        <button
                          onClick={() => setShowDetails(false)}
                          className="text-sm text-blue-100 hover:text-white transition-colors duration-200"
                        >
                          Hide Details
                        </button>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="space-y-6">
                        {renderCollapsibleSection(
                          "mainQuery",
                          "Main Query Information",
                          <div className="space-y-6">
                            <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                              <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <svg
                                  className="w-5 h-5 mr-2 text-blue-500"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                                  ></path>
                                </svg>
                                Query
                              </h5>
                              <p className="text-gray-700 leading-relaxed">
                                {selectedEntry.query}
                              </p>
                            </div>

                            {selectedEntry.sol_sql.length > 0 && (
                              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <svg
                                    className="w-5 h-5 mr-2 text-green-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M5 13l4 4L19 7"
                                    ></path>
                                  </svg>
                                  Solution SQL
                                </h5>
                                <SqlViewerWithCopy
                                  sql={selectedEntry.sol_sql.join("\n")}
                                />
                              </div>
                            )}

                            {selectedEntry.preprocess_sql.length > 0 && (
                              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <svg
                                    className="w-5 h-5 mr-2 text-purple-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                    ></path>
                                  </svg>
                                  Preprocess SQL
                                </h5>
                                <SqlViewerWithCopy
                                  sql={selectedEntry.preprocess_sql.join("\n")}
                                />
                              </div>
                            )}

                            {selectedEntry.clean_up_sqls.length > 0 && (
                              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <svg
                                    className="w-5 h-5 mr-2 text-yellow-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    ></path>
                                  </svg>
                                  Clean Up SQL
                                </h5>
                                <SqlViewerWithCopy
                                  sql={selectedEntry.clean_up_sqls.join("\n")}
                                />
                              </div>
                            )}

                            {selectedEntry.external_knowledge.length > 0 && (
                              <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                  <svg
                                    className="w-5 h-5 mr-2 text-indigo-500"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth="2"
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    ></path>
                                  </svg>
                                  Required External Knowledge
                                </h5>
                                <div className="space-y-3">
                                  {selectedEntry.external_knowledge.map(
                                    (id: number) => {
                                      const knowledgeEntry =
                                        getKnowledgeById(id);
                                      return (
                                        <div
                                          key={id}
                                          className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-200"
                                        >
                                          <div className="relative mb-2">
                                            <h4 className="font-medium text-gray-900 pr-20">
                                              {knowledgeEntry
                                                ? knowledgeEntry.knowledge
                                                : `Knowledge ID ${id}`}
                                            </h4>
                                            <span className="absolute top-0 right-0 text-xs bg-indigo-100 text-indigo-800 px-2.5 py-1 rounded-full font-medium">
                                              ID: {id}
                                            </span>
                                          </div>
                                          {knowledgeEntry ? (
                                            <>
                                              <p className="text-sm text-gray-600 mb-2">
                                                {knowledgeEntry.description}
                                              </p>
                                              <p className="text-sm font-mono bg-gray-50 p-2 rounded border border-gray-100 mb-2">
                                                {knowledgeEntry.definition}
                                              </p>
                                              <div className="flex flex-wrap gap-2 text-xs">
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                  Type: {knowledgeEntry.type}
                                                </span>
                                                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                                                  Children:{" "}
                                                  {formatChildrenKnowledge(
                                                    knowledgeEntry.children_knowledge
                                                  )}
                                                </span>
                                              </div>
                                            </>
                                          ) : (
                                            <p className="text-gray-500 italic">
                                              Knowledge ID {id} not found
                                            </p>
                                          )}
                                        </div>
                                      );
                                    }
                                  )}
                                </div>
                              </div>
                            )}

                            {selectedEntry.test_cases &&
                              selectedEntry.test_cases.length > 0 && (
                                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl border border-gray-100 shadow-sm">
                                  <h5 className="font-semibold text-gray-900 mb-3 flex items-center">
                                    <svg
                                      className="w-5 h-5 mr-2 text-red-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                      ></path>
                                    </svg>
                                    Test Cases
                                  </h5>
                                  {renderTestCases(selectedEntry.test_cases)}
                                </div>
                              )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
                    <h3 className="text-xl font-semibold text-white">
                      Data Entries
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      {data.map((entry) => (
                        <div
                          key={entry.instance_id}
                          className={`p-4 rounded-xl border transition-all duration-200 cursor-pointer hover:shadow-md ${
                            selectedEntry?.instance_id === entry.instance_id
                              ? "bg-blue-50 border-blue-200 shadow-sm"
                              : "bg-white border-gray-100 hover:border-blue-200"
                          }`}
                          onClick={() => handleEntrySelect(entry)}
                        >
                          <h4 className="font-medium text-gray-900">
                            Instance ID: {entry.instance_id}
                          </h4>
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {entry.query}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full">
                              Category: {entry.category}
                            </span>
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              Knowledge IDs:{" "}
                              {entry.external_knowledge.join(", ")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                  <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
                    <h3 className="text-xl font-semibold text-white">
                      HKB-JSON
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                      <KnowledgeList knowledge={knowledge} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )
        )}
      </div>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
        
        /* Add styles for markdown content */
        .prose pre {
          margin: 1.5em 0;
          padding: 1em;
          border-radius: 0.5rem;
          overflow-x: auto;
        }
        
        .prose code {
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
        }
        
        .prose h1, .prose h2, .prose h3, .prose h4 {
          margin-top: 2em;
          margin-bottom: 1em;
          font-weight: 600;
        }
        
        .prose p {
          margin: 1em 0;
          line-height: 1.75;
        }
        
        .prose ul, .prose ol {
          margin: 1em 0;
          padding-left: 1.5em;
        }
        
        .prose li {
          margin: 0.5em 0;
        }
        
        .prose blockquote {
          margin: 1.5em 0;
          padding-left: 1em;
          border-left: 4px solid #e5e7eb;
          color: #6b7280;
        }
        
        .prose table {
          width: 100%;
          margin: 1.5em 0;
          border-collapse: collapse;
        }
        
        .prose th, .prose td {
          padding: 0.75em;
          border: 1px solid #e5e7eb;
        }
        
        .prose th {
          background-color: #f9fafb;
          font-weight: 600;
        }
        
        /* Update styles for LaTeX formulas */
        .prose .katex-display {
          margin: 1.5em 0;
          padding: 0.5em;
          background-color: #f9fafb;
          border-radius: 0.5rem;
          width: 100%;
          overflow: hidden;
        }
        
        .prose .katex-display .katex {
          font-size: 1.1em;
          transform: scale(0.85);
          transform-origin: left;
          display: inline-block;
        }
        
        .prose .katex-inline {
          font-size: 0.9em;
          transform: scale(0.9);
          transform-origin: left;
          display: inline-block;
        }

        /* Remove scrollbar styles since we're not using them anymore */
        .prose .katex-display::-webkit-scrollbar,
        .prose .katex-inline::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
