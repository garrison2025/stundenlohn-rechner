import type { Metadata } from "next"
import { Calculator, Mail, Clock, MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export const metadata: Metadata = {
  title: "Kontakt - Stundenlohn Rechner | Wir helfen Ihnen gerne weiter",
  description:
    "Kontaktieren Sie das Team von Stundenlohn Rechner. Wir beantworten Ihre Fragen zu Gehaltsberechnungen, Steuern und unserem kostenlosen Rechner. E-Mail: info@stundenlohnrechner.pro",
  keywords: [
    "kontakt stundenlohn rechner",
    "hilfe gehaltsberechnung",
    "support lohnrechner",
    "fragen stundenlohn",
    "kundenservice gehaltsrechner",
    "info@stundenlohnrechner.pro",
  ].join(", "),
  openGraph: {
    title: "Kontakt - Stundenlohn Rechner",
    description: "Kontaktieren Sie uns für Fragen zu Gehaltsberechnungen und unserem kostenlosen Rechner",
    url: "https://stundenlohnrechner.pro/kontakt",
    type: "website",
  },
  alternates: {
    canonical: "https://stundenlohnrechner.pro/kontakt",
  },
}

export default function Kontakt() {
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
            <li className="text-[#4A69E2] font-medium">Kontakt</li>
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
              <a href="/ueber-uns" className="text-gray-600 hover:text-gray-900">
                Über uns
              </a>
              <a href="/kontakt" className="text-[#4A69E2] font-medium">
                Kontakt
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Kontakt</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Haben Sie Fragen zu unserem Stundenlohn Rechner oder benötigen Sie Hilfe bei Gehaltsberechnungen? Wir sind
            für Sie da und helfen gerne weiter.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Mail className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>E-Mail</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Schreiben Sie uns eine E-Mail. Wir antworten in der Regel innerhalb von 24 Stunden.
                </p>
                <a href="mailto:info@stundenlohnrechner.pro" className="text-[#4A69E2] font-medium hover:underline">
                  info@stundenlohnrechner.pro
                </a>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <Clock className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>Antwortzeiten</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Unsere durchschnittlichen Antwortzeiten:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>E-Mail:</span>
                    <span className="font-medium">24 Stunden</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kontaktformular:</span>
                    <span className="font-medium">48 Stunden</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <MessageSquare className="h-12 w-12 text-[#4A69E2] mx-auto mb-4" />
                <CardTitle>Support-Sprachen</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Wir bieten Support in folgenden Sprachen:</p>
                <div className="space-y-2 text-sm">
                  <div className="font-medium text-[#4A69E2]">🇩🇪 Deutsch (Hauptsprache)</div>
                  <div className="text-gray-600">🇬🇧 Englisch (Grundkenntnisse)</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="max-w-2xl mx-auto">
            <Card className="shadow-lg">
              <CardHeader className="bg-[#4A69E2] text-white rounded-t-lg">
                <CardTitle className="text-2xl text-center">Kontaktformular</CardTitle>
                <p className="text-center opacity-90">
                  Nutzen Sie unser Kontaktformular für schnelle und direkte Kommunikation
                </p>
              </CardHeader>
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="vorname">Vorname *</Label>
                      <Input id="vorname" type="text" placeholder="Ihr Vorname" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="nachname">Nachname *</Label>
                      <Input id="nachname" type="text" placeholder="Ihr Nachname" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-Mail-Adresse *</Label>
                    <Input id="email" type="email" placeholder="ihre.email@beispiel.de" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="betreff">Betreff *</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Wählen Sie einen Betreff" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="allgemeine-frage">Allgemeine Frage</SelectItem>
                        <SelectItem value="rechner-problem">Problem mit dem Rechner</SelectItem>
                        <SelectItem value="steuer-frage">Frage zu Steuerberechnung</SelectItem>
                        <SelectItem value="feature-wunsch">Feature-Wunsch</SelectItem>
                        <SelectItem value="fehler-melden">Fehler melden</SelectItem>
                        <SelectItem value="partnership">Partnerschaft/Kooperation</SelectItem>
                        <SelectItem value="presse">Presse-Anfrage</SelectItem>
                        <SelectItem value="sonstiges">Sonstiges</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="nachricht">Ihre Nachricht *</Label>
                    <Textarea
                      id="nachricht"
                      placeholder="Beschreiben Sie Ihr Anliegen so detailliert wie möglich..."
                      rows={6}
                      required
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-800 mb-2">💡 Tipp für schnellere Hilfe:</h4>
                    <ul className="text-sm text-blue-700 space-y-1">
                      <li>• Beschreiben Sie Ihr Problem so genau wie möglich</li>
                      <li>• Geben Sie bei Rechner-Problemen Ihre Eingabewerte an</li>
                      <li>• Erwähnen Sie Ihr Betriebssystem und Browser</li>
                      <li>• Fügen Sie Screenshots bei, wenn hilfreich</li>
                    </ul>
                  </div>

                  <div className="text-xs text-gray-500">
                    * Pflichtfelder. Mit dem Absenden stimmen Sie unserer{" "}
                    <a href="/datenschutz" className="text-[#4A69E2] hover:underline">
                      Datenschutzrichtlinie
                    </a>{" "}
                    zu.
                  </div>

                  <Button type="submit" className="w-full bg-[#34D399] hover:bg-[#10B981] text-white text-lg py-3">
                    Nachricht senden
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
            <p className="text-xl text-gray-600">Vielleicht finden Sie hier bereits die Antwort auf Ihre Frage</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Ist der Rechner wirklich kostenlos?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ja, unser Stundenlohn Rechner ist vollständig kostenlos und wird es auch bleiben. Es gibt keine
                  versteckten Kosten oder Premium-Features.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Wie aktuell sind die Steuerdaten?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Unsere Berechnungen basieren auf den aktuellsten deutschen Steuer- und Sozialversicherungsdaten für
                  2024/2025. Wir aktualisieren diese regelmäßig.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Werden meine Daten gespeichert?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Nein, alle Berechnungen erfolgen lokal in Ihrem Browser. Wir speichern keine persönlichen Gehaltsdaten
                  auf unseren Servern.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-lg">Kann ich den Rechner für mein Unternehmen nutzen?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  Ja, unser Rechner kann sowohl privat als auch geschäftlich genutzt werden. Für spezielle
                  Unternehmensanforderungen kontaktieren Sie uns gerne.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Ihre Frage war nicht dabei?</p>
            <a
              href="mailto:info@stundenlohnrechner.pro"
              className="inline-flex items-center px-6 py-3 bg-[#4A69E2] text-white font-medium rounded-lg hover:bg-[#3A59D2] transition-colors"
            >
              <Mail className="w-4 h-4 mr-2" />
              Direkt per E-Mail fragen
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
