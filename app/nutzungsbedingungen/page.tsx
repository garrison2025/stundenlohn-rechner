import type { Metadata } from "next"
import { Calculator, FileText, AlertTriangle, CheckCircle, Scale, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export const metadata: Metadata = {
  title: "Nutzungsbedingungen - Stundenlohn Rechner | Rechtliche Hinweise zur Nutzung",
  description:
    "Nutzungsbedingungen für den kostenlosen Stundenlohn Rechner. Rechtliche Hinweise, Haftungsausschluss und Nutzungsrechte. Letzte Aktualisierung: August 2025.",
  keywords: [
    "nutzungsbedingungen stundenlohn rechner",
    "agb gehaltsrechner",
    "terms of service",
    "rechtliche hinweise",
    "haftungsausschluss",
    "nutzungsrechte",
  ].join(", "),
  openGraph: {
    title: "Nutzungsbedingungen - Stundenlohn Rechner",
    description: "Rechtliche Hinweise und Nutzungsbedingungen für unseren kostenlosen Stundenlohn Rechner",
    url: "https://stundenlohnrechner.pro/nutzungsbedingungen",
    type: "website",
  },
  alternates: {
    canonical: "https://stundenlohnrechner.pro/nutzungsbedingungen",
  },
}

export default function Nutzungsbedingungen() {
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
            <li className="text-[#4A69E2] font-medium">Nutzungsbedingungen</li>
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
          <FileText className="h-16 w-16 text-[#4A69E2] mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Nutzungsbedingungen</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Diese Nutzungsbedingungen regeln die Verwendung unseres kostenlosen Stundenlohn Rechners. Durch die Nutzung
            unserer Website stimmen Sie diesen Bedingungen zu.
          </p>
          <div className="mt-6 text-sm text-gray-500">Letzte Aktualisierung: 3. August 2025 | Gültig ab sofort</div>
        </div>
      </section>

      {/* Quick Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Alert className="mb-8 border-blue-200 bg-blue-50">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Kurz zusammengefasst:</strong> Unser Rechner ist kostenlos nutzbar. Wir übernehmen keine Haftung
              für Berechnungsergebnisse. Die Nutzung erfolgt auf eigene Verantwortung. Kommerzielle Nutzung ist
              gestattet.
            </AlertDescription>
          </Alert>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardHeader>
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Kostenlose Nutzung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Unser Stundenlohn Rechner ist vollständig kostenlos und ohne Registrierung nutzbar.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Scale className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Faire Nutzung</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Nutzen Sie unseren Service verantwortungsvoll und respektieren Sie unsere Serverressourcen.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Shield className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <CardTitle className="text-lg">Haftungsausschluss</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">
                  Berechnungen dienen der Orientierung. Für rechtliche Entscheidungen konsultieren Sie Experten.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Detailed Terms */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <div className="bg-white p-8 rounded-lg shadow-sm space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Geltungsbereich</h2>
                <p className="text-gray-700 mb-4">
                  Diese Nutzungsbedingungen gelten für die Nutzung der Website{" "}
                  <strong>https://stundenlohnrechner.pro</strong> und aller darauf verfügbaren Services, insbesondere
                  des Stundenlohn Rechners.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Anwendbare Rechtsordnung</h4>
                  <p className="text-blue-700 text-sm">
                    Es gilt deutsches Recht. Gerichtsstand ist Deutschland. Diese Nutzungsbedingungen sind in deutscher
                    Sprache verfasst und verbindlich.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Leistungsbeschreibung</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Unser Service</h3>
                <p className="text-gray-700 mb-4">
                  Wir stellen Ihnen einen kostenlosen Online-Rechner zur Verfügung, mit dem Sie Ihren Brutto- und
                  Netto-Stundenlohn basierend auf deutschen Steuer- und Sozialversicherungsbestimmungen berechnen
                  können.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Zusätzliche Features</h3>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Berechnungshistorie (lokal gespeichert)</li>
                  <li>Export-Funktionen für Berechnungsergebnisse</li>
                  <li>Vergleichsfunktionen mit Referenzwerten</li>
                  <li>Detaillierte Aufschlüsselung der Abzüge</li>
                  <li>Mobile-optimierte Nutzung</li>
                </ul>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <p className="text-green-800">
                    <strong>Kostengarantie:</strong> Alle Funktionen sind und bleiben kostenlos. Es gibt keine
                    versteckten Kosten oder Premium-Features.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Nutzungsrechte und -pflichten</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Erlaubte Nutzung</h3>
                <div className="bg-green-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-green-800 mb-2">✅ Das ist erlaubt:</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Private Nutzung für persönliche Gehaltsberechnungen</li>
                    <li>• Geschäftliche Nutzung in Unternehmen</li>
                    <li>• Nutzung durch Steuerberater und Lohnbüros</li>
                    <li>• Teilen von Berechnungsergebnissen</li>
                    <li>• Verlinkung auf unsere Website</li>
                    <li>• Nutzung der Export-Funktionen</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Verbotene Nutzung</h3>
                <div className="bg-red-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-red-800 mb-2">❌ Das ist nicht erlaubt:</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Automatisierte Abfragen oder Scraping</li>
                    <li>• Überlastung unserer Server durch exzessive Nutzung</li>
                    <li>• Reverse Engineering oder Dekompilierung</li>
                    <li>• Verbreitung von Malware oder schädlichem Code</li>
                    <li>• Umgehung von Sicherheitsmaßnahmen</li>
                    <li>• Missbrauch für illegale Zwecke</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Fair Use Policy</h3>
                <p className="text-gray-700 mb-3">Wir bitten um verantwortungsvolle Nutzung unserer Ressourcen:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Maximal 1000 Berechnungen pro Tag und IP-Adresse</li>
                  <li>Keine automatisierten Tools oder Bots</li>
                  <li>Respektvoller Umgang mit unserem Service</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Haftungsausschluss</h2>

                <Alert className="mb-6 border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription className="text-orange-800">
                    <strong>Wichtiger Hinweis:</strong> Unsere Berechnungen dienen der Orientierung und ersetzen keine
                    professionelle Steuer- oder Rechtsberatung.
                  </AlertDescription>
                </Alert>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Genauigkeit der Berechnungen</h3>
                <p className="text-gray-700 mb-4">
                  Obwohl wir größte Sorgfalt auf die Aktualität und Richtigkeit unserer Berechnungsgrundlagen legen,
                  können wir keine Gewähr für die absolute Genauigkeit der Ergebnisse übernehmen.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-yellow-800 mb-2">Einflussfaktoren auf die Genauigkeit:</h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    <li>• Komplexität des deutschen Steuersystems</li>
                    <li>• Individuelle Umstände (Freibeträge, Sonderregelungen)</li>
                    <li>• Änderungen in der Gesetzgebung</li>
                    <li>• Rundungsdifferenzen bei Berechnungen</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Haftungsbeschränkung</h3>
                <p className="text-gray-700 mb-4">
                  Wir haften nicht für Schäden, die durch die Nutzung unseres Rechners entstehen, insbesondere nicht
                  für:
                </p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Falsche Gehaltsverhandlungen basierend auf unseren Berechnungen</li>
                  <li>Steuerliche Nachzahlungen oder Strafen</li>
                  <li>Entgangene Gewinne oder indirekte Schäden</li>
                  <li>Datenverlust oder technische Probleme</li>
                </ul>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">Empfehlung</h4>
                  <p className="text-blue-700 text-sm">
                    Für wichtige finanzielle Entscheidungen konsultieren Sie bitte einen Steuerberater,
                    Wirtschaftsprüfer oder Rechtsanwalt.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Verfügbarkeit und technische Anforderungen</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Verfügbarkeit</h3>
                <p className="text-gray-700 mb-4">
                  Wir bemühen uns um eine hohe Verfügbarkeit unseres Services, können jedoch keine 100%ige Verfügbarkeit
                  garantieren.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-800 mb-2">Angestrebte Verfügbarkeit</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• 99,5% Uptime</li>
                      <li>• 24/7 Monitoring</li>
                      <li>• Schnelle Fehlerbehebung</li>
                    </ul>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-orange-800 mb-2">Mögliche Ausfälle</h4>
                    <ul className="text-orange-700 text-sm space-y-1">
                      <li>• Wartungsarbeiten</li>
                      <li>• Technische Störungen</li>
                      <li>• Höhere Gewalt</li>
                    </ul>
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Technische Anforderungen</h3>
                <p className="text-gray-700 mb-3">Für die optimale Nutzung benötigen Sie:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li>Einen modernen Webbrowser (Chrome, Firefox, Safari, Edge)</li>
                  <li>JavaScript aktiviert</li>
                  <li>Internetverbindung</li>
                  <li>Bildschirmauflösung mindestens 320px (mobile optimiert)</li>
                </ul>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Datenschutz</h2>
                <p className="text-gray-700 mb-4">
                  Der Schutz Ihrer Privatsphäre ist uns wichtig. Detaillierte Informationen zur Datenverarbeitung finden
                  Sie in unserer{" "}
                  <a href="/datenschutz" className="text-[#4A69E2] hover:underline font-medium">
                    Datenschutzrichtlinie
                  </a>
                  .
                </p>

                <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
                  <h4 className="font-semibold text-green-800 mb-2">Datenschutz-Highlights</h4>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Keine Speicherung von Gehaltsdaten auf unseren Servern</li>
                    <li>• Lokale Verarbeitung in Ihrem Browser</li>
                    <li>• DSGVO-konforme Datenverarbeitung</li>
                    <li>• Transparente Datenschutzrichtlinie</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Geistiges Eigentum</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Unsere Rechte</h3>
                <p className="text-gray-700 mb-4">
                  Alle Inhalte dieser Website, einschließlich Design, Code, Texte und Berechnungslogik, sind
                  urheberrechtlich geschützt und Eigentum von Stundenlohn Rechner.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Ihre Rechte</h3>
                <p className="text-gray-700 mb-4">Sie dürfen:</p>
                <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                  <li>Berechnungsergebnisse für eigene Zwecke verwenden</li>
                  <li>Screenshots für Dokumentationszwecke erstellen</li>
                  <li>Links zu unserer Website setzen</li>
                </ul>

                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-red-400">
                  <h4 className="font-semibold text-red-800 mb-2">Nicht erlaubt</h4>
                  <ul className="text-red-700 text-sm space-y-1">
                    <li>• Kopieren oder Nachahmen unseres Designs</li>
                    <li>• Verwendung unserer Marke oder Logos</li>
                    <li>• Erstellung konkurrierender Services basierend auf unserem Code</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Änderungen der Nutzungsbedingungen</h2>
                <p className="text-gray-700 mb-4">
                  Wir behalten uns vor, diese Nutzungsbedingungen zu ändern, um sie an geänderte Rechtsvorschriften oder
                  Geschäftspraktiken anzupassen.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Benachrichtigung über Änderungen</h3>
                <div className="bg-blue-50 p-4 rounded-lg mb-4">
                  <h4 className="font-semibold text-blue-800 mb-2">So informieren wir Sie:</h4>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Hinweis auf der Website</li>
                    <li>• Aktualisierung des "Letzte Änderung" Datums</li>
                    <li>• Bei wesentlichen Änderungen: E-Mail-Benachrichtigung (falls verfügbar)</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Widerspruchsrecht</h3>
                <p className="text-gray-700">
                  Wenn Sie mit Änderungen nicht einverstanden sind, können Sie die Nutzung unseres Services einstellen.
                  Die weitere Nutzung nach Inkrafttreten der Änderungen gilt als Zustimmung.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Kündigung und Sperrung</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.1 Kündigung durch Sie</h3>
                <p className="text-gray-700 mb-4">
                  Sie können die Nutzung unseres Services jederzeit ohne Angabe von Gründen beenden. Eine formelle
                  Kündigung ist nicht erforderlich.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">9.2 Sperrung durch uns</h3>
                <p className="text-gray-700 mb-4">
                  Wir behalten uns vor, Nutzer zu sperren, die gegen diese Nutzungsbedingungen verstoßen:
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-orange-800 mb-2">Gründe für eine Sperrung:</h4>
                  <ul className="text-orange-700 text-sm space-y-1">
                    <li>• Missbrauch unserer Services</li>
                    <li>• Überlastung unserer Server</li>
                    <li>• Verstoß gegen geltendes Recht</li>
                    <li>• Schädigung unserer Reputation</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Streitbeilegung</h2>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Außergerichtliche Einigung</h3>
                <p className="text-gray-700 mb-4">
                  Bei Problemen oder Streitigkeiten kontaktieren Sie uns zunächst unter{" "}
                  <a href="mailto:info@stundenlohnrechner.pro" className="text-[#4A69E2] hover:underline font-medium">
                    info@stundenlohnrechner.pro
                  </a>
                  . Wir bemühen uns um eine schnelle und faire Lösung.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Gerichtsstand</h3>
                <p className="text-gray-700 mb-4">
                  Sollte eine außergerichtliche Einigung nicht möglich sein, ist der Gerichtsstand Deutschland. Es gilt
                  deutsches Recht unter Ausschluss des UN-Kaufrechts.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">10.3 Verbraucherrechte</h3>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800">
                    <strong>Hinweis für Verbraucher:</strong> Diese Bestimmungen berühren nicht Ihre gesetzlichen Rechte
                    als Verbraucher nach deutschem und europäischem Recht.
                  </p>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Salvatorische Klausel</h2>
                <p className="text-gray-700 mb-4">
                  Sollten einzelne Bestimmungen dieser Nutzungsbedingungen unwirksam oder undurchführbar sein oder
                  werden, berührt dies nicht die Wirksamkeit der übrigen Bestimmungen.
                </p>
                <p className="text-gray-700">
                  Unwirksame Bestimmungen werden durch solche ersetzt, die dem gewollten Zweck am nächsten kommen.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Kontakt</h2>
                <div className="bg-[#4A69E2] text-white p-6 rounded-lg">
                  <h4 className="font-semibold mb-4">Bei Fragen zu diesen Nutzungsbedingungen kontaktieren Sie uns:</h4>
                  <div className="space-y-2">
                    <p>
                      <strong>E-Mail:</strong> info@stundenlohnrechner.pro
                    </p>
                    <p>
                      <strong>Website:</strong> https://stundenlohnrechner.pro
                    </p>
                    <p>
                      <strong>Kontaktformular:</strong>{" "}
                      <a href="/kontakt" className="underline hover:no-underline">
                        https://stundenlohnrechner.pro/kontakt
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t pt-6">
                <p className="text-sm text-gray-500 text-center">
                  Diese Nutzungsbedingungen wurden zuletzt am 3. August 2025 aktualisiert und treten mit sofortiger
                  Wirkung in Kraft.
                  <br />
                  Durch die weitere Nutzung unserer Website stimmen Sie diesen Bedingungen zu.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
