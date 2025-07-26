"use client"

import React, { useState, useRef } from "react"
import { Upload, X } from "lucide-react"
import { useTheme } from "@/contexts/providers/theme-context"

interface Photo {
  id: string
  src: string
  name: string
  uploadDate: string
}

export function PhotosGrid() {
  const { theme } = useTheme()
  const [photos, setPhotos] = useState<Photo[]>([
    // Sample photos for demonstration
    {
      id: "1",
      src: "/api/placeholder/300/200",
      name: "Sample Photo 1",
      uploadDate: new Date().toLocaleDateString(),
    },
    {
      id: "2", 
      src: "/api/placeholder/300/200",
      name: "Sample Photo 2",
      uploadDate: new Date().toLocaleDateString(),
    },
    {
      id: "3",
      src: "/api/placeholder/300/200", 
      name: "Sample Photo 3",
      uploadDate: new Date().toLocaleDateString(),
    },
  ])
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleUpload = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.type.startsWith("image/")) {
          const reader = new FileReader()
          reader.onload = (e) => {
            const newPhoto: Photo = {
              id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
              src: e.target?.result as string,
              name: file.name,
              uploadDate: new Date().toLocaleDateString(),
            }
            setPhotos((prev) => [...prev, newPhoto])
          }
          reader.readAsDataURL(file)
        }
      })
    }
    // Reset the input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleDeletePhoto = (photoId: string) => {
    setPhotos((prev) => prev.filter((photo) => photo.id !== photoId))
    if (selectedPhoto?.id === photoId) {
      setSelectedPhoto(null)
    }
  }

  const getStyles = () => {
    switch (theme) {
      case "Pixel":
        return {
          container: "bg-white",
          uploadButton: "bg-blue-600 hover:bg-blue-700 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-mono font-bold",
          photoCard: "border-2 border-black bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
          deleteButton: "bg-red-600 hover:bg-red-700 text-white border border-black",
          modal: "bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]",
        }
      case "3D":
        return {
          container: "bg-gray-50",
          uploadButton: "bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-lg",
          photoCard: "border border-gray-300 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow",
          deleteButton: "bg-red-500 hover:bg-red-600 text-white rounded",
          modal: "bg-white rounded-xl shadow-2xl border border-gray-200",
        }
      case "3D Rounded":
        return {
          container: "bg-gradient-to-br from-gray-50 to-white",
          uploadButton: "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-2xl shadow-xl",
          photoCard: "border border-gray-200 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105",
          deleteButton: "bg-red-400 hover:bg-red-500 text-white rounded-full",
          modal: "bg-white rounded-3xl shadow-2xl border border-gray-100 backdrop-blur-sm",
        }
      default:
        return {
          container: "bg-white",
          uploadButton: "bg-blue-500 hover:bg-blue-600 text-white rounded shadow",
          photoCard: "border border-gray-300 bg-gray-50 rounded hover:shadow-md transition-shadow",
          deleteButton: "bg-red-500 hover:bg-red-600 text-white rounded",
          modal: "bg-white rounded-lg shadow-xl border border-gray-300",
        }
    }
  }

  const styles = getStyles()

  return (
    <div className={`h-full p-4 ${styles.container}`}>
      {/* Header with Upload Button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Photos</h2>
        <button
          onClick={handleUpload}
          className={`px-4 py-2 flex items-center gap-2 transition-colors ${styles.uploadButton}`}
        >
          <Upload className="w-4 h-4" />
          Upload Photos
        </button>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Photos Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-auto">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className={`relative group cursor-pointer ${styles.photoCard}`}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="aspect-square overflow-hidden rounded-t-lg">
              <img
                src={photo.src}
                alt={photo.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                style={{ imageRendering: theme === "Pixel" ? "pixelated" : "auto" }}
              />
            </div>
            <div className="p-2">
              <p className="text-sm font-medium text-gray-800 truncate">{photo.name}</p>
              <p className="text-xs text-gray-500">{photo.uploadDate}</p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation()
                handleDeletePhoto(photo.id)
              }}
              className={`absolute top-2 right-2 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity ${styles.deleteButton}`}
            >
              <X className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {photos.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 text-gray-500">
          <Upload className="w-12 h-12 mb-4" />
          <p className="text-lg mb-2">No photos yet</p>
          <p className="text-sm">Click "Upload Photos" to get started</p>
        </div>
      )}

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setSelectedPhoto(null)}>
          <div className={`max-w-4xl max-h-[90vh] p-4 ${styles.modal}`} onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{selectedPhoto.name}</h3>
              <button
                onClick={() => setSelectedPhoto(null)}
                className={`w-8 h-8 flex items-center justify-center ${styles.deleteButton}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="max-h-[70vh] overflow-auto">
              <img
                src={selectedPhoto.src}
                alt={selectedPhoto.name}
                className="w-full h-auto max-h-full object-contain"
                style={{ imageRendering: theme === "Pixel" ? "pixelated" : "auto" }}
              />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              <p>Uploaded: {selectedPhoto.uploadDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}