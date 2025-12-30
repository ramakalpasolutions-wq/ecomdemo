'use client'
import { useState } from 'react'

export default function IngredientFilter({ onFilterChange }) {
  const [selectedIngredients, setSelectedIngredients] = useState([])

  const ingredients = [
    'Ashwagandha',
    'Turmeric',
    'Spirulina',
    'Moringa',
    'Wheatgrass',
    'Chia Seeds',
    'Flax Seeds',
    'Maca Root'
  ]

  const toggleIngredient = (ingredient) => {
    const newIngredients = selectedIngredients.includes(ingredient)
      ? selectedIngredients.filter(i => i !== ingredient)
      : [...selectedIngredients, ingredient]
    
    setSelectedIngredients(newIngredients)
    onFilterChange(newIngredients)
  }

  return (
    <div>
      <h3 className="font-semibold text-[#2d3e5f] mb-3">Key Ingredients</h3>
      <div className="space-y-2">
        {ingredients.map(ingredient => (
          <label key={ingredient} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedIngredients.includes(ingredient)}
              onChange={() => toggleIngredient(ingredient)}
              className="w-4 h-4 text-[#d87f3f] border-gray-300 rounded focus:ring-[#d87f3f]"
            />
            <span className="text-sm text-[#5a4a3a]">{ingredient}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
