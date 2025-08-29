import Image from 'next/image'
import { getBasePath } from '@/utils/fileUtils'

const LogoAndTitle = () => {
  return (
    <div className="text-center mt-4 mb-4">
      {/* Combined logo and title with minimal spacing */}
      <div className="flex flex-col items-center justify-center">
        {/* Logo with reduced height */}
        {/* <div className="w-80 h-56 relative">
          <Image
            src={`${getBasePath()}/livesqlbench.png`}
            alt="LiveSQLBench logo showing a cloud with SQL text inside"
            fill
            className="object-contain object-bottom"
            priority
          />
        </div> */}
        
        {/* Title positioned with negative margin to move it up */}
        <div className="flex items-center justify-center gap-20 mt-4">
          <h1 className="text-5xl font-extrabold leading-none bg-gradient-to-r from-[#F95454] to-[#0D92F4] bg-clip-text text-transparent">
            LRM-Eval
          </h1>
          <div className="relative h-12 w-36 md:h-14 md:w-44">
            <Image
              src={`${getBasePath()}/FlagEval-logo.png`}
              alt="FlagEval logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mt-3 mb-3 leading-tight">
        A Preliminary Contamination-Free Evaluation of Reasoning Models
        </h2>
      </div>
    </div>
  )
}

export default LogoAndTitle
