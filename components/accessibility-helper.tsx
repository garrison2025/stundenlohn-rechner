"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accessibility, Type, Contrast, Volume2, X } from "lucide-react"

export default function AccessibilityHelper() {
  const [isOpen, setIsOpen] = useState(false)
  const [fontSize, setFontSize] = useState(100)
  const [contrast, setContrast] = useState("normal")
  const [screenReader, setScreenReader] = useState(false)

  useEffect(() => {
    // Apply font size changes
    document.documentElement.style.fontSize = `${fontSize}%`
  }, [fontSize])

  useEffect(() => {
    // Apply contrast changes
    const body = document.body
    body.classList.remove("high-contrast", "low-contrast")

    if (contrast === "high") {
      body.classList.add("high-contrast")
    } else if (contrast === "low") {
      body.classList.add("low-contrast")
    }
  }, [contrast])

  const resetSettings = () => {
    setFontSize(100)
    setContrast("normal")
    setScreenReader(false)
  }

  return (
    <>
      {/* Floating Accessibility Button */}
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 rounded-full w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
        size="sm"
        aria-label="Barrierefreiheit-Einstellungen öffnen"
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="flex items-center">
                  <Accessibility className="h-5 w-5 mr-2" />
                  Barrierefreiheit
                </CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Font Size */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Type className="h-4 w-4" />
                  <label className="text-sm font-medium">Schriftgröße: {fontSize}%</label>
                </div>
                <Slider
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  min={75}
                  max={150}
                  step={25}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Klein</span>
                  <span>Normal</span>
                  <span>Groß</span>
                </div>
              </div>

              {/* Contrast */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Contrast className="h-4 w-4" />
                  <label className="text-sm font-medium">Kontrast</label>
                </div>
                <Select value={contrast} onValueChange={setContrast}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="high">Hoch</SelectItem>
                    <SelectItem value="low">Niedrig</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Screen Reader */}
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Volume2 className="h-4 w-4" />
                  <label className="text-sm font-medium">Bildschirmleser-Unterstützung</label>
                </div>
                <Button
                  variant={screenReader ? "default" : "outline"}
                  onClick={() => setScreenReader(!screenReader)}
                  className="w-full"
                >
                  {screenReader ? "Aktiviert" : "Deaktiviert"}
                </Button>
              </div>

              {/* Reset Button */}
              <div className="pt-4 border-t">
                <Button variant="outline" onClick={resetSettings} className="w-full bg-transparent">
                  Einstellungen zurücksetzen
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  )
}
