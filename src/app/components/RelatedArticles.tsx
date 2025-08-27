import React from 'react';

const RelatedArticles = () => {
  const articles = [
    {
      source: "NeurIPS 2023",
      domain: "www.nips.cc",
      title: "Can LLM Already Serve as A Database Interface? A Big Bench for Large-Scale Database Grounded Text-to-SQLs",
      description: "This paper introduces BIRD, a Big benchmark for large-scale database grounded in text-to-SQL tasks, containing 12,751 pairs of text-to-SQL data and 95 databases with a total size of 33.4 GB, spanning 37 professional domains.",
      url: "https://proceedings.neurips.cc/paper_files/paper/2023/hash/83fc8fab1710363050bbd1d4b8cc0021-Abstract-Datasets_and_Benchmarks.html"
    }
  ];

  return (
    <section className="w-full mb-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-3">
          Related Articles
        </h2>
        
        <div className="h-0.5 w-16 mx-auto mb-4 bg-gradient-to-r from-gray-300 to-gray-100" />
        
        <div className="space-y-2">
          {articles.map((article, index) => (
            <a
              key={index}
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="block transition-colors"
            >
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:bg-gray-50">
                <div className="flex flex-col space-y-1.5 p-6 py-2 px-3">
                  <div className="flex items-center">
                    <div className="flex items-center">
                      <img
                        src={`https://www.google.com/s2/favicons?domain=${article.domain}&sz=16`}
                        alt={`${article.source} icon`}
                        className="w-4 h-4 mr-1"
                      />
                      <p className="text-xs text-gray-500">{article.source}</p>
                    </div>
                    <span className="text-gray-300 mx-1">|</span>
                    <h3 className="font-semibold tracking-tight text-sm">
                      {article.title}
                    </h3>
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {article.description}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedArticles;