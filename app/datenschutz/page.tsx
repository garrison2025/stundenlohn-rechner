import type { Metadata } from "next"
import { Calculator, Shield, Eye, Lock, UserCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Datenschutzrichtlinie - Stundenlohn Rechner | Ihre Privatsphäre ist uns wichtig",
  description:
    "Datenschutzrichtlinie von Stundenlohn Rechner. Erfahren Sie, wie wir Ihre Daten schützen und verarbeiten. DSGVO-konform und transparent. Letzte Aktualisierung: August 2025.",
  keywords: [
    "datenschutz stundenlohn rechner",
    "privacy policy gehaltsrechner",
    "dsgvo konform",
    "datenschutzrichtlinie",
    "privatsphäre schutz",
    "datenverarbeitung",
  ].join(", "),
  openGraph: {
    title: "Datenschutzrichtlinie - Stundenlohn Rechner",
    description: "Unsere Datenschutzrichtlinie - transparent und DSGVO-konform",
    url: "https://stundenlohnrechner.pro/datenschutz",
    type: "website",
  },
  alternates: {
    canonical: "https://stundenlohnrechner.pro/datenschutz",
  },
}

export default function Datenschutz() {
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
            <li className="text-[#4A69E2] font-medium">Datenschutz</li>
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
          <Shield className="h-16 w-16 text-[#4A69E2] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Datenschutzrichtlinie</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ihre Privatsphäre und der Schutz Ihrer Daten haben für uns höchste Priorität. Diese Datenschutzrichtlinie
            erklärt transparent, wie wir mit Ihren Daten umgehen.
          </p>
          <div className="mt-6 text-sm text-gray-500">Letzte Aktualisierung: 3. August 2025 | DSGVO-konform</div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8 border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <strong>Kurz zusammengefasst:</strong> Wir speichern keine persönlichen Gehaltsdaten. Alle Berechnungen
              erfolgen lokal in Ihrem Browser. Wir sammeln nur anonyme Nutzungsstatistiken zur Verbesserung unseres
              Services.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <Lock className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Lokale Berechnung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Ihre Gehaltsdaten verlassen niemals Ihren Browser. Alle Berechnungen erfolgen lokal auf Ihrem Gerät.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Eye className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Transparenz</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Wir erklären klar und verständlich, welche Daten wir sammeln und wofür wir sie verwenden.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <UserCheck className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Ihre Rechte</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Sie haben jederzeit die volle Kontrolle über Ihre Daten und können diese einsehen oder löschen lassen.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Privacy Policy */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Verantwortlicher</h2>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    <strong>Stundenlohn Rechner</strong>
                  </p>
                  <p className="mb-2">E-Mail: info@stundenlohnrechner.pro</p>
                  <p className="mb-2">Website: https://stundenlohnrechner.pro</p>
                </div>
                <p className="text-gray-700 mt-4">
                  Wir sind verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website und
                  stehen Ihnen für alle datenschutzrechtlichen Fragen zur Verfügung.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Welche Daten wir sammeln</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Berechnungsdaten</h3>
                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400 mb-4">
                  <p className="text-green-800">
                    <strong>Wichtig:</strong> Alle Ihre Eingaben (Gehalt, Steuerklasse, etc.) werden ausschließlich
                    lokal in Ihrem Browser verarbeitet und niemals an unsere Server übertragen.
                  </p>
                </div>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Bruttogehalt und Arbeitszeiten - nur lokal gespeichert</li>
                  <li>Steuerklasse und Bundesland - nur lokal gespeichert</li>
                  <li>Berechnungshistorie - nur in Ihrem Browser (localStorage)</li>
                  <li>Persönliche Einstellungen - nur lokal gespeichert</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.2 Technische Daten</h3>
                <p className="text-gray-700 mb-3">
                  Für den Betrieb der Website sammeln wir automatisch folgende technische Informationen:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>IP-Adresse (anonymisiert nach 24 Stunden)</li>
                  <li>Browser-Typ und -Version</li>
                  <li>Betriebssystem</li>
                  <li>Bildschirmauflösung</li>
                  <li>Besuchte Seiten und Verweildauer</li>
                  <li>Referrer-URL (von welcher Seite Sie kommen)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">2.3 Kontaktdaten</h3>
                <p className="text-gray-700 mb-3">
                  Wenn Sie uns über das Kontaktformular oder per E-Mail kontaktieren, speichern wir:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Ihren Namen</li>
                  <li>Ihre E-Mail-Adresse</li>
                  <li>Ihre Nachricht</li>
                  <li>Zeitpunkt der Kontaktaufnahme</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Wofür wir Ihre Daten verwenden</h2>

                <div className="space-y-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Bereitstellung des Rechners</h4>
                    <p className="text-blue-700 text-sm">
                      Ihre Berechnungsdaten werden ausschließlich lokal verarbeitet, um Ihnen präzise
                      Stundenlohn-Berechnungen zu ermöglichen.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Verbesserung des Services</h4>
                    <p className="text-green-700 text-sm">
                      Anonyme Nutzungsstatistiken helfen uns zu verstehen, wie unser Rechner verwendet wird und wo wir
                      Verbesserungen vornehmen können.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Kundenbetreuung</h4>
                    <p className="text-purple-700 text-sm">
                      Kontaktdaten verwenden wir ausschließlich zur Beantwortung Ihrer Anfragen und zur Bereitstellung
                      von Support.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Rechtliche Verpflichtungen</h4>
                    <p className="text-orange-700 text-sm">
                      In seltenen Fällen können wir verpflichtet sein, Daten aufgrund gesetzlicher Bestimmungen zu
                      verarbeiten oder weiterzugeben.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Rechtsgrundlagen</h2>
                <p className="text-gray-700 mb-4">
                  Die Verarbeitung Ihrer personenbezogenen Daten erfolgt auf Grundlage folgender Rechtsgrundlagen der
                  DSGVO:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>
                    <strong>Art. 6 Abs. 1 lit. a DSGVO:</strong> Einwilligung (z.B. bei Kontaktaufnahme)
                  </li>
                  <li>
                    <strong>Art. 6 Abs. 1 lit. b DSGVO:</strong> Vertragserfüllung (Bereitstellung des Rechners)
                  </li>
                  <li>
                    <strong>Art. 6 Abs. 1 lit. f DSGVO:</strong> Berechtigte Interessen (Website-Betrieb und
                    -Verbesserung)
                  </li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Datenweitergabe</h2>
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400 mb-4">
                  <p className="text-red-800">
                    <strong>Grundsatz:</strong> Wir geben Ihre personenbezogenen Daten nicht an Dritte weiter, außer in
                    den unten genannten Ausnahmefällen.
                  </p>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Technische Dienstleister</h3>
                <p className="text-gray-700 mb-3">
                  Für den Betrieb unserer Website nutzen wir folgende vertrauensvolle Dienstleister:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>
                    <strong>Hosting-Provider:</strong> Für die Bereitstellung der Website (nur technische Daten)
                  </li>
                  <li>
                    <strong>Analytics-Dienste:</strong> Für anonyme Nutzungsstatistiken (IP-anonymisiert)
                  </li>
                  <li>
                    <strong>E-Mail-Provider:</strong> Für die Bearbeitung Ihrer Kontaktanfragen
                  </li>
                </ul>
                <p className="text-gray-700">
                  Alle Dienstleister sind vertraglich zur Einhaltung der DSGVO verpflichtet und verarbeiten Daten
                  ausschließlich in unserem Auftrag.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3 mt-6">5.2 Gesetzliche Verpflichtungen</h3>
                <p className="text-gray-700">
                  In seltenen Fällen können wir verpflichtet sein, Daten an Behörden weiterzugeben, wenn dies gesetzlich
                  vorgeschrieben ist oder zur Durchsetzung unserer Rechte erforderlich ist.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Speicherdauer</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Berechnungsdaten</h4>
                    <p className="text-sm text-gray-700">
                      Werden nur lokal in Ihrem Browser gespeichert und können jederzeit von Ihnen gelöscht werden.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Technische Daten</h4>
                    <p className="text-sm text-gray-700">
                      IP-Adressen werden nach 24 Stunden anonymisiert. Andere technische Daten werden nach 26 Monaten
                      gelöscht.
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Kontaktdaten</h4>
                    <p className="text-sm text-gray-700">
                      Werden nach Bearbeitung Ihrer Anfrage gelöscht, spätestens jedoch nach 3 Jahren.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Ihre Rechte</h2>
                <p className="text-gray-700 mb-4">Sie haben folgende Rechte bezüglich Ihrer personenbezogenen Daten:</p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-800 mb-2">Auskunftsrecht</h4>
                    <p className="text-blue-700 text-sm">
                      Sie können jederzeit Auskunft über die von uns gespeicherten Daten verlangen.
                    </p>
                  </div>

                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Berichtigungsrecht</h4>
                    <p className="text-green-700 text-sm">Unrichtige Daten können Sie jederzeit korrigieren lassen.</p>
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-red-800 mb-2">Löschungsrecht</h4>
                    <p className="text-red-700 text-sm">
                      Sie können die Löschung Ihrer Daten verlangen, sofern keine gesetzlichen Aufbewahrungspflichten
                      bestehen.
                    </p>
                  </div>

                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-800 mb-2">Widerspruchsrecht</h4>
                    <p className="text-purple-700 text-sm">
                      Sie können der Verarbeitung Ihrer Daten jederzeit widersprechen.
                    </p>
                  </div>

                  <div className="bg-yellow-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-yellow-800 mb-2">Datenübertragbarkeit</h4>
                    <p className="text-yellow-700 text-sm">
                      Sie können Ihre Daten in einem strukturierten Format erhalten.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Beschwerde</h4>
                    <p className="text-orange-700 text-sm">
                      Sie können sich bei der zuständigen Datenschutzbehörde beschweren.
                    </p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-[#4A69E2] text-white rounded-lg">
                  <h4 className="font-semibold mb-2">Kontakt für Datenschutzanfragen</h4>
                  <p className="text-sm">
                    Für alle Fragen zum Datenschutz oder zur Ausübung Ihrer Rechte kontaktieren Sie uns unter:
                  </p>
                  <p className="font-medium mt-2">info@stundenlohnrechner.pro</p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies und lokale Speicherung</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Notwendige Cookies</h3>
                <p className="text-gray-700 mb-3">
                  Wir verwenden nur technisch notwendige Cookies für den Betrieb der Website:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Session-Cookies für die Funktionalität</li>
                  <li>Einstellungs-Cookies für Ihre Präferenzen</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Lokale Speicherung (localStorage)</h3>
                <p className="text-gray-700 mb-3">
                  Ihre Berechnungsdaten und Einstellungen werden lokal in Ihrem Browser gespeichert:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Berechnungshistorie</li>
                  <li>Gespeicherte Eingabewerte</li>
                  <li>Persönliche Einstellungen</li>
                </ul>
                <p className="text-gray-700 mt-3">
                  Diese Daten können Sie jederzeit über Ihre Browser-Einstellungen löschen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Datensicherheit</h2>
                <p className="text-gray-700 mb-4">
                  Wir setzen umfassende technische und organisatorische Maßnahmen zum Schutz Ihrer Daten ein:
                </p>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                    <h4 className="font-semibold text-green-800 mb-2">Technische Sicherheit</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• SSL/TLS-Verschlüsselung</li>
                      <li>• Sichere Server-Infrastruktur</li>
                      <li>• Regelmäßige Sicherheitsupdates</li>
                      <li>• Firewall-Schutz</li>
                    </ul>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400">
                    <h4 className="font-semibold text-blue-800 mb-2">Organisatorische Sicherheit</h4>
                    <ul className="text-blue-700 text-sm space-y-1">
                      <li>• Zugriffsbeschränkungen</li>
                      <li>• Mitarbeiterschulungen</li>
                      <li>• Datenschutz-Folgenabschätzung</li>
                      <li>• Regelmäßige Sicherheitsaudits</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Änderungen dieser Datenschutzrichtlinie</h2>
                <p className="text-gray-700 mb-4">
                  Wir behalten uns vor, diese Datenschutzrichtlinie zu aktualisieren, um sie an geänderte
                  Rechtsvorschriften oder Geschäftspraktiken anzupassen.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                  <p className="text-yellow-800">
                    <strong>Hinweis:</strong> Wesentliche Änderungen werden wir Ihnen rechtzeitig mitteilen. Die
                    aktuelle Version finden Sie immer unter https://stundenlohnrechner.pro/datenschutz
                  </p>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 text-center">
                  Diese Datenschutzrichtlinie wurde zuletzt am 3. August 2025 aktualisiert.
                  <br />
                  Bei Fragen kontaktieren Sie uns unter: info@stundenlohnrechner.pro
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
