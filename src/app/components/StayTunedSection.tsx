import React, { useState } from 'react';

const StayTunedSection = () => {
  const [showVoting, setShowVoting] = useState(false);
  return (
    <section className="w-full mb-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          Stay tuned!
        </h2>
        
        <div className="h-0.5 w-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
          <div className="space-y-2">
            <p>We are developing several new versions of LiveSQLBench for the first release:</p>
            <ul className="list-none space-y-2 pl-4">
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <span><strong className="text-purple-600">LiveSQLBench-Base-Full</strong> with <strong className="text-blue-600">600 BI tasks</strong>, <strong className="text-blue-600">200 Management tasks</strong> and <strong className="text-blue-600">HKB-Documents</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <span><strong className="text-purple-600">LiveSQLBench-Large-Lite</strong> featuring <strong className="text-blue-600">industrial-scale databases</strong> with <strong className="text-blue-600">1340+ columns</strong></span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 font-semibold mr-2">•</span>
                <span><strong className="text-purple-600">LiveSQLBench-Large-Full</strong> containing complete large version DBs and tasks</span>
              </li>
            </ul>
            <p>Additionally, we are expanding to <strong className="text-purple-600">multi-dialect support</strong>, starting with <strong className="text-blue-600">SQLite</strong> for research purposes, with plans to add more dialects based on community voting.</p>
            <p className="text-gray-600 italic">Each new version will include both open development and hidden test sets, with hidden tests becoming the next version's open development set.</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded hover:bg-gray-50 font-semibold text-blue-700 mb-4"
            onClick={() => setShowVoting((v) => !v)}
            aria-expanded={showVoting}
          >
            {showVoting ? (
              <span>&#x25B2;</span> // Up arrow
            ) : (
              <span>&#x25BC;</span> // Down arrow
            )}
            Vote for New SQL Dialects!
          </button>
          {showVoting && (
            <div>
              <p className="mb-4">
                Want new SQL dialects? Vote for new SQL dialects for LiveSQLBench by providing your preferences below.
              </p>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfEogmsA7LObI13KOoiojdnYfW28KEqvEVtC9hXaZJ8O9aCpQ/viewform?embedded=true"
                width="100%"
                height="900"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="LiveSQLBench Dialect Voting Form"
              >
                Loading…
              </iframe>
            </div>
          )}
        </div>
        
        {/* Feature Comparison Table */}
        {/* <div className="mt-12">
          <div className="bg-gradient-to-br from-white to-gray-50 p-8 rounded-2xl shadow-lg border border-gray-100">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Feature Comparison</h3>
              <div className="h-1 w-20 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>
            
            <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                    <th className="p-5 text-left border-b border-gray-200 font-semibold text-gray-900 text-lg">Feature</th>
                    <th className="p-5 text-left border-b border-gray-200 font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">LiveSQLBench-Base-Lite</span>
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Current</span>
                      </div>
                    </th>
                    <th className="p-5 text-left border-b border-gray-200 font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">LiveSQLBench-Base-Full</span>
                        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">Coming Soon</span>
                      </div>
                    </th>
                    <th className="p-5 text-left border-b border-gray-200 font-semibold text-gray-900">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">LiveSQLBench-Large-Full</span>
                        <span className="px-2 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">Coming Soon</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 border-b border-gray-200 font-medium text-gray-900 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                        </svg>
                        <span>User Tasks</span>
                      </div>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>270 tasks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Clear, direct queries with explicit DB/HKB connections</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Example1*</span>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>800 tasks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Natural, colloquial queries with implicit DB/HKB connections</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Example2*</span>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>800 tasks</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Natural, colloquial queries with implicit DB/HKB connections</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Example2*, but with large DBs (industrial-scale DB)</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 border-b border-gray-200 font-medium text-gray-900 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"></path>
                        </svg>
                        <span>Database</span>
                      </div>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>18 base databases</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>~127 columns per DB</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Simple 1:1 relationships</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Clean data (no nulls, consistent formats)</span>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>25 base databases</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>~127 columns per DB</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Complex relationships (1:1, 1:N, N:1, N:N)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Real-world data quality (e.g., nulls, duplicates, inconsistent formats)</span>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>25 large databases</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>~1,340 columns per DB</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Complex relationships (1:1, 1:N, N:1, N:N)</span>
                        </li>
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Real-world data quality (e.g., nulls, duplicates, inconsistent formats)</span>
                        </li>
                      </ul>
                    </td>
                  </tr>
                  <tr className="hover:bg-gray-50 transition-colors">
                    <td className="p-5 border-b border-gray-200 font-medium text-gray-900 bg-gray-50">
                      <div className="flex items-center space-x-2">
                        <svg className="w-10 h-10 text-purple-500 transform scale-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                        </svg>
                        <span>Hierarchical Knowledge Base (HKB)</span>
                      </div>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <span>Structured HKB-JSON format only</span>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <div>
                            <span>Dual format support:</span>
                            <ol className="mt-2 space-y-2 pl-6">
                              <li className="flex items-center">
                                <span className="w-4 h-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-xs mr-2">1</span>
                                <span>Structured HKB-JSON</span>
                              </li>
                              <li className="flex items-center">
                                <span className="w-4 h-4 flex items-center justify-center bg-purple-100 text-purple-600 rounded-full font-semibold text-xs mr-2">2</span>
                                <span>Unstructured HKB-Document</span>
                              </li>
                            </ol>
                          </div>
                        </li>
                      </ul>
                    </td>
                    <td className="p-5 border-b border-gray-200">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-sm mr-2">•</span>
                          <div>
                            <span>Dual format support:</span>
                            <ol className="mt-2 space-y-2 pl-6">
                              <li className="flex items-center">
                                <span className="w-4 h-4 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-xs mr-2">1</span>
                                <span>Structured HKB-JSON</span>
                              </li>
                              <li className="flex items-center">
                                <span className="w-4 h-4 flex items-center justify-center bg-indigo-100 text-indigo-600 rounded-full font-semibold text-xs mr-2">2</span>
                                <span>Unstructured HKB-Document</span>
                              </li>
                            </ol>
                          </div>
                        </li>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mt-8 space-y-4 text-sm">
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
                <p className="text-blue-800">
                  <span className="font-semibold">* Example1 (more formal):</span>
                  <span className="block mt-2 text-blue-700 italic">"For our archaeological site evaluation, I need to quantify the Digital Preservation Quality metrics across our collection. Please compute a comprehensive DPQ index for each archaeological location. Present the results in descending order of DPQ values, displaying only the site identification code, site designation, and calculated DPQ value (rounded to two decimal places) to facilitate prioritization of our digital preservation resources."</span>
                </p>
              </div>
              <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
                <p className="text-purple-800">
                  <span className="font-semibold">* Example2 (more colloquial):</span>
                  <span className="block mt-2 text-purple-700 italic">"I need to assess digital preservation quality across our archaeological sites. Can you calculate a DPQ score for each location and show me the results ranked by quality? Just include the site code, designation, and DPQ value rounded to two decimals - I want to see which sites need attention first for our preservation planning."</span>
                </p>
              </div>
            </div>
          </div>
        </div> */}


      </div>
    </section>
  );
};

export default StayTunedSection; 