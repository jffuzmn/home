import FloatingDockDemo from "../components/features/floating-dock/floating-dock-demo"
import { ThemeDropdown } from "../components/layout/theme-dropdown"
import { ThemeProvider } from "../contexts/providers/theme-context"

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
