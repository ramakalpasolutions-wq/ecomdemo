'use client'
import { useState } from 'react'

export default function GoalFilter({ onFilterChange }) {
  const [selectedGoals, setSelectedGoals] = useState([])

  const goals = [
    'Energy Boost',
    'Better Sleep',
    'Immunity',
    'Stress Relief',
    'Weight Loss',
    'Digestion',
    'Heart Health',
    'Brain Function'
  ]

  const toggleGoal = (goal) => {
    const newGoals = selectedGoals.includes(goal)
      ? selectedGoals.filter(g => g !== goal)
      : [...selectedGoals, goal]
    
    setSelectedGoals(newGoals)
    onFilterChange(newGoals)
  }

  return (
    <div>
      <h3 className="font-semibold text-[#2d3e5f] mb-3">Health Goals</h3>
      <div className="space-y-2">
        {goals.map(goal => (
          <label key={goal} className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedGoals.includes(goal)}
              onChange={() => toggleGoal(goal)}
              className="w-4 h-4 text-[#d87f3f] border-gray-300 rounded focus:ring-[#d87f3f]"
            />
            <span className="text-sm text-[#5a4a3a]">{goal}</span>
          </label>
        ))}
      </div>
    </div>
  )
}
