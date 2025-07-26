"use client"

import dynamic from "next/dynamic"
import { ThemeProvider } from "../contexts/providers/theme-context"

// Dynamic imports for better code splitting
const FloatingDockDemo = dynamic(
  () => import("../components/features/floating-dock/floating-dock-demo"),
  { 
    loading: () => <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 h-16 w-48 bg-gray-200/50 rounded-2xl animate-pulse" />
  }
)

const ThemeDropdown = dynamic(
  () => import("../components/layout/theme-dropdown").then(mod => ({ default: mod.ThemeDropdown })),
  { loading: () => <div className="w-8 h-8 bg-gray-200 rounded animate-pulse" /> }
)

export default function Page() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white">
        <ThemeDropdown />
        <FloatingDockDemo />
      </div>
    </ThemeProvider>
  )
}
