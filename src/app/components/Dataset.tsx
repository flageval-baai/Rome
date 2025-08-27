import React from 'react';
import Image from 'next/image';

const Dataset = () => {
  return (
    <section className="mb-12 w-full">
      <div className="mx-auto max-w-3xl">
        <h2 className="mb-4 text-center text-2xl font-bold">Dataset</h2>
        <div className="mx-auto mb-6 h-0.5 w-16 bg-gradient-to-r from-gray-300 to-gray-100"></div>
        <p className="text-base leading-relaxed text-gray-700">
          <span className="text-gray-800">Humanity's Last Exam (HLE)</span> is a global collaborative effort, with questions from nearly <span className="text-gray-900">1,000</span> subject expert contributors affiliated with over <span className="text-gray-900">500</span> institutions across <span className="text-gray-900">50</span> countries – comprised mostly of professors, researchers, and graduate degree holders.
        </p>
        <div className="mt-8 sm:-mx-[20%]">
          <div className="mx-auto max-w-7xl rounded-md bg-white p-3 text-sm shadow-sm">
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-base font-medium">Examples 1-2/8</h3>
              <div className="flex space-x-1">
                <button className="border border-black rounded-full p-1 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-left h-4 w-4">
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </button>
                <button className="border border-black rounded-full p-1 hover:bg-gray-100">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right h-4 w-4">
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                <div className="flex flex-col h-full space-y-4 rounded-lg border p-4 shadow-sm">
                  <div className="flex flex-col h-full">
                    <div className="rounded-md p-2 bg-[#008B8B]/10 text-[#008B8B] border-[#008B8B]/20 mb-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-3 w-3">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span className="text-sm font-medium">Classics</span>
                      </div>
                    </div>
                    <h4 className="text-black-700 mt-2 font-medium sm:text-base text-sm">Question:</h4>
                    <div className="flex-1 flex sm:text-base text-sm flex-col">
                      <div>
                        <Image src="/classics.png" alt="Question image" className="mb-2 mt-2 h-auto max-h-40 max-w-full rounded-md" width={400} height={160} />
                        <p className="whitespace-pre-wrap text-gray-600">Here is a representation of a Roman inscription, originally found on a tombstone. Provide a translation for the Palmyrene script. <br/>A transliteration of the text is provided: RGYNᵓ BT ḤRY BR ᶜTᵓ ḤBL </p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="flex items-center gap-1 leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-3 w-3">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          Henry T
                        </p>
                        <p className="flex items-center gap-1 leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-3 w-3">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                            <path d="M10 6h4"></path>
                            <path d="M10 10h4"></path>
                            <path d="M10 14h4"></path>
                            <path d="M10 18h4"></path>
                          </svg>
                          Merton College, Oxford
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col h-full space-y-4 rounded-lg border p-4 shadow-sm">
                  <div className="flex flex-col h-full">
                    <div className="rounded-md p-2 bg-[#008B8B]/10 text-[#008B8B] border-[#008B8B]/20 mb-2 text-xs">
                      <div className="flex items-center space-x-1">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-book-open h-3 w-3">
                          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                        </svg>
                        <span className="text-sm font-medium">Ecology</span>
                      </div>
                    </div>
                    <h4 className="text-black-700 mt-2 font-medium sm:text-base text-sm">Question:</h4>
                    <div className="flex-1 flex sm:text-base text-sm flex-col">
                      <div>
                        <p className="whitespace-pre-wrap text-gray-600">Hummingbirds within Apodiformes uniquely have a bilaterally paired oval bone, a sesamoid embedded in the caudolateral portion of the expanded, cruciate aponeurosis of insertion of m. depressor caudae. How many paired tendons are supported by this sesamoid bone? Answer with a number.</p>
                      </div>
                    </div>
                    <div className="mt-4">
                      <div className="text-xs text-gray-500 space-y-1">
                        <p className="flex items-center gap-1 leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-user h-3 w-3">
                            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                          Edward V
                        </p>
                        <p className="flex items-center gap-1 leading-none">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-3 w-3">
                            <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
                            <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
                            <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
                            <path d="M10 6h4"></path>
                            <path d="M10 10h4"></path>
                            <path d="M10 14h4"></path>
                            <path d="M10 18h4"></path>
                          </svg>
                          Massachusetts Institute of Technology
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <p className="mt-4 text-base text-center text-gray-700 max-w-2xl mx-auto">Samples of the diverse and challenging questions submitted to Humanity's Last Exam.</p>
      </div>
    </section>
  );
};

export default Dataset;
