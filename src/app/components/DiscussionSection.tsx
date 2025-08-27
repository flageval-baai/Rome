import React from 'react';

const DiscussionSection = () => {
  const discussions = [
    {
      title: "Current Model Performance",
      content: "LiveSQLBench-Base-Lite evaluates LLMs on PostgreSQL, the most widely used and feature-rich open-source database system. Our benchmark provides Docker-based evaluation environments for easy deployment and reproducibility. We conduct separate evaluations across three categories: (1) Model Base - direct SQL generation without external tools, and (2) Agent - models with external tool orchestration. Initial results on Model Base reveal significant challenges, with the best-performing model (o3-mini) achieving a 47.78% success rate. The performance gap between models is notable, with a cluster of top models (o3-mini, GPT-4.1, o4-mini, o1-preview, and Gemini 2.5 Flash with thinking) showing capabilities in the 37-45% range, while others still struggle to consistently generate correct SQL queries. This suggests that while there's an improvement at the top end, complex SQL generation remains a difficult task for most current LLMs. The introduction of reasoning-specific models and newer architectures like OpenAI's 'o' series and Google's Gemini 2.5 shows promise, but highlights the ongoing need for advancements in this domain."
    },
    {
      title: "GPT-5 Early Observations",
      content: "GPT-5 just arrived and shows distinct behavior on LiveSQLBench. It tends to generate long SQL, averaging 373.2 tokens per query (longest among all models; measured with tiktoken, cl100k_base). It also achieves the highest accuracy on DQL questions (category \"Query\"), indicating strong capabilities in data retrieval and BI analysis tasks."
    }
  ];

  return (
    <section className="w-full mb-12">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-4">
          Discussion
        </h2>
        
        <div className="h-0.5 w-16 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
        
        <div className="space-y-6">
          {discussions.map((section, index) => (
            <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center">
                <span className="w-6 h-6 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full text-sm mr-2">
                  {index + 1}
                </span>
                {section.title}
              </h3>
              <p className="text-base leading-relaxed text-gray-700">
                {section.content}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscussionSection;