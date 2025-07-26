"use client"

import { useState, useMemo, useCallback } from "react"
import { FloatingDock } from "./floating-dock"
import { DialogWindow } from "@/components/features/dialogs/dialog-window"
import { useTheme } from "@/contexts/providers/theme-context"
import { useMemoizedValue, useDebounce } from "@/lib/performance"

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

  // Memoized icon path function
  const getIconPath = useCallback((iconName: string) => {
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
  }, [theme])

  // Memoized icon style
  const getIconStyle = useMemoizedValue(() => {
    switch (theme) {
      case "Pixel":
        return { imageRendering: "pixelated" as const }
      case "3D":
      case "3D Rounded":
        return { imageRendering: "auto" as const }
      default:
        return { imageRendering: "pixelated" as const }
    }
  }, [theme])

  // Debounced window opening to prevent rapid multiple opens
  const handleDoubleClick = useDebounce(useCallback((title: string, iconName: string) => {
    const windowId = `${iconName}-${Date.now()}`
    const newWindow: OpenWindow = {
      id: windowId,
      title,
      iconSrc: getIconPath(iconName),
      zIndex: nextZIndex,
    }

    setOpenWindows((prev) => [...prev, newWindow])
    setNextZIndex((prev) => prev + 1)
  }, [getIconPath, nextZIndex]), 300)

  const handleCloseWindow = useCallback((windowId: string) => {
    setOpenWindows((prev) => prev.filter((window) => window.id !== windowId))
  }, [])

  const handleFocusWindow = useCallback((windowId: string) => {
    setOpenWindows((prev) =>
      prev.map((window) => (window.id === windowId ? { ...window, zIndex: nextZIndex } : window)),
    )
    setNextZIndex((prev) => prev + 1)
  }, [nextZIndex])

  // Memoized links array to prevent unnecessary re-renders
  const links = useMemo(() => [
    {
      title: "Home",
      iconName: "house",
      icon: (
        <img
          src={getIconPath("house") || "/placeholder.svg"}
          alt="Home"
          className="h-full w-full object-contain"
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
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
          style={getIconStyle}
          loading="lazy"
          decoding="async"
        />
      ),
      href: "#",
      onDoubleClick: () => handleDoubleClick("Bills", "bills"),
    },
  ], [getIconPath, getIconStyle, handleDoubleClick])

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
