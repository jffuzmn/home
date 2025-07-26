"use client"

import { useTheme } from "@/contexts/providers/theme-context"
import { Home, Zap, Flame, Trash2, Droplets, Wifi, Users, ExternalLink } from "lucide-react"

type BillProvidersProps = {}

export function BillProviders({}: BillProvidersProps) {
  const { theme } = useTheme()

  const billProviders = [
    {
      id: "mortgage",
      name: "United Wholesale Mortgage",
      type: "Mortgage",
      website: "uwm.com",
      icon: Home,
    },
    {
      id: "electricity",
      name: "SLEMCO",
      type: "Electricity",
      website: "slemco.com",
      icon: Zap,
    },
    {
      id: "gas",
      name: "Delta Utilities",
      type: "Gas",
      website: "deltautilities.com",
      icon: Flame,
    },
    {
      id: "trash",
      name: "Acadiana Waste Service",
      type: "Trash",
      website: "acadianawaste.com",
      icon: Trash2,
    },
    {
      id: "utilities",
      name: "Lafayette Utilities System",
      type: "Utilities",
      website: "lus.org",
      icon: Droplets,
    },
    {
      id: "internet",
      name: "Cox",
      type: "Internet",
      website: "cox.com",
      icon: Wifi,
    },
    {
      id: "hoa",
      name: "Vantaca Home",
      type: "HOA",
      website: "vantaca.com",
      icon: Users,
    },
  ]

  const getThemeStyles = () => {
    switch (theme) {
      case "Pixel":
        return {
          container: "p-2 font-mono text-xs",
          header: "bg-gray-200 border-2 border-black p-2 mb-2 font-bold",
          providerCard: "bg-white border-2 border-gray-400 p-2 mb-2 flex items-center gap-2",
          iconContainer: "bg-gray-200 border-2 border-black p-2 flex-shrink-0",
          icon: "w-4 h-4 text-black",
          providerInfo: "flex-1 min-w-0",
          providerName: "font-bold text-black text-xs truncate",
          providerType: "text-gray-600 text-xs",
          websiteLink: "text-blue-800 text-xs hover:underline font-bold flex items-center gap-1",
          externalIcon: "w-3 h-3",
        }
      case "3D":
        return {
          container: "p-4 text-sm",
          header:
            "bg-gradient-to-b from-blue-100 to-blue-200 border border-gray-300 rounded p-3 mb-3 font-semibold shadow-sm",
          providerCard:
            "bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm flex items-center gap-3 hover:shadow-md transition-shadow",
          iconContainer: "bg-gradient-to-b from-gray-100 to-gray-200 border border-gray-300 rounded p-2 flex-shrink-0",
          icon: "w-5 h-5 text-gray-700",
          providerInfo: "flex-1 min-w-0",
          providerName: "font-semibold text-gray-800 text-sm truncate",
          providerType: "text-gray-500 text-xs",
          websiteLink: "text-blue-600 text-sm hover:text-blue-800 hover:underline flex items-center gap-1",
          externalIcon: "w-3 h-3",
        }
      case "3D Rounded":
        return {
          container: "p-6 text-sm",
          header:
            "bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 mb-4 font-medium shadow-sm",
          providerCard:
            "bg-white border border-slate-200 rounded-2xl p-4 mb-4 shadow-sm flex items-center gap-4 hover:shadow-md transition-all hover:border-slate-300",
          iconContainer:
            "bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-3 flex-shrink-0",
          icon: "w-5 h-5 text-slate-600",
          providerInfo: "flex-1 min-w-0",
          providerName: "font-medium text-slate-800 text-sm truncate",
          providerType: "text-slate-500 text-xs",
          websiteLink:
            "text-slate-600 text-sm hover:text-slate-800 hover:underline flex items-center gap-1 transition-colors",
          externalIcon: "w-3 h-3",
        }
      default:
        return {
          container: "p-4 text-sm",
          header: "bg-gray-100 border border-gray-300 p-3 mb-3 font-semibold",
          providerCard: "bg-white border border-gray-200 p-3 mb-3 flex items-center gap-3",
          iconContainer: "bg-gray-100 border border-gray-300 p-2 flex-shrink-0",
          icon: "w-5 h-5 text-gray-700",
          providerInfo: "flex-1 min-w-0",
          providerName: "font-semibold text-gray-800 text-sm truncate",
          providerType: "text-gray-500 text-xs",
          websiteLink: "text-blue-600 text-sm hover:underline flex items-center gap-1",
          externalIcon: "w-3 h-3",
        }
    }
  }

  const styles = getThemeStyles()

  const handleWebsiteClick = (website: string) => {
    const url = website.startsWith("http") ? website : `https://${website}`
    window.open(url, "_blank", "noopener,noreferrer")
  }

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>Bill Providers</div>

      {/* Provider Cards */}
      {billProviders.map((provider) => {
        const IconComponent = provider.icon
        return (
          <div key={provider.id} className={styles.providerCard}>
            {/* Icon Container */}
            <div className={styles.iconContainer}>
              <IconComponent className={styles.icon} />
            </div>

            {/* Provider Information */}
            <div className={styles.providerInfo}>
              <div className={styles.providerName}>{provider.name}</div>
              <div className={styles.providerType}>{provider.type}</div>
              <button onClick={() => handleWebsiteClick(provider.website)} className={styles.websiteLink}>
                {provider.website}
                <ExternalLink className={styles.externalIcon} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
