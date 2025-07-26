"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { X } from "lucide-react"
import { useTheme } from "@/contexts/providers/theme-context"
import { PropertyInfo } from "@/components/features/property/property-info"
import { BillProviders } from "@/components/features/property/bill-providers"
import { PhotosGrid } from "@/components/features/property/photos-grid"

interface DialogWindowProps {
  isOpen: boolean
  onClose: () => void
  title: string
  iconSrc?: string
  windowId: string
  zIndex: number
  onFocus: () => void
}

export function DialogWindow({ isOpen, onClose, title, iconSrc, windowId, zIndex, onFocus }: DialogWindowProps) {
  const { theme } = useTheme()
  const [position, setPosition] = useState({ x: 100 + Math.random() * 200, y: 100 + Math.random() * 100 })
  const [size, setSize] = useState({ width: 500, height: 600 })
  const [isDragging, setIsDragging] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [resizeHandle, setResizeHandle] = useState<string>("")
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0, width: 0, height: 0, posX: 0, posY: 0 })
  const dialogRef = useRef<HTMLDivElement>(null)

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus()
    if (dialogRef.current) {
      const rect = dialogRef.current.getBoundingClientRect()
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
      setIsDragging(true)
    }
  }

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.stopPropagation()
    onFocus()
    setIsResizing(true)
    setResizeHandle(handle)
    setResizeStart({
      x: e.clientX,
      y: e.clientY,
      width: size.width,
      height: size.height,
      posX: position.x,
      posY: position.y,
    })
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        setPosition({
          x: e.clientX - dragOffset.x,
          y: e.clientY - dragOffset.y,
        })
      } else if (isResizing) {
        const deltaX = e.clientX - resizeStart.x
        const deltaY = e.clientY - resizeStart.y

        let newWidth = resizeStart.width
        let newHeight = resizeStart.height
        let newX = resizeStart.posX
        let newY = resizeStart.posY

        if (resizeHandle.includes("right")) {
          newWidth = Math.max(300, resizeStart.width + deltaX)
        }
        if (resizeHandle.includes("left")) {
          const widthChange = Math.min(deltaX, resizeStart.width - 300)
          newWidth = resizeStart.width - widthChange
          newX = resizeStart.posX + widthChange
        }
        if (resizeHandle.includes("bottom")) {
          newHeight = Math.max(200, resizeStart.height + deltaY)
        }
        if (resizeHandle.includes("top")) {
          const heightChange = Math.min(deltaY, resizeStart.height - 200)
          newHeight = resizeStart.height - heightChange
          newY = resizeStart.posY + heightChange
        }

        setSize({ width: newWidth, height: newHeight })
        setPosition({ x: newX, y: newY })
      }
    }

    const handleMouseUp = () => {
      setIsDragging(false)
      setIsResizing(false)
      setResizeHandle("")
    }

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isDragging, isResizing, dragOffset, resizeStart, resizeHandle])

  const getDialogStyles = () => {
    switch (theme) {
      case "Pixel":
        return {
          container: "bg-gray-300 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
          titleBar: "bg-blue-600 border-b-2 border-black h-8",
          titleText: "text-white font-bold text-sm font-mono",
          closeButton: "bg-red-600 hover:bg-red-700 text-white border border-black w-6 h-6 text-xs font-bold",
          content: "bg-white border-2 border-gray-400 m-1 overflow-auto",
        }
      case "3D":
        return {
          container: "bg-gray-100 border border-gray-400 shadow-lg rounded-lg",
          titleBar: "bg-gradient-to-b from-gray-200 to-gray-300 border-b border-gray-400 rounded-t-lg h-8",
          titleText: "text-gray-800 font-semibold text-sm",
          closeButton: "bg-red-500 hover:bg-red-600 text-white rounded w-5 h-5 text-xs shadow-sm",
          content: "bg-white rounded-b-lg shadow-inner overflow-auto",
        }
      case "3D Rounded":
        return {
          container: "bg-white border border-gray-200 shadow-2xl rounded-2xl backdrop-blur-sm",
          titleBar: "bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200 rounded-t-2xl h-8",
          titleText: "text-gray-700 font-medium text-sm",
          closeButton:
            "bg-red-400 hover:bg-red-500 text-white rounded-full w-5 h-5 text-xs shadow-md transition-colors",
          content: "bg-gray-50 rounded-b-2xl overflow-auto",
        }
      default:
        return {
          container: "bg-white border border-gray-300 shadow-lg rounded",
          titleBar: "bg-gray-100 border-b border-gray-300 h-8",
          titleText: "text-gray-800 font-medium text-sm",
          closeButton: "bg-red-500 hover:bg-red-600 text-white rounded w-5 h-5 text-xs",
          content: "bg-white overflow-auto",
        }
    }
  }

  if (!isOpen) return null

  const styles = getDialogStyles()
  const titleBarHeight = 32 // 8 * 4 = 32px (h-8)
  const contentHeight = size.height - titleBarHeight

  const renderContent = () => {
    if (title === "Home") {
      return <PropertyInfo mlsNumber="25000227" />
    }
    if (title === "Bills") {
      return <BillProviders />
    }
    if (title === "Photos") {
      return <PhotosGrid theme={theme} />
    }
    return <div className="p-4 text-gray-500">Content for {title}</div>
  }

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex }}>
      <div
        ref={dialogRef}
        className={`absolute pointer-events-auto flex flex-col ${styles.container} ${isDragging ? "cursor-grabbing" : "cursor-default"}`}
        style={{
          left: position.x,
          top: position.y,
          width: size.width,
          height: size.height,
        }}
        onClick={onFocus}
      >
        {/* Title Bar */}
        <div
          className={`flex items-center justify-between px-3 py-2 cursor-grab active:cursor-grabbing flex-shrink-0 ${styles.titleBar}`}
          onMouseDown={handleMouseDown}
        >
          <div className="flex items-center gap-2">
            {iconSrc && (
              <img
                src={iconSrc || "/placeholder.svg"}
                alt={title}
                className="w-4 h-4"
                style={{ imageRendering: theme === "Pixel" ? "pixelated" : "auto" }}
              />
            )}
            <span className={styles.titleText}>{title}</span>
          </div>
          <button onClick={onClose} className={`flex items-center justify-center ${styles.closeButton}`}>
            <X className="w-3 h-3" />
          </button>
        </div>

        {/* Content Area */}
        <div
          className={`flex-1 ${styles.content}`}
          style={{
            height: contentHeight,
            maxHeight: contentHeight,
          }}
        >
          {renderContent()}
        </div>

        {/* Invisible Resize Handles */}
        {/* Corner handles */}
        <div
          className="absolute top-0 left-0 w-3 h-3 cursor-nw-resize"
          onMouseDown={(e) => handleResizeStart(e, "top-left")}
        />
        <div
          className="absolute top-0 right-0 w-3 h-3 cursor-ne-resize"
          onMouseDown={(e) => handleResizeStart(e, "top-right")}
        />
        <div
          className="absolute bottom-0 left-0 w-3 h-3 cursor-sw-resize"
          onMouseDown={(e) => handleResizeStart(e, "bottom-left")}
        />
        <div
          className="absolute bottom-0 right-0 w-3 h-3 cursor-se-resize"
          onMouseDown={(e) => handleResizeStart(e, "bottom-right")}
        />

        {/* Edge handles */}
        <div
          className="absolute top-0 left-3 right-3 h-1 cursor-n-resize"
          onMouseDown={(e) => handleResizeStart(e, "top")}
        />
        <div
          className="absolute bottom-0 left-3 right-3 h-1 cursor-s-resize"
          onMouseDown={(e) => handleResizeStart(e, "bottom")}
        />
        <div
          className="absolute left-0 top-3 bottom-3 w-1 cursor-w-resize"
          onMouseDown={(e) => handleResizeStart(e, "left")}
        />
        <div
          className="absolute right-0 top-3 bottom-3 w-1 cursor-e-resize"
          onMouseDown={(e) => handleResizeStart(e, "right")}
        />
      </div>
    </div>
  )
}
