import Image from 'next/image'
import Link from 'next/link'
import { getBasePath } from '@/utils/fileUtils'

const LatestNews = () => {
  return (
    <div className="mb-8">
      {/* Latest News */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-bold flex-shrink-0">News</h2>
        <div className="h-0.5 flex-grow bg-gray-200"></div>
      </div>
      <div className="font-medium">
      <div className="grid" style={{ gridTemplateColumns: "auto auto 1fr", alignItems: "start" }}>
          {/* Logo with adjustable vertical position */}
          <div className="relative" style={{ width: "40px", height: "40px" }}>
            <div className="absolute" style={{ top: "-7px" }}>
              <Image
                src={`${getBasePath()}/live_button.png`}
                alt="livesqlbench"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
          </div>
          
          {/* Date with adjustable vertical position */}
          <div className="relative px-2" style={{ top: "0px" }}>
            <span className="text-gray-500 font-bold whitespace-nowrap">[07/28/2025]:</span>
          </div>
        
          {/* Text with adjustable vertical position */}
          <div className="relative" style={{ top: "0px" }}>
            <span className="text-gray-700">
            The first release of <b>ROME</b> has been released! It contains <b>automatically verifiable textual and visual questions</b>. Download it and test your reasoning models in a containmation-free way! Please check the <a href="https://github.com/bird-bench/mini_dev/tree/main/live_sql_bench_sqlite" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">GitHub repository</a> and <a href="https://huggingface.co/datasets/birdsql/livesqlbench-base-lite-sqlite" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">dataset</a> for more details. 
            </span>
          </div>
        </div>
        {/* <div className="grid" style={{ gridTemplateColumns: "auto auto 1fr", alignItems: "start" }}>
          <div className="relative" style={{ width: "40px", height: "40px" }}>
            <div className="absolute" style={{ top: "-7px" }}>
              <Image
                src={`${getBasePath()}/live_button.png`}
                alt="livesqlbench"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </div>
          </div>
          
          <div className="relative px-2" style={{ top: "0px" }}>
            <span className="text-gray-500 font-bold whitespace-nowrap">[05/30/2025]:</span>
          </div>
        
          <div className="relative" style={{ top: "0px" }}>
            <span className="text-gray-700">
              The first release of LiveSQLBench has been released! It contains our initial version: LiveSQLBench-Base-Lite. Download it and test your text-to-SQL LLMs or agents in a containmation-free way!
            </span>
          </div>
        </div> */}

      </div>
    </div>
  )
}

export default LatestNews
