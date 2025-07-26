"use client"

import { useTheme } from "@/contexts/providers/theme-context"
import { Bed, Bath, Square, MapPin, Calendar, Home, Flame, Users, Waves } from "lucide-react"

interface PropertyInfoProps {
  mlsNumber: string
}

export function PropertyInfo({ mlsNumber }: PropertyInfoProps) {
  const { theme } = useTheme()

  // Updated property data for MLS: 25000227 with all features
  const propertyData = {
    address: "105 Beauchamp Lane",
    city: "Lafayette",
    state: "LA",
    zipCode: "70506",
    price: "$440,000",
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 2257,
    stories: 1,
    lotSize: "0.17 acres",
    lotSqft: "7,405 sqft",
    yearBuilt: 2024,
    propertyType: "Single Family Home",
    status: "Sold",
    daysOnMarket: 23,
    garageSpace: "2 Car garage",
    architecturalStyle: "Traditional",
    fireplaces: 1,
    neighborhood: "Beau Savanne",
    hoa: "Yes",
    features: [
      "High Ceilings",
      "Beamed Ceilings",
      "Bookcases",
      "Built-in Features",
      "Computer Nook",
      "Crown Molding",
      "Double Vanity",
      "Dual Closets",
      "Kitchen Island",
      "Multi-Head Shower",
      "Separate Shower",
      "Special Bath",
      "Standalone Tub",
      "Varied Ceiling Heights",
      "Vaulted Ceiling(s)",
      "Wet Bar",
      "Marble Counters",
    ],
    flooring: ["Marble", "Tile", "Wood"],
    windows: ["Double Pane Windows"],
    exteriorFeatures: ["Covered Patio", "Landscaped Yard", "Sprinkler System", "Fenced Backyard"],
    communityFeatures: ["Clubhouse", "Pool", "Playground"],
    description:
      "The sight-lines from every doorway reveals something beautiful to look at, from coffered ceilings to crystal encrusted light fixtures. To quote from the 2024 Love Our Schools Home Giveaway '...was made possible through the generosity of Manuel Builders with the donation of the home construction and Southern Lifestyle Development with the donation of the lot in Beau Savanne...This home is valued at $525,000 is 2,257 square feet with three bedrooms and two and a half bathrooms and a dedicated study' with floor to ceiling bookshelves.",
  }

  const getThemeStyles = () => {
    switch (theme) {
      case "Pixel":
        return {
          container: "p-2 font-mono text-xs",
          header: "bg-gray-200 border-2 border-black p-2 mb-2 font-bold",
          section: "bg-white border-2 border-gray-400 p-2 mb-2",
          sectionTitle: "font-bold text-black mb-1 border-b border-gray-400 pb-1",
          label: "font-bold text-black",
          value: "text-gray-800",
          grid: "grid grid-cols-2 gap-2",
          icon: "w-3 h-3 inline mr-1",
          price: "text-lg font-bold text-green-800",
          status: "bg-green-200 border border-black px-2 py-1 text-xs font-bold inline-block",
          featureList: "grid grid-cols-1 gap-1",
          featureItem: "text-gray-800 text-xs",
          badge: "bg-blue-200 border border-black px-1 py-0.5 text-xs inline-block mr-1 mb-1",
        }
      case "3D":
        return {
          container: "p-4 text-sm",
          header:
            "bg-gradient-to-b from-blue-100 to-blue-200 border border-gray-300 rounded p-3 mb-3 font-semibold shadow-sm",
          section: "bg-white border border-gray-200 rounded-lg p-3 mb-3 shadow-sm",
          sectionTitle: "font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1",
          label: "font-semibold text-gray-700",
          value: "text-gray-600",
          grid: "grid grid-cols-1 sm:grid-cols-2 gap-3",
          icon: "w-4 h-4 inline mr-2 text-blue-600",
          price: "text-xl font-bold text-green-600",
          status:
            "bg-green-100 border border-green-300 rounded px-3 py-1 text-sm font-medium text-green-800 inline-block",
          featureList: "grid grid-cols-1 sm:grid-cols-2 gap-1",
          featureItem: "text-gray-600 text-sm",
          badge: "bg-blue-100 border border-blue-300 rounded px-2 py-1 text-xs text-blue-800 inline-block mr-2 mb-1",
        }
      case "3D Rounded":
        return {
          container: "p-6 text-sm",
          header:
            "bg-gradient-to-r from-slate-50 to-slate-100 border border-slate-200 rounded-xl p-4 mb-4 font-medium shadow-sm",
          section: "bg-white border border-slate-200 rounded-2xl p-4 mb-4 shadow-sm",
          sectionTitle: "font-medium text-slate-800 mb-3 border-b border-slate-200 pb-2",
          label: "font-medium text-slate-700",
          value: "text-slate-600",
          grid: "grid grid-cols-1 sm:grid-cols-2 gap-4",
          icon: "w-4 h-4 inline mr-2 text-slate-500",
          price: "text-2xl font-semibold text-emerald-600",
          status:
            "bg-emerald-50 border border-emerald-200 rounded-full px-4 py-2 text-sm font-medium text-emerald-700 inline-block",
          featureList: "grid grid-cols-1 sm:grid-cols-2 gap-2",
          featureItem: "text-slate-600 text-sm",
          badge:
            "bg-slate-100 border border-slate-300 rounded-full px-3 py-1 text-xs text-slate-700 inline-block mr-2 mb-2",
        }
      default:
        return {
          container: "p-4 text-sm",
          header: "bg-gray-100 border border-gray-300 p-3 mb-3 font-semibold",
          section: "bg-white border border-gray-200 p-3 mb-3",
          sectionTitle: "font-semibold text-gray-800 mb-2 border-b border-gray-200 pb-1",
          label: "font-semibold text-gray-700",
          value: "text-gray-600",
          grid: "grid grid-cols-2 gap-3",
          icon: "w-4 h-4 inline mr-2",
          price: "text-xl font-bold text-green-600",
          status: "bg-green-100 border border-green-300 px-3 py-1 text-sm font-medium text-green-800 inline-block",
          featureList: "grid grid-cols-2 gap-1",
          featureItem: "text-gray-600 text-sm",
          badge: "bg-gray-100 border border-gray-300 px-2 py-1 text-xs text-gray-700 inline-block mr-2 mb-1",
        }
    }
  }

  const styles = getThemeStyles()

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>Property Information</div>

      {/* Basic Info */}
      <div className={styles.section}>
        <div className="mb-3">
          <div className={styles.price}>{propertyData.price}</div>
          <div className={`${styles.value} mt-1`}>
            <MapPin className={styles.icon} />
            {propertyData.address}, {propertyData.city}, {propertyData.state} {propertyData.zipCode}
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className={styles.status}>{propertyData.status}</span>
          <span className={styles.value}>MLS: {mlsNumber}</span>
        </div>
      </div>

      {/* Property Details */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Property Details</div>
        <div className={styles.grid}>
          <div>
            <span className={styles.label}>
              <Bed className={styles.icon} />
              Bedrooms:
            </span>
            <div className={styles.value}>{propertyData.bedrooms}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Bath className={styles.icon} />
              Bathrooms:
            </span>
            <div className={styles.value}>{propertyData.bathrooms}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Square className={styles.icon} />
              Square Feet:
            </span>
            <div className={styles.value}>{propertyData.sqft.toLocaleString()}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Calendar className={styles.icon} />
              Year Built:
            </span>
            <div className={styles.value}>{propertyData.yearBuilt}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Home className={styles.icon} />
              Style:
            </span>
            <div className={styles.value}>{propertyData.architecturalStyle}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Flame className={styles.icon} />
              Fireplaces:
            </span>
            <div className={styles.value}>{propertyData.fireplaces}</div>
          </div>
        </div>
      </div>

      {/* Interior Features */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Interior Features</div>
        <div className={styles.featureList}>
          {propertyData.features.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              • {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Flooring & Windows */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Flooring & Windows</div>
        <div className="mb-3">
          <span className={styles.label}>Flooring:</span>
          <div className="mt-1">
            {propertyData.flooring.map((floor, index) => (
              <span key={index} className={styles.badge}>
                {floor}
              </span>
            ))}
          </div>
        </div>
        <div>
          <span className={styles.label}>Windows:</span>
          <div className="mt-1">
            {propertyData.windows.map((window, index) => (
              <span key={index} className={styles.badge}>
                {window}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Exterior Features */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Exterior Features</div>
        <div className={styles.featureList}>
          {propertyData.exteriorFeatures.map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              • {feature}
            </div>
          ))}
        </div>
      </div>

      {/* Community & Neighborhood */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Community & Neighborhood</div>
        <div className={styles.grid}>
          <div>
            <span className={styles.label}>Neighborhood:</span>
            <div className={styles.value}>{propertyData.neighborhood}</div>
          </div>
          <div>
            <span className={styles.label}>
              <Users className={styles.icon} />
              HOA:
            </span>
            <div className={styles.value}>{propertyData.hoa}</div>
          </div>
        </div>
        <div className="mt-3">
          <span className={styles.label}>Community Features:</span>
          <div className="mt-1">
            {propertyData.communityFeatures.map((feature, index) => (
              <span key={index} className={styles.badge}>
                <Waves className="w-3 h-3 inline mr-1" />
                {feature}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Additional Information</div>
        <div className={styles.grid}>
          <div>
            <span className={styles.label}>Property Type:</span>
            <div className={styles.value}>{propertyData.propertyType}</div>
          </div>
          <div>
            <span className={styles.label}>Lot Size:</span>
            <div className={styles.value}>{propertyData.lotSize}</div>
          </div>
          <div>
            <span className={styles.label}>Days on Market:</span>
            <div className={styles.value}>{propertyData.daysOnMarket}</div>
          </div>
          <div>
            <span className={styles.label}>Garage:</span>
            <div className={styles.value}>{propertyData.garageSpace}</div>
          </div>
        </div>
      </div>

      {/* Description */}
      <div className={styles.section}>
        <div className={styles.sectionTitle}>Description</div>
        <div className={`${styles.value} mt-2 leading-relaxed`}>{propertyData.description}</div>
      </div>
    </div>
  )
}
