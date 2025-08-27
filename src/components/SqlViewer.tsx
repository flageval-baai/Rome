import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface SqlViewerProps {
  sql: string | string[];
  title?: string;
}

export default function SqlViewer({ sql, title }: SqlViewerProps) {
  const sqlString = Array.isArray(sql) ? sql.join('\n') : sql;

  return (
    <div className="my-4">
      {title && (
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
      )}
      <div className="rounded-lg overflow-hidden">
        <SyntaxHighlighter
          language="sql"
          style={vscDarkPlus}
          customStyle={{
            margin: 0,
            padding: '1rem',
            borderRadius: '0.5rem',
          }}
        >
          {sqlString}
        </SyntaxHighlighter>
      </div>
    </div>
  );
} 