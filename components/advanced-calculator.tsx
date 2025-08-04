"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Clock, Gift, TrendingUp } from "lucide-react"
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"

interface AdvancedCalculatorProps {
  onCalculate: (data: any) => void
}

export default function AdvancedCalculator({ onCalculate }: AdvancedCalculatorProps) {
  // 基础数据
  const [basicData, setBasicData] = useState({
    bruttoGehalt: "3000",
    zeitraum: "Monat",
    wochenStunden: "40.00",
  })

  // 加班费计算
  const [overtimeData, setOvertimeData] = useState({
    ueberstundenProWoche: "0",
    ueberstundenzuschlag: "25", // 25% Zuschlag
    nachtarbeitStunden: "0",
    nachtarbeitZuschlag: "25",
    sonntagsarbeitStunden: "0",
    sonntagsarbeitZuschlag: "50",
  })

  // 奖金和额外收入
  const [bonusData, setBonusData] = useState({
    weihnachtsgeld: "0",
    urlaubsgeld: "0",
    dreizehnterMonat: false,
    vierzehnterMonat: false,
    leistungspraemie: "0",
    provisionen: "0",
  })

  // 福利和津贴
  const [benefitsData, setBenefitsData] = useState({
    firmenwagen: false,
    firmenwagenWert: "0",
    essenszuschuss: "0",
    fahrtkosten: "0",
    homeofficeZuschuss: "0",
    fortbildungskosten: "0",
    kinderbetreuung: "0",
  })

  const calculateAdvanced = () => {
    const result = {
      basic: basicData,
      overtime: overtimeData,
      bonus: bonusData,
      benefits: benefitsData,
      // 这里会进行复杂的计算
      calculatedValues: calculateComplexSalary(),
    }

    onCalculate(result)
  }

  const calculateComplexSalary = () => {
    const bruttoMonat = Number.parseFloat(basicData.bruttoGehalt)
    const wochenStunden = Number.parseFloat(basicData.wochenStunden)
    const ueberstunden = Number.parseFloat(overtimeData.ueberstundenProWoche)

    // 基础计算
    const grundStundenlohn = bruttoMonat / (wochenStunden * 4.33)

    // 加班费计算
    const ueberstundenlohn = grundStundenlohn * (1 + Number.parseFloat(overtimeData.ueberstundenzuschlag) / 100)
    const ueberstundenGeld = ueberstunden * ueberstundenlohn * 4.33

    // 年度额外收入
    const weihnachtsgeld = Number.parseFloat(bonusData.weihnachtsgeld)
    const urlaubsgeld = Number.parseFloat(bonusData.urlaubsgeld)
    const dreizehnter = bonusData.dreizehnterMonat ? bruttoMonat : 0
    const vierzehnter = bonusData.vierzehnterMonat ? bruttoMonat : 0

    const jahresExtras = weihnachtsgeld + urlaubsgeld + dreizehnter + vierzehnter
    const monatlicheExtras = jahresExtras / 12

    // 福利价值
    const firmenwagenWert = benefitsData.firmenwagen ? Number.parseFloat(benefitsData.firmenwagenWert) : 0
    const sonstigeBenefits =
      Number.parseFloat(benefitsData.essenszuschuss) +
      Number.parseFloat(benefitsData.homeofficeZuschuss) +
      Number.parseFloat(benefitsData.kinderbetreuung)

    const gesamtBruttoMonat = bruttoMonat + ueberstundenGeld + monatlicheExtras + firmenwagenWert + sonstigeBenefits
    const gesamtStundenlohn = gesamtBruttoMonat / (wochenStunden * 4.33)

    return {
      grundStundenlohn: grundStundenlohn.toFixed(2),
      ueberstundenlohn: ueberstundenlohn.toFixed(2),
      gesamtStundenlohn: gesamtStundenlohn.toFixed(2),
      monatlicheExtras: monatlicheExtras.toFixed(2),
      jahresExtras: jahresExtras.toFixed(2),
      benefitsWert: (firmenwagenWert + sonstigeBenefits).toFixed(2),
      gesamtBruttoMonat: gesamtBruttoMonat.toFixed(2),
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Calculator className="h-5 w-5 mr-2" />
          Erweiterte Gehaltsberechnung
        </CardTitle>
      </CardHeader>
      <CardContent>
        <TooltipProvider>
          <Tabs defaultValue="overtime" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overtime" className="text-xs">
                <Clock className="h-4 w-4 mr-1" />
                Überstunden
              </TabsTrigger>
              <TabsTrigger value="bonus" className="text-xs">
                <Gift className="h-4 w-4 mr-1" />
                Boni
              </TabsTrigger>
              <TabsTrigger value="benefits" className="text-xs">
                <TrendingUp className="h-4 w-4 mr-1" />
                Benefits
              </TabsTrigger>
              <TabsTrigger value="result" className="text-xs">
                Ergebnis
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overtime" className="space-y-4">
              <h3 className="font-semibold">Überstunden und Zuschläge</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ueberstunden">Überstunden pro Woche</Label>
                  <Input
                    id="ueberstunden"
                    type="number"
                    value={overtimeData.ueberstundenProWoche}
                    onChange={(e) => setOvertimeData({ ...overtimeData, ueberstundenProWoche: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ueberstundenzuschlag">Überstundenzuschlag (%)</Label>
                  <Input
                    id="ueberstundenzuschlag"
                    type="number"
                    value={overtimeData.ueberstundenzuschlag}
                    onChange={(e) => setOvertimeData({ ...overtimeData, ueberstundenzuschlag: e.target.value })}
                    placeholder="25"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nachtarbeit">Nachtarbeit Stunden/Woche</Label>
                  <Input
                    id="nachtarbeit"
                    type="number"
                    value={overtimeData.nachtarbeitStunden}
                    onChange={(e) => setOvertimeData({ ...overtimeData, nachtarbeitStunden: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nachtarbeitZuschlag">Nachtarbeit Zuschlag (%)</Label>
                  <Input
                    id="nachtarbeitZuschlag"
                    type="number"
                    value={overtimeData.nachtarbeitZuschlag}
                    onChange={(e) => setOvertimeData({ ...overtimeData, nachtarbeitZuschlag: e.target.value })}
                    placeholder="25"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bonus" className="space-y-4">
              <h3 className="font-semibold">Sonderzahlungen und Boni</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weihnachtsgeld">Weihnachtsgeld (€)</Label>
                  <Input
                    id="weihnachtsgeld"
                    type="number"
                    value={bonusData.weihnachtsgeld}
                    onChange={(e) => setBonusData({ ...bonusData, weihnachtsgeld: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="urlaubsgeld">Urlaubsgeld (€)</Label>
                  <Input
                    id="urlaubsgeld"
                    type="number"
                    value={bonusData.urlaubsgeld}
                    onChange={(e) => setBonusData({ ...bonusData, urlaubsgeld: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="dreizehnter"
                    checked={bonusData.dreizehnterMonat}
                    onCheckedChange={(checked) => setBonusData({ ...bonusData, dreizehnterMonat: checked === true })}
                  />
                  <Label htmlFor="dreizehnter">13. Monatsgehalt</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-gray-400 text-sm">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Ein zusätzliches Monatsgehalt, meist im Dezember</p>
                    </TooltipContent>
                  </Tooltip>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vierzehnter"
                    checked={bonusData.vierzehnterMonat}
                    onCheckedChange={(checked) => setBonusData({ ...bonusData, vierzehnterMonat: checked === true })}
                  />
                  <Label htmlFor="vierzehnter">14. Monatsgehalt</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-gray-400 text-sm">ⓘ</span>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Zusätzliches Urlaubsgeld, meist im Sommer</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="leistungspraemie">Leistungsprämie (€/Jahr)</Label>
                  <Input
                    id="leistungspraemie"
                    type="number"
                    value={bonusData.leistungspraemie}
                    onChange={(e) => setBonusData({ ...bonusData, leistungspraemie: e.target.value })}
                    placeholder="0"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="provisionen">Provisionen (€/Monat)</Label>
                  <Input
                    id="provisionen"
                    type="number"
                    value={bonusData.provisionen}
                    onChange={(e) => setBonusData({ ...bonusData, provisionen: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="benefits" className="space-y-4">
              <h3 className="font-semibold">Zusatzleistungen und Benefits</h3>

              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="firmenwagen"
                    checked={benefitsData.firmenwagen}
                    onCheckedChange={(checked) => setBenefitsData({ ...benefitsData, firmenwagen: checked === true })}
                  />
                  <Label htmlFor="firmenwagen">Firmenwagen</Label>
                </div>

                {benefitsData.firmenwagen && (
                  <div className="ml-6 space-y-2">
                    <Label htmlFor="firmenwagenWert">Geldwerter Vorteil (€/Monat)</Label>
                    <Input
                      id="firmenwagenWert"
                      type="number"
                      value={benefitsData.firmenwagenWert}
                      onChange={(e) => setBenefitsData({ ...benefitsData, firmenwagenWert: e.target.value })}
                      placeholder="300"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="essenszuschuss">Essenszuschuss (€/Monat)</Label>
                    <Input
                      id="essenszuschuss"
                      type="number"
                      value={benefitsData.essenszuschuss}
                      onChange={(e) => setBenefitsData({ ...benefitsData, essenszuschuss: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="homeoffice">Homeoffice-Zuschuss (€/Monat)</Label>
                    <Input
                      id="homeoffice"
                      type="number"
                      value={benefitsData.homeofficeZuschuss}
                      onChange={(e) => setBenefitsData({ ...benefitsData, homeofficeZuschuss: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="kinderbetreuung">Kinderbetreuung (€/Monat)</Label>
                    <Input
                      id="kinderbetreuung"
                      type="number"
                      value={benefitsData.kinderbetreuung}
                      onChange={(e) => setBenefitsData({ ...benefitsData, kinderbetreuung: e.target.value })}
                      placeholder="0"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fortbildung">Fortbildungskosten (€/Jahr)</Label>
                    <Input
                      id="fortbildung"
                      type="number"
                      value={benefitsData.fortbildungskosten}
                      onChange={(e) => setBenefitsData({ ...benefitsData, fortbildungskosten: e.target.value })}
                      placeholder="0"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="result" className="space-y-4">
              <div className="text-center">
                <Button onClick={calculateAdvanced} className="w-full bg-[#34D399] hover:bg-[#10B981] text-white">
                  Erweiterte Berechnung starten
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
