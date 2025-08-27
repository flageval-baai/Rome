import Image from 'next/image';

const Introduction = () => {
    return (
        <div className="max-w-4xl mx-auto px-4 py-6 bg-white rounded-lg shadow-sm">
            <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Introduction</h2>
                <div className="mx-auto h-1 w-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            </div>

            <div className="space-y-4">
                <div className="bg-gradient-to-br from-gray-50 to-white p-5 rounded-xl shadow-sm">
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                        <strong className="text-blue-600">LiveSQLBench (BIRD-SQL Pro v0.5)</strong> is a contamination-free, continuously evolving benchmark designed to evaluate LLMs on complex, real-world text-to-SQL tasks, featuring diverse real-world user queries, including <strong className="text-black-600">Business Intelligence (BI)</strong>, <strong className="text-black-600">CRUD operations</strong>, etc. Each release will include <strong className="text-black-600">50 new, fully open-source DBs</strong> curated by the BIRD team through expert collaboration and continuous improvement. It will cover a wide range of database sizes, from <strong className="text-black-600">end-user level (around 127 columns)</strong> to <strong className="text-black-600">industrial level (1340+ columns)</strong>.
                        Here are the features of the <strong className="text-blue-600">LiveSQLBench</strong> benchmark:
                        {/* We are actively expanding in two dimensions: (1) increasing the number of databases and tasks to 600+ tasks, and (2) creating <strong className="text-indigo-600">Large Versions (Industrial Level)</strong> of each database, featuring 40+ tables and 800+ columns, significantly expanding the complexity and scale. */}
                    </p>

                    <ul className="space-y-2">
                        {[
                            {
                                title: "Live Databases",
                                desc: "Constructed dynamically from extensive and regularly updated CSV datasets, with both base (user-end level) and large (industrial level) versions (1340+ columns each DB) to test scalability."
                            },
                            {
                                title: "Live User Queries and SQL",
                                desc: "Each task pairs unambiguous user queries with annotated, gold-standard SQL statements. The user queries are grounded in external knowledge, with medium to hard complexity SQL statements."
                            },
                            {
                                title: "Contextual Reasoning (HKB)",
                                desc: "Every DB includes a hierarchical knowledge base (HKB) where each knowledge is related to others, which requires the multi-hop reasoning ability. Two HKB formats are provided: (1) structured JSON format, and (2) unstructured Document format."
                            },
                            {
                                title: "The First Full SQL Spectrum",
                                desc: "Supports not just SELECT (Business Intelligence) queries, but also CRUD (e.g., UPDATE, CREATE, and other database management operations) queries."
                            },
                            {
                                title: "Automated Evaluation",
                                desc: "Each question includes verifiable test cases for accurate, reproducible scoring."
                            },
                            {
                                title: "Truly Live & Hidden Test",
                                desc: "New databases and tasks are added over time. Each release features both open development and hidden test phases. The hidden test set from each release becomes the open development set for the next release, ensuring continuous evolution and fair evaluation."
                            }
                        ].map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                                <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full font-semibold text-sm">
                                    {index + 1}
                                </span>
                                <div>
                                    <strong className="text-gray-900 text-sm block mb-0.5">{item.title}:</strong>
                                    <span className="text-gray-700 text-sm">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />
                    <p className="text-base text-gray-700 leading-relaxed mb-4">
                        Currently, we release a <strong className="text-purple-600">LiveSQLBench-Base-Lite</strong>, featuring 18 end-user level databases with 270 tasks, HKB-JSON and the JSON operation in SQL for trial. 
                    </p>
                </div>
                
                <p className="text-base text-gray-700 leading-relaxed italic border-l-4 border-blue-500 pl-4 py-1">
                    <strong className="text-blue-600">LiveSQLBench</strong>'s updating databases, tasks, and HKB support <a href="https://bird-interact.github.io" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 hover:underline">BIRD-Interact</a>'s conversational and agentic evaluation. <strong className="text-blue-600">BIRD-Interact</strong> evaluates LLMs' text-to-SQL ability in dynamic interactive settings with database and user simulation.
                </p>
            </div>
        </div>
    );
}

export default Introduction;