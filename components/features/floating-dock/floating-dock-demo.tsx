"use client"

import { useState } from "react"
import { FloatingDock } from "./floating-dock"
import { DialogWindow } from "@/components/features/dialogs/dialog-window"
import { useTheme } from "@/contexts/providers/theme-context"

interface OpenWindow {
  id: string
  title: string
  iconSrc: string
  zIndex: number
}

export default function FloatingDockDemo() {
  const { theme } = useTheme()
  const [openWindows, setOpenWindows] = useState<OpenWindow[]>([])
  const [nextZIndex, setNextZIndex] = useState(1000)

  const getIconPath = (iconName: string) => {
    switch (theme) {
      case "Pixel":
        return `/icons/${iconName}.png`
      case "3D":
        return `/icons/3d-${iconName}.png`
      case "3D Rounded":
        return `/icons/3d-rounded-${iconName}.png`
      default:
        return `/icons/${iconName}.png`
    }
  }

  const getIconStyle = () => {
    switch (theme) {
      case "Pixel":
        return { imageRendering: "pixelated" as const }
      case "3D":
      case "3D Rounded":
        return { imageRendering: "auto" as const }
      default:
        return { imageRendering: "pixelated" as const }
    }
  }

  const handleDoubleClick = (title: string, iconName: string) => {
    const windowId = `${iconName}-${Date.now()}`
    const newWindow: OpenWindow = {
      id: windowId,
      title,
      iconSrc: getIconPath(iconName),
      zIndex: nextZIndex,
    }

    setOpenWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }

  const handleCloseWindow = (windowId: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId))
  }

  const handleFocusWindow = (windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((window) => (window.id === windowId ? { ...window, zIndex: nextZIndex } : window)),
    )
    setNextZIndex((prev) => prev + 1)
  }

  const links = [
    {
      title: "Home",
      iconName: "house",
      icon: (
        <img
          src={getIconPath("house") || "/placeholder.svg"}
          alt="Home"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Home", "house"),
    },
    {
      title: "Projects",
      iconName: "project",
      icon: (
        <img
          src={getIconPath("project") || "/placeholder.svg"}
          alt="Projects"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Projects", "project"),
    },
    {
      title: "Documents",
      iconName: "document",
      icon: (
        <img
          src={getIconPath("document") || "/placeholder.svg"}
          alt="Documents"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Documents", "document"),
    },
    {
      title: "Photos",
      iconName: "photos",
      icon: (
        <img
          src={getIconPath("photos") || "/placeholder.svg"}
          alt="Photos"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Photos", "photos"),
    },
    {
      title: "Contractors",
      iconName: "provider",
      icon: (
        <img
          src={getIconPath("provider") || "/placeholder.svg"}
          alt="Contractors"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Contractors", "provider"),
    },
    {
      title: "Paint Colors",
      iconName: "paint",
      icon: (
        <img
          src={getIconPath("paint") || "/placeholder.svg"}
          alt="Paint Colors"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Paint Colors", "paint"),
    },
    {
      title: "Bills",
      iconName: "bills",
      icon: (
        <img
          src={getIconPath("bills") || "/placeholder.svg"}
          alt="Bills"
          className="h-full w-full object-contain"
          style={getIconStyle()}
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Bills", "bills"),
    },
  ]

  return (
    <>
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
        <FloatingDock mobileClassName="translate-y-0" items={links} />
      </div>

      {openWindows.map((window) => (
        <DialogWindow
          key={window.id}
          isOpen={true}
          onClose={() => handleCloseWindow(window.id)}
          title={window.title}
          iconSrc={window.iconSrc}
          windowId={window.id}
          zIndex={window.zIndex}
          onFocus={() => handleFocusWindow(window.id)}
        />
      ))}
    </>
  )
}
