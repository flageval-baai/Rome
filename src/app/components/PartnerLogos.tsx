import Image from 'next/image'
import { getBasePath } from '@/utils/fileUtils'

const PartnerLogos = () => {
  return (
    <div className="flex justify-center items-center mb-8">
      <div className="relative h-10 w-24">
        <Image
          src={`${getBasePath()}/bird_fig_main.png`}
          alt="BIRD Team logo"
          fill
          className="object-contain"
        />
      </div>
      <span className="text-gray-500">&</span>
      <div className="relative h-10 w-24">
        <Image
          src={`${getBasePath()}/google-cloud-logo.png`}
          alt="Google Cloud logo"
          fill
          className="object-contain"
        />
      </div>
    </div>
  )
}

export default PartnerLogos