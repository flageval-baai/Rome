import Image from 'next/image';
import { title } from 'process';

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
                        {/* <strong className="text-blue-600">LiveSQLBench (BIRD-SQL Pro v0.5)</strong>  */}
                        We conduct a <strong className="text-blue-600">moderate-scale contamination-free</strong> (hopefully) evaluation of current LRMs with some preliminary findings.
                        We also release <strong className="text-blue-600">ROME</strong>, our evaluation benchmark for vision language models intended to test reasoning from visual clues. To highlight a few:
                        {/* We are actively expanding in two dimensions: (1) increasing the number of databases and tasks to 600+ tasks, and (2) creating <strong className="text-indigo-600">Large Versions (Industrial Level)</strong> of each database, featuring 40+ tables and 800+ columns, significantly expanding the complexity and scale. */}
                    </p>

                    <ul className="space-y-2">
                        {[
                            {
                                title: "Live Databases",
                                desc: "With a few more thousands of thinking tokens, LRMs consistently show superior performance than their non-thinking counterparts in solving challenging problems or puzzles."
                            },
                            {
                                title: "Live User Queries and SQL",
                                desc: "LRMs achieving high metrics on previous benchmarks are also showing within-task generalization, thus benchmark saturation should not always be attributed to contamination or memorization."
                            },
                            {
                                title: "Contextual Reasoning (HKB)",
                                desc: "There exists consistent degradation in multi-turn settings for LRMs against their non-thinking counterparts, even when LRMs are showing superior or on-par metrics on single-turn instructions."
                            },
                            {
                                title: "The First Full SQL Spectrum",
                                desc: "Current open-weight LRMs may tend to show more vulnerability against harmful content prompts or jailbreaking, implying necessity of careful deployment."
                            },
                            {
                                title: "Automated Evaluation",
                                desc: "Current-generation text-based inference-time scaling has not yet brought notable gains on visual reasoning for most VLMs."
                            },
                            {
                                title: "Truly Live & Hidden Test",
                                desc: "Performance varies too much for generally difficult subsets which implies huge difficulty in conducting statistically reliable evaluation at moderate cost."
                            },
                            {
                                title: "The First Full SQL Spectrum",
                                desc: "Many top-tier LRMs may pretend to conduct tool use or web search even when they do not have real access, which leaves question on reliability. We appeal for more transparency in revealing the reasoning details to enable more awareness during usage, especially multimodal contents."
                            },
                            {
                                title: "The First Full SQL Spectrum",
                                desc: "Signals of misaligned thinking and answers: models are optimized to be stronger but also more difficult to monitor or to interpret, with inconsistency between thinking and answers being non-trivially prevalent for many LRMs we investigated."
                            },
                            {
                                title: "The First Full SQL Spectrum",
                                desc: "Different model developers seem to prioritize things differently: On visual questions (our ROME benchmark), Gemini 2.5 Pro tops in overall accuracy, o4-mini and GPT-5 strike a better balance in performance and token consumption, while Claude Sonnet 4 is showing the best controlled thinking behaviors."
                            }
                        ].map((item, index) => (
                            <li key={index} className="group flex items-start space-x-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 px-2">
                                <span className="flex-shrink-0 w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-1.5 shadow-sm group-hover:shadow-md group-hover:scale-110 transition-all duration-200"></span>
                                <div className="flex-1">
                                    {/* <strong className="text-gray-900 text-sm block mb-0.5">{item.title}:</strong> */}
                                    <span className="text-gray-700 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-200">{item.desc}</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <br />

                    {/* Results Overview - Embedded Image */}
                    <div className="my-8 -mx-5">
                        <div className="relative w-full h-96 md:h-128 lg:h-160 rounded-lg overflow-hidden border border-gray-200 bg-white">
                            <Image
                                src="/romev_overall.png"
                                alt="LiveSQLBench Overall Performance Results"
                                fill
                                className="object-contain p-2"
                                sizes="(max-width: 1024px) 100vw, 100vw"
                            />
                        </div>
                    </div>
                    <p className="text-base text-gray-700 leading-relaxed mb-6">
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