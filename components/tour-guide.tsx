"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ArrowRight, ArrowLeft } from "lucide-react"

interface TourGuideProps {
  isOpen: boolean
  onClose: () => void
}

export default function TourGuide({ isOpen, onClose }: TourGuideProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const tourSteps = [
    {
      target: ".calculate-button",
      title: "Berechnung starten",
      content: "Klicken Sie hier, um Ihren Stundenlohn zu berechnen. Geben Sie vorher Ihre Daten ein.",
      position: "top",
    },
    {
      target: "#bruttogehalt",
      title: "Bruttogehalt eingeben",
      content: "Geben Sie hier Ihr monatliches oder jährliches Bruttogehalt ein.",
      position: "bottom",
    },
    {
      target: "#wochenstunden",
      title: "Arbeitszeit angeben",
      content: "Tragen Sie Ihre wöchentlichen Arbeitsstunden ein. Der Slider hilft bei der Eingabe.",
      position: "bottom",
    },
    {
      target: ".collapsible-trigger",
      title: "Erweiterte Optionen",
      content: "Für eine genauere Berechnung können Sie hier weitere Details angeben.",
      position: "top",
    },
  ]

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  const nextStep = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      onClose()
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const skipTour = () => {
    onClose()
    setCurrentStep(0)
  }

  if (!isOpen) return null

  const currentTourStep = tourSteps[currentStep]

  return (
    <div className="fixed inset-0 z-50 tour-overlay">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 max-w-[90vw] tour-tooltip">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">{currentTourStep.title}</CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">{currentTourStep.content}</p>

          <div className="flex justify-between items-center">
            <div className="flex space-x-1">
              {tourSteps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${index === currentStep ? "bg-blue-500" : "bg-gray-300"}`}
                />
              ))}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" size="sm" onClick={skipTour}>
                Überspringen
              </Button>
              {currentStep > 0 && (
                <Button variant="outline" size="sm" onClick={prevStep}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Zurück
                </Button>
              )}
              <Button size="sm" onClick={nextStep}>
                {currentStep === tourSteps.length - 1 ? "Fertig" : "Weiter"}
                {currentStep < tourSteps.length - 1 && <ArrowRight className="h-4 w-4 ml-1" />}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
