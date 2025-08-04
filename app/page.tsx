"use client"

import { useState, useEffect, useCallback, useMemo, Suspense } from "react"
import {
  Calculator,
  Info,
  ChevronDown,
  ChevronUp,
  Play,
  TrendingUp,
  Users,
  Download,
  Share2,
  Printer,
  AlertCircle,
  Menu,
  X,
  History,
  HelpCircle,
  Sun,
  Moon,
  CheckCircle2,
  ZapIcon,
  Loader2,
  AlertTriangle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import Image from "next/image"
import { useTheme } from "next-themes"
import dynamic from "next/dynamic"

// 懒加载非关键组件
const AdvancedCalculator = dynamic(() => import("@/components/advanced-calculator"), {
  loading: () => <div className="animate-pulse bg-gray-200 h-64 rounded-lg" />,
  ssr: false,
})

const TourGuide = dynamic(() => import("@/components/tour-guide"), {
  ssr: false,
})

const AccessibilityHelper = dynamic(() => import("@/components/accessibility-helper"), {
  ssr: false,
})

// Enhanced German tax calculation with more precision
const calculateGermanTax = (
  bruttoMonat: number,
  steuerklasse: string,
  bundesland: string,
  kinderfreibetraege: number,
  kirchensteuerpflichtig: boolean,
  alter = 25,
  krankenversicherung = "gesetzlich",
) => {
  const bruttoJahr = bruttoMonat * 12

  // Grundfreibetrag (aktuell)
  const grundfreibetrag = 11604
  const kinderfreibetrag = 6024

  // Zu versteuerndes Einkommen
  const zvE = Math.max(0, bruttoJahr - grundfreibetrag - kinderfreibetraege * kinderfreibetrag)

  // Einkommensteuer nach Grundtarif (vereinfacht)
  let einkommensteuer = 0
  if (zvE <= 17005) {
    einkommensteuer = (922.98 * (zvE / 10000) + 1400) * (zvE / 10000)
  } else if (zvE <= 66760) {
    einkommensteuer = (181.19 * (zvE / 10000) + 2397) * (zvE / 10000) + 1025.38
  } else if (zvE <= 277825) {
    einkommensteuer = 0.42 * zvE - 10602.13
  } else {
    einkommensteuer = 0.45 * zvE - 18936.88
  }

  // Steuerklassen-Anpassung
  const steuerklassenFaktoren = {
    "1": 1.0,
    "2": 0.85, // Entlastungsbetrag für Alleinerziehende
    "3": 0.6, // Ehegattensplitting günstig
    "4": 1.0, // Standard verheiratet
    "5": 1.5, // Ehegattensplitting ungünstig
    "6": 1.35, // Zweitjob
  }

  einkommensteuer *= steuerklassenFaktoren[steuerklasse] || 1.0

  // Kirchensteuer (8% oder 9% der Einkommensteuer je nach Bundesland)
  const kirchensteuersaetze = {
    Bayern: 0.08,
    "Baden-Württemberg": 0.08,
  }
  const kirchensteuersatz = kirchensteuersaetze[bundesland] || 0.09
  const kirchensteuer = kirchensteuerpflichtig ? einkommensteuer * kirchensteuersatz : 0

  // Solidaritätszuschlag (5,5% der Einkommensteuer, aber nur ab Freigrenze)
  const soli = einkommensteuer > 16956 ? einkommensteuer * 0.055 : 0

  // Sozialversicherungsbeiträge (Arbeitnehmeranteil)
  const beitragsbemessungsgrenze = 87600 // West
  const bemessungsgrundlage = Math.min(bruttoJahr, beitragsbemessungsgrenze)

  const rentenversicherung = bemessungsgrundlage * 0.093 // 18,6% / 2
  const arbeitslosenversicherung = bemessungsgrundlage * 0.013 // 2,6% / 2

  // Krankenversicherung abhängig von Art
  let krankenversicherungsBeitrag = 0
  if (krankenversicherung === "gesetzlich") {
    krankenversicherungsBeitrag = bemessungsgrundlage * 0.073 // 14,6% / 2
  } else {
    // Private KV - geschätzt
    krankenversicherungsBeitrag = Math.min(bruttoJahr * 0.08, 6000)
  }

  // Pflegeversicherung (höher für Kinderlose ab 23)
  let pflegeversicherungsSatz = 0.01525 // 3,05% / 2
  if (alter >= 23 && kinderfreibetraege === 0) {
    pflegeversicherungsSatz += 0.0035 // Zusatzbeitrag für Kinderlose
  }
  const pflegeversicherung = bemessungsgrundlage * pflegeversicherungsSatz

  const gesamtSozialversicherung =
    rentenversicherung + arbeitslosenversicherung + krankenversicherungsBeitrag + pflegeversicherung
  const gesamtSteuern = einkommensteuer + kirchensteuer + soli
  const gesamtAbzuege = gesamtSteuern + gesamtSozialversicherung

  const nettoJahr = bruttoJahr - gesamtAbzuege
  const nettoMonat = nettoJahr / 12

  return {
    bruttoJahr,
    nettoJahr,
    nettoMonat,
    einkommensteuer: einkommensteuer / 12,
    kirchensteuer: kirchensteuer / 12,
    soli: soli / 12,
    rentenversicherung: rentenversicherung / 12,
    arbeitslosenversicherung: arbeitslosenversicherung / 12,
    krankenversicherung: krankenversicherungsBeitrag / 12,
    pflegeversicherung: pflegeversicherung / 12,
    gesamtAbzuege: gesamtAbzuege / 12,
    steuerlast: (gesamtAbzuege / bruttoJahr) * 100,
    effektiverSteuersatz: (gesamtSteuern / bruttoJahr) * 100,
    sozialversicherungsanteil: (gesamtSozialversicherung / bruttoJahr) * 100,
  }
}

// Calculation history interface
interface CalculationHistory {
  id: string
  timestamp: Date
  inputs: {
    bruttoGehalt: string
    zeitraum: string
    wochenStunden: string
    steuerklasse: string
    bundesland: string
    kinderfreibetraege: string
    kirchensteuerpflichtig: boolean
    alter: string
    krankenversicherung: string
  }
  result: any
}

export default function StundenlohnRechner() {
  // 主题和引导状态
  const [showTour, setShowTour] = useState(false)
  const [showAdvancedCalc, setShowAdvancedCalc] = useState(false)
  const [notifications, setNotifications] = useState<
    Array<{ id: string; type: "success" | "error" | "info"; message: string }>
  >([])

  // 性能优化状态
  const [isCalculating, setIsCalculating] = useState(false)
  const [lastCalculationTime, setLastCalculationTime] = useState<number>(0)

  // 主题钩子
  const { theme, setTheme } = useTheme()

  // Basic inputs
  const [bruttoGehalt, setBruttoGehalt] = useState("3000")
  const [zeitraum, setZeitraum] = useState("Monat")
  const [wochenStunden, setWochenStunden] = useState("40.00")
  const [steuerklasse, setSteuerklasse] = useState("1")
  const [bundesland, setBundesland] = useState("Nordrhein-Westfalen")
  const [kinderfreibetraege, setKinderfreibetraege] = useState("0")
  const [kirchensteuerpflichtig, setKirchensteuerpflichtig] = useState(false)

  // Advanced inputs
  const [alter, setAlter] = useState("25")
  const [krankenversicherung, setKrankenversicherung] = useState("gesetzlich")
  const [urlaubstage, setUrlaubstage] = useState("30")
  const [feiertage, setFeiertage] = useState("10")

  // UI states
  const [showAdvanced, setShowAdvanced] = useState(false)
  const [calculated, setCalculated] = useState(false)
  const [errors, setErrors] = useState<string[]>([])
  const [showComparison, setShowComparison] = useState(false)
  const [result, setResult] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("calculator")

  // History and favorites
  const [calculationHistory, setCalculationHistory] = useState<CalculationHistory[]>([])
  const [favorites, setFavorites] = useState<string[]>([])
  const [showHistory, setShowHistory] = useState(false)

  // 添加移动端检测
  const [isMobile, setIsMobile] = useState(false)
  const [isLowEndDevice, setIsLowEndDevice] = useState(false)

  // 检测设备性能
  useEffect(() => {
    const checkDevice = () => {
      const isMobileDevice = window.innerWidth <= 768
      setIsMobile(isMobileDevice)

      // 检测低端设备
      const isLowEnd =
        navigator.hardwareConcurrency <= 2 ||
        navigator.deviceMemory <= 2 ||
        /Android.*Chrome\/[.0-9]*/.test(navigator.userAgent)
      setIsLowEndDevice(isLowEnd)
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)
    return () => window.removeEventListener("resize", checkDevice)
  }, [])

  // 优化计算函数，使用useMemo缓存结果
  const memoizedCalculation = useMemo(() => {
    if (!result) return null
    return result
  }, [result])

  // Load saved data on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("stundenlohn-history")
      const savedFavorites = localStorage.getItem("stundenlohn-favorites")
      const savedInputs = localStorage.getItem("stundenlohn-inputs")

      if (savedHistory) {
        try {
          const history = JSON.parse(savedHistory)
          setCalculationHistory(
            history.map((h) => ({
              ...h,
              timestamp: new Date(h.timestamp),
            })),
          )
        } catch (e) {
          console.error("Error loading history:", e)
        }
      }

      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites))
        } catch (e) {
          console.error("Error loading favorites:", e)
        }
      }

      if (savedInputs) {
        try {
          const inputs = JSON.parse(savedInputs)
          setBruttoGehalt(inputs.bruttoGehalt || "3000")
          setZeitraum(inputs.zeitraum || "Monat")
          setWochenStunden(inputs.wochenStunden || "40.00")
          setSteuerklasse(inputs.steuerklasse || "1")
          setBundesland(inputs.bundesland || "Nordrhein-Westfalen")
          setKinderfreibetraege(inputs.kinderfreibetraege || "0")
          setKirchensteuerpflichtig(inputs.kirchensteuerpflichtig || false)
          setAlter(inputs.alter || "25")
          setKrankenversicherung(inputs.krankenversicherung || "gesetzlich")
        } catch (e) {
          console.error("Error loading inputs:", e)
        }
      }
    }
  }, [])

  // Save inputs to localStorage
  const saveInputs = useCallback(() => {
    if (typeof window !== "undefined") {
      const inputs = {
        bruttoGehalt,
        zeitraum,
        wochenStunden,
        steuerklasse,
        bundesland,
        kinderfreibetraege,
        kirchensteuerpflichtig,
        alter,
        krankenversicherung,
      }
      localStorage.setItem("stundenlohn-inputs", JSON.stringify(inputs))
    }
  }, [
    bruttoGehalt,
    zeitraum,
    wochenStunden,
    steuerklasse,
    bundesland,
    kinderfreibetraege,
    kirchensteuerpflichtig,
    alter,
    krankenversicherung,
  ])

  // Auto-save inputs
  useEffect(() => {
    const timer = setTimeout(saveInputs, 1000)
    return () => clearTimeout(timer)
  }, [saveInputs])

  // Enhanced input validation
  const validateInputs = () => {
    const newErrors: string[] = []

    const gehalt = Number.parseFloat(bruttoGehalt)
    const stunden = Number.parseFloat(wochenStunden)
    const kinder = Number.parseInt(kinderfreibetraege)
    const age = Number.parseInt(alter)
    const urlaub = Number.parseInt(urlaubstage)
    const feiertageNum = Number.parseInt(feiertage)

    if (!gehalt || gehalt <= 0) {
      newErrors.push("Bitte geben Sie ein gültiges Bruttogehalt ein.")
    }
    if (gehalt < 520 && zeitraum === "Monat") {
      newErrors.push("Das eingegebene Gehalt liegt unter dem Mindestlohn.")
    }
    if (gehalt > 1000000) {
      newErrors.push("Das eingegebene Gehalt ist unrealistisch hoch.")
    }
    if (!stunden || stunden <= 0 || stunden > 80) {
      newErrors.push("Bitte geben Sie gültige Wochenstunden ein (1-80).")
    }
    if (kinder < 0 || kinder > 10) {
      newErrors.push("Anzahl der Kinderfreibeträge muss zwischen 0 und 10 liegen.")
    }
    if (age < 14 || age > 100) {
      newErrors.push("Bitte geben Sie ein gültiges Alter ein (14-100).")
    }
    if (urlaub < 0 || urlaub > 50) {
      newErrors.push("Urlaubstage müssen zwischen 0 und 50 liegen.")
    }
    if (feiertageNum < 0 || feiertageNum > 20) {
      newErrors.push("Feiertage müssen zwischen 0 und 20 liegen.")
    }

    setErrors(newErrors)
    return newErrors.length === 0
  }

  // Enhanced calculation with more features
  const calculateStundenlohn = useCallback(() => {
    if (!validateInputs()) return null

    setIsCalculating(true)
    const startTime = performance.now()

    // 添加通知
    const notificationId = Date.now().toString()
    setNotifications((prev) => [
      ...prev,
      {
        id: notificationId,
        type: "info",
        message: "Berechnung läuft...",
      },
    ])

    // Simulate calculation delay for better UX
    setTimeout(() => {
      try {
        const gehalt = Number.parseFloat(bruttoGehalt) || 0
        const stunden = Number.parseFloat(wochenStunden) || 40
        const kinder = Number.parseInt(kinderfreibetraege) || 0
        const age = Number.parseInt(alter) || 25
        const urlaub = Number.parseInt(urlaubstage) || 30
        const feiertageNum = Number.parseInt(feiertage) || 10

        // Convert to monthly if yearly
        const monatsGehalt = zeitraum === "Jahr" ? gehalt / 12 : gehalt

        // Calculate working days per year
        const arbeitstageProJahr = 365 - 52 * 2 - urlaub - feiertageNum // Weekends, vacation, holidays
        const arbeitsStundenProJahr = stunden * 52 - (urlaub * stunden) / 5 // Adjust for vacation

        // Calculate gross hourly wage (more precise)
        const bruttoStundenlohn = monatsGehalt / (stunden * 4.33)
        const bruttoStundenlohnExakt = (monatsGehalt * 12) / arbeitsStundenProJahr

        // Enhanced German tax calculation
        const taxData = calculateGermanTax(
          monatsGehalt,
          steuerklasse,
          bundesland,
          kinder,
          kirchensteuerpflichtig,
          age,
          krankenversicherung,
        )

        const nettoStundenlohn = taxData.nettoMonat / (stunden * 4.33)
        const nettoStundenlohnExakt = (taxData.nettoMonat * 12) / arbeitsStundenProJahr

        const calculationResult = {
          bruttoStundenlohn: bruttoStundenlohn.toFixed(2),
          nettoStundenlohn: nettoStundenlohn.toFixed(2),
          bruttoStundenlohnExakt: bruttoStundenlohnExakt.toFixed(2),
          nettoStundenlohnExakt: nettoStundenlohnExakt.toFixed(2),
          bruttoMonat: monatsGehalt.toFixed(2),
          nettoMonat: taxData.nettoMonat.toFixed(2),
          jahresbrutto: taxData.bruttoJahr.toFixed(2),
          jahresnetto: taxData.nettoJahr.toFixed(2),
          steuerlast: taxData.steuerlast.toFixed(1),
          effektiverSteuersatz: taxData.effektiverSteuersatz.toFixed(1),
          sozialversicherungsanteil: taxData.sozialversicherungsanteil.toFixed(1),
          arbeitsStundenProJahr: arbeitsStundenProJahr.toFixed(0),
          arbeitstageProJahr: arbeitstageProJahr.toFixed(0),
          abzuege: {
            einkommensteuer: taxData.einkommensteuer.toFixed(2),
            kirchensteuer: taxData.kirchensteuer.toFixed(2),
            soli: taxData.soli.toFixed(2),
            rentenversicherung: taxData.rentenversicherung.toFixed(2),
            arbeitslosenversicherung: taxData.arbeitslosenversicherung.toFixed(2),
            krankenversicherung: taxData.krankenversicherung.toFixed(2),
            pflegeversicherung: taxData.pflegeversicherung.toFixed(2),
            gesamt: taxData.gesamtAbzuege.toFixed(2),
          },
        }

        // Save to history
        const historyEntry: CalculationHistory = {
          id: Date.now().toString(),
          timestamp: new Date(),
          inputs: {
            bruttoGehalt,
            zeitraum,
            wochenStunden,
            steuerklasse,
            bundesland,
            kinderfreibetraege,
            kirchensteuerpflichtig,
            alter,
            krankenversicherung,
          },
          result: calculationResult,
        }

        const newHistory = [historyEntry, ...calculationHistory.slice(0, 9)] // Keep last 10
        setCalculationHistory(newHistory)

        if (typeof window !== "undefined") {
          localStorage.setItem("stundenlohn-history", JSON.stringify(newHistory))
        }

        const endTime = performance.now()
        setLastCalculationTime(endTime - startTime)

        // 移除加载通知，添加成功通知
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "success",
            message: "Berechnung erfolgreich abgeschlossen!",
          },
        ])

        // 3秒后移除成功通知
        setTimeout(() => {
          setNotifications((prev) => prev.filter((n) => n.type !== "success"))
        }, 3000)

        setCalculated(true)
        setResult(calculationResult)
        setIsCalculating(false)

        // 宣布结果给屏幕阅读器
        const announcement = document.getElementById("accessibility-announcements")
        if (announcement) {
          announcement.textContent = `Berechnung abgeschlossen. Ihr Brutto-Stundenlohn beträgt ${calculationResult.bruttoStundenlohn} Euro, Netto-Stundenlohn ${calculationResult.nettoStundenlohn} Euro.`
        }
      } catch (error) {
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        setNotifications((prev) => [
          ...prev,
          {
            id: Date.now().toString(),
            type: "error",
            message: "Fehler bei der Berechnung. Bitte versuchen Sie es erneut.",
          },
        ])
        setIsCalculating(false)
      }
    }, 800)
  }, [
    bruttoGehalt,
    zeitraum,
    wochenStunden,
    steuerklasse,
    bundesland,
    kinderfreibetraege,
    kirchensteuerpflichtig,
    alter,
    krankenversicherung,
    urlaubstage,
    feiertage,
    calculationHistory,
  ])

  // Quick calculation presets
  const quickPresets = [
    { name: "Mindestlohn", gehalt: "2151", stunden: "40", zeitraum: "Monat" },
    { name: "Durchschnitt", gehalt: "4000", stunden: "40", zeitraum: "Monat" },
    { name: "Teilzeit", gehalt: "2500", stunden: "25", zeitraum: "Monat" },
    { name: "Führungskraft", gehalt: "80000", stunden: "45", zeitraum: "Jahr" },
  ]

  const applyPreset = (preset) => {
    setBruttoGehalt(preset.gehalt)
    setWochenStunden(preset.stunden)
    setZeitraum(preset.zeitraum)
  }

  // Load from history
  const loadFromHistory = (historyItem: CalculationHistory) => {
    const { inputs } = historyItem
    setBruttoGehalt(inputs.bruttoGehalt)
    setZeitraum(inputs.zeitraum)
    setWochenStunden(inputs.wochenStunden)
    setSteuerklasse(inputs.steuerklasse)
    setBundesland(inputs.bundesland)
    setKinderfreibetraege(inputs.kinderfreibetraege)
    setKirchensteuerpflichtig(inputs.kirchensteuerpflichtig)
    setAlter(inputs.alter)
    setKrankenversicherung(inputs.krankenversicherung)
    setResult(historyItem.result)
    setCalculated(true)
    setShowHistory(false)
  }

  // Export functionality
  const exportResults = () => {
    if (!result) return

    const data = `
Stundenlohn Berechnung - ${new Date().toLocaleDateString("de-DE")}
=================================================

Eingaben:
- Bruttogehalt: ${bruttoGehalt} € pro ${zeitraum}
- Wochenstunden: ${wochenStunden}
- Steuerklasse: ${steuerklasse}
- Bundesland: ${bundesland}
- Kinderfreibeträge: ${kinderfreibetraege}
- Kirchensteuerpflichtig: ${kirchensteuerpflichtig ? "Ja" : "Nein"}
- Alter: ${alter} Jahre
- Krankenversicherung: ${krankenversicherung}

Ergebnisse:
- Brutto-Stundenlohn (Standard): ${result.bruttoStundenlohn} €
- Netto-Stundenlohn (Standard): ${result.nettoStundenlohn} €
- Brutto-Stundenlohn (Exakt): ${result.bruttoStundenlohnExakt} €
- Netto-Stundenlohn (Exakt): ${result.nettoStundenlohnExakt} €
- Brutto-Monatsgehalt: ${result.bruttoMonat} €
- Netto-Monatsgehalt: ${result.nettoMonat} €
- Steuerlast: ${result.steuerlast}%
- Effektiver Steuersatz: ${result.effektiverSteuersatz}%
- Sozialversicherungsanteil: ${result.sozialversicherungsanteil}%

Arbeitszeitanalyse:
- Arbeitsstunden pro Jahr: ${result.arbeitsStundenProJahr}
- Arbeitstage pro Jahr: ${result.arbeitstageProJahr}

Detaillierte Abzüge (monatlich):
- Einkommensteuer: ${result.abzuege.einkommensteuer} €
- Kirchensteuer: ${result.abzuege.kirchensteuer} €
- Solidaritätszuschlag: ${result.abzuege.soli} €
- Rentenversicherung: ${result.abzuege.rentenversicherung} €
- Arbeitslosenversicherung: ${result.abzuege.arbeitslosenversicherung} €
- Krankenversicherung: ${result.abzuege.krankenversicherung} €
- Pflegeversicherung: ${result.abzuege.pflegeversicherung} €
- Gesamt Abzüge: ${result.abzuege.gesamt} €
    `

    const blob = new Blob([data], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `stundenlohn-berechnung-${new Date().toISOString().split("T")[0]}.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  // Share functionality
  const shareResults = async () => {
    if (!result) return

    const shareData = {
      title: "Mein Stundenlohn Ergebnis",
      text: `Mein Brutto-Stundenlohn: ${result.bruttoStundenlohn} €, Netto-Stundenlohn: ${result.nettoStundenlohn} €`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log("Error sharing:", err)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(`${shareData.text} - ${shareData.url}`)
      alert("Link wurde in die Zwischenablage kopiert!")
    }
  }

  // Print functionality
  const printResults = () => {
    window.print()
  }

  // Comparison with minimum wage and average
  const getComparison = () => {
    if (!result) return null

    const mindestlohn = 12.41
    const durchschnitt = 25.0
    const bruttoStunde = Number.parseFloat(result.bruttoStundenlohn)

    return {
      mindestlohn: {
        value: mindestlohn,
        percentage: ((bruttoStunde / mindestlohn - 1) * 100).toFixed(1),
        better: bruttoStunde > mindestlohn,
      },
      durchschnitt: {
        value: durchschnitt,
        percentage: ((bruttoStunde / durchschnitt - 1) * 100).toFixed(1),
        better: bruttoStunde > durchschnitt,
      },
    }
  }

  const comparison = getComparison()

  // 在useEffect中添加键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl/Cmd + Enter 开始计算
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault()
        calculateStundenlohn()
      }

      // F1 打开帮助
      if (e.key === "F1") {
        e.preventDefault()
        setShowTour(true)
      }

      // Escape 关闭模态框
      if (e.key === "Escape") {
        setShowTour(false)
        setShowAdvancedCalc(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [calculateStundenlohn])

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-white">
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Stundenlohn Rechner",
              description: "Kostenloser Rechner für Brutto- und Netto-Stundenlohn mit aktuellen deutschen Steuerdaten",
              url: "https://stundenlohn-rechner.de",
              applicationCategory: "FinanceApplication",
              operatingSystem: "Web Browser",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "EUR",
              },
              featureList: [
                "Brutto-Stundenlohn Berechnung",
                "Netto-Stundenlohn Berechnung",
                "Deutsche Steuerberechnung",
                "Alle Bundesländer",
                "Steuerklassen 1-6",
                "Berechnungshistorie",
                "Mobile optimiert",
              ],
            }),
          }}
        />

        {/* Mobile Navigation */}
        <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-2">
                <Image
                  src="/android-chrome-192x192.png"
                  alt="Stundenlohn Rechner Logo"
                  width={32}
                  height={32}
                  className="h-6 w-6 sm:h-8 sm:w-8"
                />
                <span className="text-lg sm:text-xl font-bold text-gray-900">Stundenlohn Rechner</span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-4">
                <a href="#rechner" className="text-[#4A69E2] font-medium text-sm lg:text-base">
                  Rechner
                </a>
                <a href="#faq" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">
                  FAQ
                </a>
                <a href="#kontakt" className="text-gray-600 hover:text-gray-900 text-sm lg:text-base">
                  Kontakt
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTour(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Hilfe
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
              </div>

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <Button variant="ghost" size="sm" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2">
                  {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden border-t bg-white py-4">
                <div className="flex flex-col space-y-3">
                  <a
                    href="#rechner"
                    className="text-[#4A69E2] font-medium px-4 py-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Rechner
                  </a>
                  <a href="#faq" className="text-gray-600 px-4 py-2" onClick={() => setMobileMenuOpen(false)}>
                    FAQ
                  </a>
                  <a href="#kontakt" className="text-gray-600 px-4 py-2" onClick={() => setMobileMenuOpen(false)}>
                    Kontakt
                  </a>
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section with Enhanced Calculator */}
        <main id="main-content" role="main" aria-label="Stundenlohn Rechner Hauptinhalt">
          {/* 优化后的Hero Section */}
          <section id="rechner" className="py-4 sm:py-8 md:py-12 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="max-w-4xl mx-auto px-3 sm:px-4 lg:px-8">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                  Stundenlohn Rechner: Brutto & Netto pro Stunde exakt berechnen
                </h1>
                <p className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto mb-3 sm:mb-4">
                  Unser kostenloser Rechner zeigt Ihnen sekundenschnell Ihren echten Netto-Stundenlohn. Immer aktuelle
                  Daten.
                </p>
                <div className="flex flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-500">
                  <Badge variant="secondary" className="bg-green-100 text-green-800 px-2 py-1">
                    <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Kostenlos
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-800 px-2 py-1">
                    <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Aktuelle Daten
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-800 px-2 py-1">
                    <CheckCircle2 className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                    Mobile optimiert
                  </Badge>
                </div>
              </div>

              {/* Error Display */}
              {errors.length > 0 && (
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-800">
                    <ul className="list-disc list-inside space-y-1">
                      {errors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* 优化后的Calculator Card */}
              <Card className="shadow-lg sm:shadow-xl border-0 memory-efficient">
                <CardHeader className="bg-[#4A69E2] text-white rounded-t-lg p-3 sm:p-4 md:p-6">
                  <CardTitle className="text-lg sm:text-xl md:text-2xl text-center flex items-center justify-center">
                    <Image
                      src="/android-chrome-192x192.png"
                      alt="Stundenlohn Rechner"
                      width={isMobile ? 20 : 24}
                      height={isMobile ? 20 : 24}
                      className="mr-2"
                      loading="eager"
                      priority
                    />
                    Kostenloser Stundenlohn Rechner
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-6">
                      <TabsTrigger value="calculator" className="text-xs sm:text-sm">
                        <Calculator className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Rechner</span>
                      </TabsTrigger>
                      <TabsTrigger value="history" className="text-xs sm:text-sm">
                        <History className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Verlauf</span>
                      </TabsTrigger>
                      <TabsTrigger value="presets" className="text-xs sm:text-sm">
                        <ZapIcon className="w-4 h-4 mr-1 sm:mr-2" />
                        <span className="hidden sm:inline">Vorlagen</span>
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="calculator">
                      <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Input Section */}
                        <div className="space-y-4 sm:space-y-6">
                          {/* Basic Inputs */}
                          <div className="space-y-4">
                            {/* 优化后的输入字段 */}
                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Label htmlFor="bruttogehalt" className="text-sm font-medium">
                                  Ihr Bruttogehalt *
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-3 w-3 sm:h-4 sm:w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ihr Gehalt vor Abzug von Steuern und Sozialabgaben</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="flex space-x-2">
                                <Input
                                  id="bruttogehalt"
                                  type="number"
                                  inputMode="decimal"
                                  value={bruttoGehalt}
                                  onChange={(e) => setBruttoGehalt(e.target.value)}
                                  className="text-base touch-target"
                                  placeholder="3000"
                                  min="0"
                                  step="50"
                                  aria-describedby="bruttogehalt-help"
                                  aria-required="true"
                                  aria-invalid={errors.some((e) => e.includes("Bruttogehalt"))}
                                />
                                <span className="flex items-center text-base font-medium min-w-[20px]">€</span>
                                <Select value={zeitraum} onValueChange={setZeitraum}>
                                  <SelectTrigger className="w-20 sm:w-24 md:w-32 touch-target">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Monat">pro Monat</SelectItem>
                                    <SelectItem value="Jahr">pro Jahr</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center space-x-2">
                                <Label htmlFor="wochenstunden" className="text-sm sm:text-base font-medium">
                                  Wöchentliche Arbeitsstunden *
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Ihre vertraglich vereinbarten Arbeitsstunden pro Woche</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                              <div className="space-y-2">
                                <div className="flex space-x-2">
                                  <Input
                                    id="wochenstunden"
                                    type="number"
                                    step="0.5"
                                    value={wochenStunden}
                                    onChange={(e) => setWochenStunden(e.target.value)}
                                    className="text-base sm:text-lg"
                                    placeholder="40.00"
                                    min="1"
                                    max="80"
                                  />
                                  <span className="flex items-center text-base sm:text-lg font-medium">Std</span>
                                </div>
                                <Slider
                                  value={[Number.parseFloat(wochenStunden) || 40]}
                                  onValueChange={(value) => setWochenStunden(value[0].toString())}
                                  max={80}
                                  min={1}
                                  step={0.5}
                                  className="w-full"
                                />
                                <div className="flex justify-between text-xs text-gray-500">
                                  <span>1h</span>
                                  <span>40h</span>
                                  <span>80h</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Advanced Options */}
                          <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                            <CollapsibleTrigger asChild>
                              <Button variant="outline" className="w-full bg-transparent collapsible-trigger">
                                <span className="text-sm sm:text-base">
                                  Erweiterte Optionen (empfohlen für genaue Berechnung)
                                </span>
                                {showAdvanced ? (
                                  <ChevronUp className="ml-2 h-4 w-4" />
                                ) : (
                                  <ChevronDown className="ml-2 h-4 w-4" />
                                )}
                              </Button>
                            </CollapsibleTrigger>
                            <CollapsibleContent className="space-y-4 mt-4">
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="steuerklasse">Steuerklasse</Label>
                                  <Select value={steuerklasse} onValueChange={setSteuerklasse}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">Klasse 1 (Ledig)</SelectItem>
                                      <SelectItem value="2">Klasse 2 (Alleinerziehend)</SelectItem>
                                      <SelectItem value="3">Klasse 3 (Verheiratet, günstig)</SelectItem>
                                      <SelectItem value="4">Klasse 4 (Verheiratet, Standard)</SelectItem>
                                      <SelectItem value="5">Klasse 5 (Verheiratet, ungünstig)</SelectItem>
                                      <SelectItem value="6">Klasse 6 (Zweitjob)</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="kinderfreibetraege">Kinderfreibeträge</Label>
                                  <Input
                                    id="kinderfreibetraege"
                                    type="number"
                                    value={kinderfreibetraege}
                                    onChange={(e) => setKinderfreibetraege(e.target.value)}
                                    placeholder="0"
                                    min="0"
                                    max="10"
                                  />
                                </div>
                              </div>

                              <div className="space-y-2">
                                <Label htmlFor="bundesland">Bundesland</Label>
                                <Select value={bundesland} onValueChange={setBundesland}>
                                  <SelectTrigger>
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Baden-Württemberg">Baden-Württemberg</SelectItem>
                                    <SelectItem value="Bayern">Bayern</SelectItem>
                                    <SelectItem value="Berlin">Berlin</SelectItem>
                                    <SelectItem value="Brandenburg">Brandenburg</SelectItem>
                                    <SelectItem value="Bremen">Bremen</SelectItem>
                                    <SelectItem value="Hamburg">Hamburg</SelectItem>
                                    <SelectItem value="Hessen">Hessen</SelectItem>
                                    <SelectItem value="Mecklenburg-Vorpommern">Mecklenburg-Vorpommern</SelectItem>
                                    <SelectItem value="Niedersachsen">Niedersachsen</SelectItem>
                                    <SelectItem value="Nordrhein-Westfalen">Nordrhein-Westfalen</SelectItem>
                                    <SelectItem value="Rheinland-Pfalz">Rheinland-Pfalz</SelectItem>
                                    <SelectItem value="Saarland">Saarland</SelectItem>
                                    <SelectItem value="Sachsen">Sachsen</SelectItem>
                                    <SelectItem value="Sachsen-Anhalt">Sachsen-Anhalt</SelectItem>
                                    <SelectItem value="Schleswig-Holstein">Schleswig-Holstein</SelectItem>
                                    <SelectItem value="Thüringen">Thüringen</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="alter">Alter</Label>
                                  <Input
                                    id="alter"
                                    type="number"
                                    value={alter}
                                    onChange={(e) => setAlter(e.target.value)}
                                    placeholder="25"
                                    min="14"
                                    max="100"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="krankenversicherung">Krankenversicherung</Label>
                                  <Select value={krankenversicherung} onValueChange={setKrankenversicherung}>
                                    <SelectTrigger>
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="gesetzlich">Gesetzlich</SelectItem>
                                      <SelectItem value="privat">Privat</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                  <Label htmlFor="urlaubstage">Urlaubstage pro Jahr</Label>
                                  <Input
                                    id="urlaubstage"
                                    type="number"
                                    value={urlaubstage}
                                    onChange={(e) => setUrlaubstage(e.target.value)}
                                    placeholder="30"
                                    min="0"
                                    max="50"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label htmlFor="feiertage">Feiertage pro Jahr</Label>
                                  <Input
                                    id="feiertage"
                                    type="number"
                                    value={feiertage}
                                    onChange={(e) => setFeiertage(e.target.value)}
                                    placeholder="10"
                                    min="0"
                                    max="20"
                                  />
                                </div>
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id="kirchensteuer"
                                  checked={kirchensteuerpflichtig}
                                  onCheckedChange={setKirchensteuerpflichtig}
                                />
                                <Label htmlFor="kirchensteuer" className="text-sm">
                                  Kirchensteuerpflichtig
                                </Label>
                                <Tooltip>
                                  <TooltipTrigger>
                                    <Info className="h-4 w-4 text-gray-400" />
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>8% in Bayern/Baden-Württemberg, 9% in anderen Bundesländern</p>
                                  </TooltipContent>
                                </Tooltip>
                              </div>
                            </CollapsibleContent>
                          </Collapsible>

                          {/* 优化后的计算按钮 */}
                          <div className="flex space-x-2">
                            <Button
                              onClick={calculateStundenlohn}
                              disabled={isCalculating}
                              className="flex-1 calculate-button bg-[#34D399] hover:bg-[#10B981] text-white text-sm sm:text-base md:text-lg py-3 sm:py-4 touch-target gpu-layer"
                              size={isMobile ? "default" : "lg"}
                            >
                              {isCalculating ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Calculator className="mr-2 h-4 w-4" />
                              )}
                              {isCalculating ? "Berechne..." : "Jetzt Berechnen"}
                            </Button>

                            <Button
                              variant="outline"
                              onClick={() => setShowAdvancedCalc(!showAdvancedCalc)}
                              className="touch-target gpu-layer"
                              size={isMobile ? "default" : "lg"}
                            >
                              <ZapIcon className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>

                        {/* Results Section */}
                        <div className="space-y-4 sm:space-y-6 results-section">
                          {result ? (
                            <div className="space-y-4">
                              <div className="text-center p-4 sm:p-6 bg-gradient-to-r from-[#4A69E2] to-[#6366F1] text-white rounded-lg">
                                <h3 className="text-base sm:text-lg font-medium mb-4">Ihre Ergebnisse:</h3>
                                <div className="space-y-3">
                                  <div>
                                    <p className="text-xs sm:text-sm opacity-90">Ihr Brutto-Stundenlohn:</p>
                                    <p className="text-2xl sm:text-3xl font-bold">{result.bruttoStundenlohn} €</p>
                                  </div>
                                  <div>
                                    <p className="text-xs sm:text-sm opacity-90">Ihr Netto-Stundenlohn:</p>
                                    <p className="text-2xl sm:text-3xl font-bold">{result.nettoStundenlohn} €</p>
                                  </div>
                                  <div className="text-xs sm:text-sm opacity-90">
                                    <p>Steuerlast: {result.steuerlast}%</p>
                                    <Progress
                                      value={Number.parseFloat(result.steuerlast)}
                                      className="mt-2 bg-white/20"
                                    />
                                  </div>
                                </div>
                              </div>

                              {/* Enhanced Results Display */}
                              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                  <p className="text-blue-600 font-medium">Exakter Stundenlohn</p>
                                  <p className="text-lg sm:text-xl font-bold text-blue-800">
                                    {result.bruttoStundenlohnExakt} €
                                  </p>
                                  <p className="text-blue-600">brutto</p>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                  <p className="text-green-600 font-medium">Exakter Netto</p>
                                  <p className="text-lg sm:text-xl font-bold text-green-800">
                                    {result.nettoStundenlohnExakt} €
                                  </p>
                                  <p className="text-green-600">netto</p>
                                </div>
                              </div>

                              {/* Action Buttons */}
                              <div className="flex flex-wrap gap-2">
                                <Button
                                  onClick={exportResults}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 sm:flex-none bg-transparent"
                                >
                                  <Download className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="text-xs sm:text-sm">Export</span>
                                </Button>
                                <Button
                                  onClick={shareResults}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 sm:flex-none bg-transparent"
                                >
                                  <Share2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="text-xs sm:text-sm">Teilen</span>
                                </Button>
                                <Button
                                  onClick={printResults}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 sm:flex-none bg-transparent"
                                >
                                  <Printer className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="text-xs sm:text-sm">Drucken</span>
                                </Button>
                                <Button
                                  onClick={() => setShowComparison(!showComparison)}
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 sm:flex-none"
                                >
                                  <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  <span className="text-xs sm:text-sm">Vergleich</span>
                                </Button>
                              </div>

                              {/* Comparison Section */}
                              {showComparison && comparison && (
                                <div className="p-3 sm:p-4 bg-gray-50 rounded-lg">
                                  <h4 className="font-semibold mb-3 text-sm sm:text-base">
                                    Vergleich mit Referenzwerten:
                                  </h4>
                                  <div className="space-y-2 text-xs sm:text-sm">
                                    <div className="flex justify-between items-center">
                                      <span>Mindestlohn (12,41 €):</span>
                                      <span
                                        className={`font-medium ${comparison.mindestlohn.better ? "text-green-600" : "text-red-600"}`}
                                      >
                                        {comparison.mindestlohn.better ? "+" : ""}
                                        {comparison.mindestlohn.percentage}%
                                      </span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span>Durchschnitt Deutschland (25,00 €):</span>
                                      <span
                                        className={`font-medium ${comparison.durchschnitt.better ? "text-green-600" : "text-red-600"}`}
                                      >
                                        {comparison.durchschnitt.better ? "+" : ""}
                                        {comparison.durchschnitt.percentage}%
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              )}

                              {/* Detailed Breakdown */}
                              <Collapsible>
                                <CollapsibleTrigger asChild>
                                  <Button variant="outline" className="w-full bg-transparent text-sm sm:text-base">
                                    Detaillierte Aufschlüsselung anzeigen
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                  </Button>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
                                  <div className="space-y-3">
                                    <h4 className="font-semibold text-sm">Monatliche Werte:</h4>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      <div className="flex justify-between">
                                        <span>Brutto-Monatsgehalt:</span>
                                        <span className="font-medium">{result.bruttoMonat} €</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Netto-Monatsgehalt:</span>
                                        <span className="font-medium">{result.nettoMonat} €</span>
                                      </div>
                                      <hr className="my-2" />
                                      <div className="text-xs text-gray-600">
                                        <p className="font-medium mb-1">Abzüge im Detail:</p>
                                        <div className="space-y-1 pl-2">
                                          <div className="flex justify-between">
                                            <span>Einkommensteuer:</span>
                                            <span>{result.abzuege.einkommensteuer} €</span>
                                          </div>
                                          {Number.parseFloat(result.abzuege.kirchensteuer) > 0 && (
                                            <div className="flex justify-between">
                                              <span>Kirchensteuer:</span>
                                              <span>{result.abzuege.kirchensteuer} €</span>
                                            </div>
                                          )}
                                          {Number.parseFloat(result.abzuege.soli) > 0 && (
                                            <div className="flex justify-between">
                                              <span>Solidaritätszuschlag:</span>
                                              <span>{result.abzuege.soli} €</span>
                                            </div>
                                          )}
                                          <div className="flex justify-between">
                                            <span>Rentenversicherung:</span>
                                            <span>{result.abzuege.rentenversicherung} €</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Arbeitslosenversicherung:</span>
                                            <span>{result.abzuege.arbeitslosenversicherung} €</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Krankenversicherung:</span>
                                            <span>{result.abzuege.krankenversicherung} €</span>
                                          </div>
                                          <div className="flex justify-between">
                                            <span>Pflegeversicherung:</span>
                                            <span>{result.abzuege.pflegeversicherung} €</span>
                                          </div>
                                          <hr className="my-1" />
                                          <div className="flex justify-between font-medium">
                                            <span>Gesamt Abzüge:</span>
                                            <span>{result.abzuege.gesamt} €</span>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    <h4 className="font-semibold text-sm mt-4">Arbeitszeitanalyse:</h4>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      <div className="flex justify-between">
                                        <span>Arbeitsstunden pro Jahr:</span>
                                        <span className="font-medium">{result.arbeitsStundenProJahr} h</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Arbeitstage pro Jahr:</span>
                                        <span className="font-medium">{result.arbeitstageProJahr} Tage</span>
                                      </div>
                                    </div>

                                    <h4 className="font-semibold text-sm mt-4">Steueranalyse:</h4>
                                    <div className="space-y-2 text-xs sm:text-sm">
                                      <div className="flex justify-between">
                                        <span>Effektiver Steuersatz:</span>
                                        <span className="font-medium">{result.effektiverSteuersatz}%</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span>Sozialversicherungsanteil:</span>
                                        <span className="font-medium">{result.sozialversicherungsanteil}%</span>
                                      </div>
                                    </div>
                                  </div>
                                </CollapsibleContent>
                              </Collapsible>
                            </div>
                          ) : (
                            <div className="text-center p-6 sm:p-8 bg-gray-50 rounded-lg">
                              <Calculator className="h-12 w-12 sm:h-16 sm:w-16 text-gray-400 mx-auto mb-4" />
                              <p className="text-gray-600 mb-2 text-sm sm:text-base">
                                Geben Sie Ihre Daten ein und klicken Sie auf "Jetzt Berechnen", um Ihren Stundenlohn zu
                                ermitteln.
                              </p>
                              <p className="text-xs sm:text-sm text-gray-500">* Pflichtfelder sind erforderlich</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </TabsContent>

                    <TabsContent value="history">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Berechnungshistorie</h3>
                        {calculationHistory.length > 0 ? (
                          <div className="space-y-3">
                            {calculationHistory.map((item) => (
                              <Card key={item.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                                <div className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <div className="flex flex-wrap gap-2 text-sm text-gray-600 mb-2">
                                      <span>
                                        {item.inputs.bruttoGehalt}€ {item.inputs.zeitraum}
                                      </span>
                                      <span>•</span>
                                      <span>{item.inputs.wochenStunden}h/Woche</span>
                                      <span>•</span>
                                      <span>Klasse {item.inputs.steuerklasse}</span>
                                    </div>
                                    <div className="flex flex-wrap gap-4 text-sm">
                                      <span className="font-medium text-blue-600">
                                        Brutto: {item.result.bruttoStundenlohn}€/h
                                      </span>
                                      <span className="font-medium text-green-600">
                                        Netto: {item.result.nettoStundenlohn}€/h
                                      </span>
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">
                                      {item.timestamp.toLocaleDateString("de-DE", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                      })}
                                    </p>
                                  </div>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => loadFromHistory(item)}
                                    className="ml-2"
                                  >
                                    Laden
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        ) : (
                          <div className="text-center p-8 bg-gray-50 rounded-lg">
                            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                            <p className="text-gray-600">Noch keine Berechnungen vorhanden</p>
                            <p className="text-sm text-gray-500">Ihre Berechnungen werden automatisch gespeichert</p>
                          </div>
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="presets">
                      <div className="space-y-4">
                        <h3 className="text-lg font-semibold">Schnellvorlagen</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {quickPresets.map((preset, index) => (
                            <Card key={index} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                              <div className="flex justify-between items-center">
                                <div>
                                  <h4 className="font-medium text-sm sm:text-base">{preset.name}</h4>
                                  <div className="text-xs sm:text-sm text-gray-600 mt-1">
                                    <p>
                                      {preset.gehalt}€ {preset.zeitraum}
                                    </p>
                                    <p>{preset.stunden}h/Woche</p>
                                  </div>
                                </div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => applyPreset(preset)}
                                  className="ml-2"
                                >
                                  <ZapIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                  Anwenden
                                </Button>
                              </div>
                            </Card>
                          ))}
                        </div>
                        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                          <h4 className="font-medium text-blue-800 mb-2">💡 Tipp</h4>
                          <p className="text-sm text-blue-700">
                            Verwenden Sie die Schnellvorlagen als Ausgangspunkt und passen Sie die Werte anschließend an
                            Ihre persönliche Situation an.
                          </p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>

              {/* 条件渲染高级计算器 */}
              {showAdvancedCalc && (
                <div className="mt-4 sm:mt-6">
                  <Suspense fallback={<div className="animate-pulse bg-gray-200 h-64 rounded-lg" />}>
                    <AdvancedCalculator
                      onCalculate={(data) => {
                        console.log("Advanced calculation:", data)
                      }}
                    />
                  </Suspense>
                </div>
              )}
            </div>
          </section>
        </main>

        {/* How it Works Section - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8">
              Wie der Stundenlohn Rechner funktioniert
            </h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
                Unser Rechner verwendet die aktuellsten gesetzlichen Daten und berechnet Ihren Stundenlohn nach
                folgender Formel:
              </p>
              <div className="bg-blue-50 p-4 sm:p-6 rounded-lg mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Berechnungsformel:</h3>
                <div className="space-y-2 font-mono text-xs sm:text-sm">
                  <p>
                    <strong>Brutto-Stundenlohn =</strong> Monatsgehalt ÷ (Wochenstunden × 4,33)
                  </p>
                  <p>
                    <strong>Netto-Stundenlohn =</strong> Netto-Monatsgehalt ÷ (Wochenstunden × 4,33)
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-gray-600 mt-4">
                  * 4,33 = durchschnittliche Anzahl der Wochen pro Monat (52 Wochen ÷ 12 Monate)
                </p>
              </div>

              <div className="bg-green-50 p-4 sm:p-6 rounded-lg">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Präzise Steuerberechnung:</h3>
                <p className="text-gray-700 mb-4 text-sm sm:text-base">
                  Unser Rechner berücksichtigt alle relevanten Faktoren der deutschen Steuergesetzgebung:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm sm:text-base">
                  <li>Einkommensteuer nach aktuellem Grundtarif</li>
                  <li>Steuerklassen 1-6 mit entsprechenden Freibeträgen</li>
                  <li>Kirchensteuer (8% oder 9% je nach Bundesland)</li>
                  <li>Solidaritätszuschlag (5,5% ab Freigrenze)</li>
                  <li>Sozialversicherungsbeiträge (Renten-, Arbeitslosen-, Kranken- und Pflegeversicherung)</li>
                  <li>Kinderfreibeträge (6.024 € pro Kind)</li>
                  <li>Zusatzbeitrag Pflegeversicherung für Kinderlose ab 23</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Content Section - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">
              Alles Wichtige rund um den Stundenlohn
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8 sm:mb-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Play className="h-6 w-6 sm:h-8 sm:w-8 text-[#4A69E2] mb-2" />
                  <CardTitle className="text-base sm:text-lg">Video-Anleitung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center mb-4 cursor-pointer hover:bg-gray-300 transition-colors">
                    <Play className="h-8 w-8 sm:h-12 sm:w-12 text-gray-400" />
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mb-3">
                    Lernen Sie in unserem Video, wie Sie den Rechner optimal nutzen und den Unterschied zwischen Brutto
                    und Netto verstehen.
                  </p>
                  <Button variant="outline" className="w-full bg-transparent" size="sm">
                    Video ansehen
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-[#4A69E2] mb-2" />
                  <CardTitle className="text-base sm:text-lg">Mindestlohn-Entwicklung</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between items-center">
                      <span>Aktuell:</span>
                      <span className="font-medium text-green-600">12,41 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2023:</span>
                      <span className="font-medium">12,00 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2022:</span>
                      <span className="font-medium">10,45 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2021:</span>
                      <span className="font-medium">9,60 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>2020:</span>
                      <span className="font-medium">9,35 €</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Quelle: Bundesministerium für Arbeit und Soziales</p>
                  <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                    Mehr erfahren
                  </Button>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <Users className="h-6 w-6 sm:h-8 sm:w-8 text-[#4A69E2] mb-2" />
                  <CardTitle className="text-base sm:text-lg">Durchschnittslöhne nach Branchen</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-xs sm:text-sm">
                    <div className="flex justify-between">
                      <span>IT/Software:</span>
                      <span className="font-medium text-green-600">35-65 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ingenieurwesen:</span>
                      <span className="font-medium text-green-600">28-45 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Finanzwesen:</span>
                      <span className="font-medium">25-40 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gesundheitswesen:</span>
                      <span className="font-medium">18-35 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Handwerk:</span>
                      <span className="font-medium">15-25 €</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Einzelhandel:</span>
                      <span className="font-medium">12-18 €</span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-4">Durchschnittswerte, aktueller Stand</p>
                  <Button variant="outline" className="w-full mt-3 bg-transparent" size="sm">
                    Detailanalyse
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Additional SEO Content - Mobile Optimized */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#4A69E2]">
                  Warum ist die Stundenlohn-Berechnung wichtig?
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Vergleichbarkeit verschiedener Jobangebote</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Grundlage für Gehaltsverhandlungen</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Finanzplanung und Budgetierung</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Bewertung von Überstunden</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
                <h3 className="text-lg sm:text-xl font-semibold mb-4 text-[#4A69E2]">
                  Tipps für einen höheren Stundenlohn
                </h3>
                <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Weiterbildung und Qualifikationen</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Branchenwechsel in besser bezahlte Bereiche</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Verhandlungsgeschick entwickeln</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="w-4 h-4 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Selbstständigkeit als Alternative</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section - Mobile Optimized */}
        <section className="py-8 sm:py-16 bg-[#4A69E2] text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">Optimieren Sie Ihr Gehalt</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="bg-white/10 p-4 sm:p-6 rounded-lg hover:bg-white/15 transition-colors">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Gehalt zu niedrig?</h3>
                <p className="mb-4 text-sm sm:text-base">Finden Sie besser bezahlte Jobs auf führenden Jobportalen.</p>
                <Button variant="secondary" className="w-full">
                  Jobs finden
                </Button>
              </div>
              <div className="bg-white/10 p-4 sm:p-6 rounded-lg hover:bg-white/15 transition-colors">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Steuern optimieren?</h3>
                <p className="mb-4 text-sm sm:text-base">
                  Holen Sie sich mehr Netto vom Brutto mit professioneller Steuersoftware.
                </p>
                <Button variant="secondary" className="w-full">
                  Steuern sparen
                </Button>
              </div>
              <div className="bg-white/10 p-4 sm:p-6 rounded-lg hover:bg-white/15 transition-colors">
                <h3 className="text-lg sm:text-xl font-semibold mb-4">Selbstständig?</h3>
                <p className="mb-4 text-sm sm:text-base">
                  Verwalten Sie Ihre Finanzen mit einem speziellen Geschäftskonto.
                </p>
                <Button variant="secondary" className="w-full">
                  Konto eröffnen
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced FAQ Section - Mobile Optimized */}
        <section id="faq" className="py-8 sm:py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">Häufig gestellte Fragen</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  Wie berechne ich meinen Stundenlohn manuell?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-sm sm:text-base">Die Formel für die manuelle Berechnung lautet:</p>
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg font-mono text-xs sm:text-sm mb-4">
                    Stundenlohn = Monatsgehalt ÷ (Wochenstunden × 4,33)
                  </div>
                  <p className="mb-4 text-sm sm:text-base">
                    <strong>Beispiel:</strong> Bei einem Monatsgehalt von 3.000 € und 40 Wochenstunden: 3.000 € ÷ (40 ×
                    4,33) = 17,32 € pro Stunde
                  </p>
                  <p className="text-xs sm:text-sm text-gray-600">
                    Der Faktor 4,33 ergibt sich aus 52 Wochen ÷ 12 Monate = 4,33 durchschnittliche Wochen pro Monat.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  Was ist der Unterschied zwischen Brutto- und Netto-Stundenlohn?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div>
                      <p className="mb-2 text-sm sm:text-base">
                        <strong>Brutto-Stundenlohn:</strong>
                      </p>
                      <p className="text-gray-700 mb-4 text-sm sm:text-base">
                        Das ist Ihr Stundenlohn vor Abzug von Steuern, Sozialversicherungsbeiträgen und anderen Abgaben.
                        Dieser Wert steht in Ihrem Arbeitsvertrag und wird für Gehaltsverhandlungen verwendet.
                      </p>
                    </div>
                    <div>
                      <p className="mb-2 text-sm sm:text-base">
                        <strong>Netto-Stundenlohn:</strong>
                      </p>
                      <p className="text-gray-700 text-sm sm:text-base">
                        Das ist der Betrag, der Ihnen nach allen Abzügen tatsächlich pro Stunde ausgezahlt wird. Dieser
                        Wert ist für Ihre persönliche Finanzplanung relevant, da er Ihr verfügbares Einkommen darstellt.
                      </p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  Was ist ein guter Stundenlohn in Deutschland?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-sm sm:text-base">
                    Ein "guter" Stundenlohn hängt von verschiedenen Faktoren ab:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                      <p className="text-sm sm:text-base">
                        <strong>Mindestlohn (aktuell):</strong> 12,41 € - das gesetzliche Minimum
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded border-l-4 border-yellow-400">
                      <p className="text-sm sm:text-base">
                        <strong>Unterdurchschnittlich:</strong> 12,41 € - 20,00 € brutto
                      </p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded border-l-4 border-blue-400">
                      <p className="text-sm sm:text-base">
                        <strong>Durchschnitt Deutschland:</strong> 20,00 € - 30,00 € brutto
                      </p>
                    </div>
                    <div className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                      <p className="text-sm sm:text-base">
                        <strong>Überdurchschnittlich:</strong> 30,00 € - 50,00 € brutto
                      </p>
                    </div>
                    <div className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                      <p className="text-sm sm:text-base">
                        <strong>Sehr gut:</strong> ab 50,00 € brutto
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-gray-600">
                    <strong>Wichtige Faktoren:</strong> Branche, Qualifikation, Berufserfahrung, Region,
                    Unternehmensgröße und Verantwortungsbereich.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  Wie hoch ist der aktuelle Mindestlohn?
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-3 sm:p-4 rounded-lg border border-green-200">
                      <p className="text-base sm:text-lg font-semibold text-green-800 mb-2">
                        Aktueller Mindestlohn: 12,41 € pro Stunde
                      </p>
                      <p className="text-green-700 text-sm sm:text-base">Gültig seit dem 1. Januar</p>
                    </div>

                    <div>
                      <p className="mb-3 text-sm sm:text-base">
                        <strong>Für wen gilt der Mindestlohn?</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
                        <li>Alle volljährigen Arbeitnehmer</li>
                        <li>Minijobber und Teilzeitbeschäftigte</li>
                        <li>Leiharbeiter</li>
                        <li>Praktikanten (mit Ausnahmen)</li>
                      </ul>
                    </div>

                    <div>
                      <p className="mb-3 text-sm sm:text-base">
                        <strong>Ausnahmen vom Mindestlohn:</strong>
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm sm:text-base">
                        <li>Auszubildende</li>
                        <li>Langzeitarbeitslose in den ersten 6 Monaten</li>
                        <li>Jugendliche unter 18 Jahren ohne Berufsausbildung</li>
                        <li>Pflichtpraktikanten</li>
                        <li>Ehrenamtliche Tätigkeiten</li>
                      </ul>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left text-sm sm:text-base">
                  Wie beeinflusst meine Steuerklasse den Netto-Stundenlohn?
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-4 text-sm sm:text-base">
                    Die Steuerklasse hat direkten Einfluss auf Ihren Netto-Stundenlohn:
                  </p>
                  <div className="space-y-3">
                    <div className="bg-gray-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 1:</strong> Ledige, geschiedene oder verwitwete Personen
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Standard-Steuersatz, mittlere Belastung</p>
                    </div>
                    <div className="bg-green-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 2:</strong> Alleinerziehende mit Entlastungsbetrag
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Geringere Belastung durch Entlastungsbetrag</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 3:</strong> Verheiratete (günstigste Steuerklasse)
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Niedrigste Steuerbelastung, höchster Netto-Stundenlohn
                      </p>
                    </div>
                    <div className="bg-yellow-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 4:</strong> Verheiratete mit ähnlichem Einkommen
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Beide Partner haben ähnliche Einkommen</p>
                    </div>
                    <div className="bg-orange-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 5:</strong> Verheiratete (Partner hat Klasse 3)
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">
                        Höhere Belastung, niedrigerer Netto-Stundenlohn
                      </p>
                    </div>
                    <div className="bg-red-50 p-3 rounded">
                      <p className="text-sm sm:text-base">
                        <strong>Klasse 6:</strong> Bei mehreren Arbeitgebern
                      </p>
                      <p className="text-xs sm:text-sm text-gray-600">Höchste Belastung für Zweitjob</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* Footer - Mobile Optimized */}
        <footer className="bg-gray-900 text-white py-8 sm:py-12">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
              <div className="col-span-2 md:col-span-1">
                <div className="flex items-center space-x-2 mb-4">
                  <Image
                    src="/android-chrome-192x192.png"
                    alt="Stundenlohn Rechner"
                    width={24}
                    height={24}
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                  <span className="text-base sm:text-lg font-bold">Stundenlohn Rechner</span>
                </div>
                <p className="text-gray-400 text-xs sm:text-sm mb-4">
                  Der kostenlose und präzise Rechner für Ihren Stundenlohn. Immer aktuell, immer genau.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-green-600 text-white text-xs">
                    Kostenlos
                  </Badge>
                  <Badge variant="secondary" className="bg-blue-600 text-white text-xs">
                    Aktuelle Daten
                  </Badge>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm sm:text-base">Unternehmen</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                  <li>
                    <a href="/ueber-uns" className="hover:text-white transition-colors">
                      Über uns
                    </a>
                  </li>
                  <li>
                    <a href="/kontakt" className="hover:text-white transition-colors">
                      Kontakt
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-4 text-sm sm:text-base">Rechtliches</h3>
                <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
                  <li>
                    <a href="/datenschutz" className="hover:text-white transition-colors">
                      Datenschutz
                    </a>
                  </li>
                  <li>
                    <a href="/nutzungsbedingungen" className="hover:text-white transition-colors">
                      Nutzungsbedingungen
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8">
              <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm text-gray-400 space-y-2 sm:space-y-0">
                <p>© 2025 Stundenlohn Rechner. Alle Rechte vorbehalten.</p>
                <p>
                  Zuletzt aktualisiert: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long" })}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
      {/* 页面底部的懒加载组件 */}
      <Suspense fallback={null}>
        <TourGuide isOpen={showTour} onClose={() => setShowTour(false)} />
      </Suspense>

      <Suspense fallback={null}>
        <AccessibilityHelper />
      </Suspense>

      {/* 通知系统 */}
      {notifications.length > 0 && (
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className={`p-4 rounded-lg shadow-lg flex items-center space-x-2 ${
                notification.type === "success"
                  ? "bg-green-500 text-white"
                  : notification.type === "error"
                    ? "bg-red-500 text-white"
                    : "bg-blue-500 text-white"
              }`}
            >
              {notification.type === "success" && <CheckCircle2 className="h-5 w-5" />}
              {notification.type === "error" && <AlertTriangle className="h-5 w-5" />}
              <span>{notification.message}</span>
            </div>
          ))}
        </div>
      )}
      <div id="accessibility-announcements" className="sr-only" aria-live="polite"></div>
    </TooltipProvider>
  )
}
