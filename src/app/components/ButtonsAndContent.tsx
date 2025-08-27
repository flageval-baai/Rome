import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

// const ButtonsAndContent = () => {
//   const [isOrganizingTeamOpen, setIsOrganizingTeamOpen] = useState(false)
//   const [isContributorsOpen, setIsContributorsOpen] = useState(false)

//   return (
//     <div className="space-y-4 mb-8">
//       {/* Buttons */}
//       <div className="flex justify-center gap-4">
//         <button
//           onClick={() => setIsOrganizingTeamOpen(!isOrganizingTeamOpen)}
//           className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded hover:bg-gray-50"
//         >
//           Organizing Team
//           <ChevronDown
//             className={`w-4 h-4 transform ${isOrganizingTeamOpen ? 'rotate-180' : ''}`}
//           />
//         </button>
//       </div>

//       {/* Organizing Team Content */}
//       {isOrganizingTeamOpen && (
//         <div className="text-center text-gray-700 font-medium">
//           BIRD Team, HKU
//           <br />
//           Google Cloud
//         </div>
//       )}

//       {/* Contributors Content */}
//       {isContributorsOpen && (
//         <div className="border border-gray-200 rounded p-4">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-lg">Authors</h3>
//             <a
//               href="#institutions"
//               className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
//             >
//               View by Institution
//             </a>
//           </div>

//           <div className="space-y-4">
//             <div>
//               <h4 className="font-semibold mb-2">Lead Authors</h4>
//               <p>BIRD Team, HKU</p>
//               <p>Google Cloud</p>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }
const ButtonsAndContent = () => {
  // Remove state and button, always show team info
  return (
    <div className="space-y-4 mb-8">
      {/* Organizing Team Content (always visible) */}
      <div className="text-center text-gray-700 font-medium">
        <a href="https://bird-bench.github.io" className="text-blue-600 hover:text-blue-800 hover:underline">BIRD Team, HKU</a>
        <br />
        <a href="https://cloud.google.com/" className="text-blue-600 hover:text-blue-800 hover:underline">Google Cloud</a>
      </div>
    </div>
  )
}
export default ButtonsAndContent