export default function LabResults({ certifications = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <h3 className="text-xl font-bold text-[#2d3e5f] mb-4">
        Lab Results & Certifications
      </h3>
      <div className="space-y-3">
        {certifications.map((cert, index) => (
          <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold">✓</span>
            </div>
            <span className="font-semibold text-green-800">{cert}</span>
          </div>
        ))}
      </div>
      <button className="mt-4 text-[#d87f3f] font-semibold hover:underline">
        View Lab Reports →
      </button>
    </div>
  )
}
