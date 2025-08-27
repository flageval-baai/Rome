import React, { useEffect, useRef } from 'react';
import { Graphviz } from 'graphviz-react';

interface SchemaViewerProps {
  dbName: string;
  dotContent: string;
}

const SchemaViewer: React.FC<SchemaViewerProps> = ({ dbName, dotContent }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 px-6 py-4">
        <h3 className="text-xl font-semibold text-white flex items-center">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
          </svg>
          Database Schema: {dbName}
        </h3>
      </div>
      
      <div className="p-4" ref={containerRef}>
        <div className="border rounded-lg overflow-auto bg-gray-50">
          <Graphviz
            dot={dotContent}
            options={{
              width: '100%',
              height: '600px',
              fit: true,
              zoom: true,
              engine: 'dot',
              format: 'svg'
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SchemaViewer; 