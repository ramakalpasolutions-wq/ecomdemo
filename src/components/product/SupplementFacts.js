export default function SupplementFacts({ servingSize, servingsPerContainer, facts = [] }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-black">
      <h3 className="text-xl font-bold text-center mb-4 border-b-4 border-black pb-2">
        Supplement Facts
      </h3>
      
      <div className="border-b border-black py-2">
        <div className="flex justify-between">
          <span className="font-semibold">Serving Size</span>
          <span>{servingSize}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold">Servings Per Container</span>
          <span>{servingsPerContainer}</span>
        </div>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex justify-between font-bold border-b-2 border-black pb-2">
          <span>Amount Per Serving</span>
          <span>% Daily Value*</span>
        </div>
        {facts.map((fact, index) => (
          <div key={index} className="flex justify-between py-2 border-b border-gray-300">
            <span className="font-semibold">{fact.label}</span>
            <div className="text-right">
              <span className="font-bold mr-4">{fact.amount}</span>
              <span>{fact.dailyValue}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="text-xs text-gray-600 mt-4">
        * Percent Daily Values are based on a 2,000 calorie diet.
      </p>
    </div>
  )
}
