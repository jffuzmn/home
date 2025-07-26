"use client"

import { useState } from "react"
import { Upload, Plus, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface Photo {
  id: string
  src: string
  alt: string
  uploadedAt: Date
}

interface PhotosGridProps {
  theme?: "Pixel" | "3D" | "3D Rounded"
}

export function PhotosGrid({ theme = "3D" }: PhotosGridProps) {
  const [photos, setPhotos] = useState<Photo[]>([
    {
      id: "1",
      src: "/placeholder.jpg",
      alt: "Kitchen renovation",
      uploadedAt: new Date("2024-01-15"),
    },
    {
      id: "2",
      src: "/placeholder.jpg",
      alt: "Living room before",
      uploadedAt: new Date("2024-01-16"),
    },
    {
      id: "3",
      src: "/placeholder.jpg",
      alt: "Bathroom tiles",
      uploadedAt: new Date("2024-01-17"),
    },
    {
      id: "4",
      src: "/placeholder.jpg",
      alt: "Exterior paint",
      uploadedAt: new Date("2024-01-18"),
    },
  ])

  const getThemeStyles = () => {
    switch (theme) {
      case "Pixel":
        return {
          container: "bg-gray-200 border-2 border-black",
          header: "bg-blue-600 border-b-2 border-black",
          title: "text-white font-bold font-mono",
          button: "bg-gray-300 hover:bg-gray-700 text-black border-2 border-black font-bold",
          card: "bg-white border-2 border-gray-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          emptyIcon: "bg-gray-300 border-2 border-black",
          deleteButton: "bg-red-600 hover:bg-red-700 border border-black",
        }
      case "3D":
        return {
          container: "bg-gray-50 border border-gray-300 shadow-lg rounded-lg",
          header: "bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 rounded-t-lg",
          title: "text-gray-800 font-semibold",
          button: "bg-blue-500 hover:bg-blue-600 text-white rounded shadow-sm",
          card: "bg-white border border-gray-300 shadow-md rounded-lg",
          emptyIcon: "bg-gray-200 rounded-lg shadow-sm",
          deleteButton: "bg-red-500 hover:bg-red-600 rounded-full shadow-sm",
        }
      case "3D Rounded":
        return {
          container: "bg-gray-50 border border-gray-200 shadow-xl rounded-2xl",
          header: "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 rounded-t-2xl",
          title: "text-gray-700 font-medium",
          button: "bg-blue-400 hover:bg-blue-500 text-white rounded-full shadow-md transition-colors",
          card: "bg-white border border-gray-200 shadow-lg rounded-xl",
          emptyIcon: "bg-gray-100 rounded-2xl shadow-md",
          deleteButton: "bg-red-400 hover:bg-red-500 rounded-full shadow-md transition-colors",
        }
      default:
        return {
          container: "bg-white border border-gray-300 shadow-lg rounded",
          header: "bg-gray-100 border-b border-gray-300",
          title: "text-gray-800 font-medium",
          button: "bg-blue-500 hover:bg-blue-600 text-white rounded",
          card: "bg-white border border-gray-300 shadow-md rounded",
          emptyIcon: "bg-gray-200 rounded",
          deleteButton: "bg-red-500 hover:bg-red-600 rounded-full",
        }
    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    const newPhotos: Photo[] = Array.from(files).map((file, index) => ({
      id: `uploaded-${Date.now()}-${index}`,
      src: URL.createObjectURL(file),
      alt: file.name,
      uploadedAt: new Date(),
    }))

    setPhotos((prev) => [...prev, ...newPhotos])
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
  }

  const styles = getThemeStyles()

  return (
    <div className={`h-full flex flex-col ${styles.container}`}>
      {/* Header with upload button */}
      <div className={`flex items-center justify-between p-3 flex-shrink-0 ${styles.header}`}>
        <h3 className={`text-lg ${styles.title}`}>Property Photos</h3>
        <div className="flex items-center gap-2">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="photo-upload"
          />
          <label htmlFor="photo-upload">
            <Button asChild className={`flex items-center gap-2 ${styles.button}`}>
              <span>
                <Upload className="h-4 w-4" />
                Upload Photos
              </span>
            </Button>
          </label>
        </div>
      </div>

      {/* Photos Grid */}
      <div className="flex-1 px-6 py-4 overflow-auto">
        {photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <div className={`w-16 h-16 ${styles.emptyIcon} flex items-center justify-center mb-4`}>
              <Plus className="h-8 w-8" />
            </div>
            <p className="text-lg font-medium mb-2">No photos yet</p>
            <p className="text-sm">Upload your first photo to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <Card key={photo.id} className={`group relative overflow-hidden ${styles.card}`}>
                <div className="aspect-square relative">
                  <img
                    src={photo.src}
                    alt={photo.alt}
                    className="w-full h-full object-cover"
                    style={{ imageRendering: theme === "Pixel" ? "pixelated" : "auto" }}
                  />
                  {/* Delete button overlay */}
                  <button
                    onClick={() => handleDeletePhoto(photo.id)}
                    className={`absolute top-2 right-2 text-white p-1 opacity-0 group-hover:opacity-100 transition-opacity ${styles.deleteButton}`}
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {photo.alt}
                  </p>
                  <p className="text-xs text-gray-500">
                    {photo.uploadedAt.toLocaleDateString()}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
} 