"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useTheme } from "@/contexts/providers/theme-context"

export function ThemeDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  const themes = ["Pixel", "3D", "3D Rounded"] as const

  return (
    <div className="fixed top-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-200/50 rounded-lg shadow-sm hover:shadow-md transition-shadow"
        >
          <span className="text-sm font-medium text-gray-800">{theme}</span>
          <ChevronDown className="h-4 w-4 text-gray-600" />
        </button>

        {isOpen && (
          <div className="absolute top-full mt-1 right-0 w-32 bg-gray-200/50 rounded-lg shadow-lg py-1">
            {themes.map((themeOption) => (
              <button
                key={themeOption}
                onClick={() => {
                  setTheme(themeOption)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-300/50 transition-colors ${
                  theme === themeOption ? "bg-gray-300/50 text-gray-800" : "text-gray-700"
                }`}
              >
                {themeOption}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
