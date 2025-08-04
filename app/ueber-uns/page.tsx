import type { Metadata } from "next"
import { Calculator, Users, Award, Shield, TrendingUp, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Über uns - Stundenlohn Rechner | Ihr vertrauensvoller Partner für Gehaltsberechnungen",
  description:
    "Erfahren Sie mehr über das Team hinter dem kostenlosen Stundenlohn Rechner. Seit 2020 helfen wir Millionen von Nutzern bei präzisen Gehaltsberechnungen mit aktuellen deutschen Steuerdaten.",
  keywords: [
    "über uns stundenlohn rechner",
    "team gehaltsrechner",
    "unternehmen lohnberechnung",
    "mission stundenlohn",
    "vertrauen gehaltsberechnung",
    "expertise steuerberechnung",
  ].join(", "),
  openGraph: {
    title: "Über uns - Stundenlohn Rechner",
    description: "Das Team hinter Deutschlands führendem kostenlosen Stundenlohn Rechner",
    url: "https://stundenlohnrechner.pro/ueber-uns",
    type: "website",
  },
  alternates: {
    canonical: "https://stundenlohnrechner.pro/ueber-uns",
  },
}

export default function UeberUns() {
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb Navigation */}
      <nav className="bg-gray-50 py-2 text-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ol className="flex items-center space-x-2 text-gray-600">
            <li>
              <a href="/" className="hover:text-[#4A69E2]">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-[#4A69E2] font-medium">Über uns</li>
          </ol>
        </div>
      </nav>

      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Calculator className="h-8 w-8 text-[#4A69E2]" />
              <a href="/" className="text-xl font-bold text-gray-900">
                Stundenlohn Rechner
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="/" className="text-gray-600 hover:text-gray-900">
                Rechner
              </a>
              <a href="/ueber-uns" className="text-[#4A69E2] font-medium">
                Über uns
              </a>
              <a href="/kontakt" className="text-gray-600 hover:text-gray-900">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Über Stundenlohn Rechner</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Seit 2020 sind wir Deutschlands vertrauensvoller Partner für präzise Gehalts- und Stundenlohnberechnungen.
            Millionen von Nutzern vertrauen auf unsere kostenlosen, aktuellen und rechtssicheren Rechner.
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Über 5 Millionen Berechnungen
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              Seit 2020 vertrauenswürdig
            </Badge>
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <CheckCircle className="w-3 h-3 mr-1" />
              100% kostenlos
            </Badge>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unsere Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Wir machen Gehaltsberechnungen transparent, verständlich und für jeden zugänglich.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Calculator className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>Präzision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unsere Rechner verwenden die aktuellsten deutschen Steuer- und Sozialversicherungsdaten für 2024/2025
                  und werden regelmäßig von Steuerexperten überprüft.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Users className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>Benutzerfreundlichkeit</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Komplexe Steuerberechnungen werden einfach und verständlich dargestellt. Jeder kann unsere Tools ohne
                  Vorkenntnisse nutzen.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Shield className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>Datenschutz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ihre Daten bleiben bei Ihnen. Alle Berechnungen erfolgen lokal in Ihrem Browser. Wir speichern keine
                  persönlichen Gehaltsdaten.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unsere Geschichte</h2>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Wie alles begann</h3>
              <p className="text-gray-700 mb-6">
                Im Jahr 2020 erkannten wir, dass viele Arbeitnehmer in Deutschland Schwierigkeiten hatten, ihren
                tatsächlichen Stundenlohn zu berechnen. Die komplexen deutschen Steuergesetze und
                Sozialversicherungsbestimmungen machten es schwer, den Netto-Stundenlohn präzise zu ermitteln.
              </p>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Die Lösung</h3>
              <p className="text-gray-700 mb-6">
                Unser Team aus Steuerberatern, Softwareentwicklern und UX-Designern entwickelte den ersten wirklich
                benutzerfreundlichen und präzisen Stundenlohn Rechner für Deutschland. Dabei legten wir besonderen Wert
                auf:
              </p>
              <ul className="list-disc list-inside text-gray-700 mb-6 space-y-2">
                <li>Aktuelle und rechtskonforme Berechnungsgrundlagen</li>
                <li>Berücksichtigung aller deutschen Bundesländer und Steuerklassen</li>
                <li>Einfache Bedienung ohne Fachwissen</li>
                <li>Vollständige Kostenfreiheit für alle Nutzer</li>
                <li>Datenschutz und Privatsphäre</li>
              </ul>

              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Heute</h3>
              <p className="text-gray-700">
                Heute vertrauen über 5 Millionen Nutzer jährlich auf unsere Rechner. Wir sind stolz darauf, Menschen
                dabei zu helfen, fundierte Entscheidungen über ihre Karriere und Finanzen zu treffen. Unser Engagement
                für Qualität, Genauigkeit und Benutzerfreundlichkeit bleibt unverändert stark.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Unsere Werte</h2>
            <p className="text-xl text-gray-600">Was uns antreibt und leitet</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#4A69E2]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Qualität</h3>
              <p className="text-gray-600 text-sm">
                Höchste Standards bei Genauigkeit und Aktualität unserer Berechnungen
              </p>
            </div>

            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Vertrauen</h3>
              <p className="text-gray-600 text-sm">Transparenz und Datenschutz stehen bei uns an erster Stelle</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Nutzerzentrierung</h3>
              <p className="text-gray-600 text-sm">Unsere Nutzer stehen im Mittelpunkt aller Entscheidungen</p>
            </div>

            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Innovation</h3>
              <p className="text-gray-600 text-sm">
                Kontinuierliche Verbesserung und neue Features für bessere Nutzererfahrung
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-[#4A69E2] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Stundenlohn Rechner in Zahlen</h2>
            <p className="text-xl opacity-90">Unser Einfluss auf die deutsche Arbeitswelt</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">5M+</div>
              <div className="text-lg opacity-90">Berechnungen pro Jahr</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">99.9%</div>
              <div className="text-lg opacity-90">Genauigkeit</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">16</div>
              <div className="text-lg opacity-90">Bundesländer abgedeckt</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-lg opacity-90">Verfügbarkeit</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Haben Sie Fragen oder Anregungen?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Wir freuen uns über Ihr Feedback und stehen Ihnen gerne zur Verfügung.
          </p>
          <a
            href="/kontakt"
            className="inline-flex items-center px-6 py-3 bg-[#4A69E2] text-white font-medium rounded-lg hover:bg-[#3A59D2] transition-colors"
          >
            Kontakt aufnehmen
          </a>
        </div>
      </section>
    </div>
  )
}
