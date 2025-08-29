"use client";

import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQSection = () => {
  const faqs: FAQItem[] = [
    {
      question: 'Many evaluation attempts already on reasoning models. Why another?',
      answer:
        'We evaluate on new data such that they are almost guaranteed not to have involved during training or development process of most of the evaluated models. Moreover, while existing studies focus on complex tasks that presumably would emphasize the strengths from test-time thinking, we take a slightly more comprehensive look by investigating on more typical areas. Moreover, we also look beyond metrics and attempt at more understanding on the reasoning process of LRMs.'
    },
    {
      question: 'There are also many studies on detailed, almost stepwise behavioral analysis of reasoning. Why another?',
      answer:
        'We target at a macro viewpoint and do qualitative + LLM-assisted analysis, and featuring multiple LRMs beyond open-weight models, including the most recently released GPT-5 series.'
    },
    {
      question: 'How contamination-free is this evaluation?',
      answer:
        'We re-collect or compose new problems such that they either appear on the web later than most of the models were trained or just newly created. That said, we have only tried to avoid sample-level contamination in this work, and have not yet introduced novel, 100\% unseen tasks that can test out-of-distribution skills but require a lot more non-trivial efforts to design.'
    },
    {
      question: 'Why plot consumed tokens instead of prices in the teaser figures?',
      answer:
        'Prices are not static, and we believe that token consumption partially reveals efficiency in reasoning.'
    },
    {
      question: 'How to read our report?',
      answer:
        'If you have very limited time allocated to our report, just check the takeaway messages and the statistics shown in tables or figures as evidence. Caveat: Information lies in the details. We can\'t deliver all messages in the limited number of takeaway boxes.'
    },
    {
      question: 'Anything else to beware?',
      answer:
        'Collecting new data requires massive efforts, so the scale is limited by nature and we draw the error bars. In the meantime, this part of evaluation is only focusing on automatically verifiable prompts, so mind the gap between benchmarks and practice.'
    }
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(prev => (prev === index ? null : index));
  };

  return (
    <section className="w-full mb-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Questions and Answers</h2>
        <div className="h-1 w-20 mx-auto mb-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />

        <div className="space-y-4">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white rounded-xl border-2 border-gray-100 shadow-md overflow-hidden"
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left px-5 py-4 hover:bg-gray-50"
                  aria-expanded={isOpen}
                  onClick={() => toggle(index)}
                >
                  <span className="text-lg font-semibold text-gray-900">{item.question}</span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 text-gray-500" />
                  ) : (
                    <Plus className="h-5 w-5 text-gray-500" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5">
                    <p className="text-base leading-relaxed text-gray-700">{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;


