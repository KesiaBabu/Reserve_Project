import Link from "next/link"
import { ArrowLeft, Activity } from "lucide-react"

export const metadata = {
  title: "Terms of Use | Reserve Financial Services",
  description: "Terms of Use for Reserve Financial Services Ltd website",
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#00d4ff]/10">
        <div className="container mx-auto px-4 lg:px-8 h-14 lg:h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative transition-transform duration-300 group-hover:scale-110">
              <Activity className="w-7 h-7 lg:w-8 lg:h-8 text-[#00d4ff] transition-all duration-300 group-hover:text-[#f7d354]" />
              <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-white text-lg lg:text-xl">
                RESERV<span className="text-[#f7d354]">E</span>
              </span>
              <span className="hidden sm:block tracking-[0.2em] text-white/50 -mt-1 font-mono text-[8px] lg:text-[10px]">
                FINANCIAL SERVICES
              </span>
            </div>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-white/60 hover:text-[#00d4ff] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="pt-24 lg:pt-28 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-3xl">
          <div className="terminal-card p-6 md:p-10">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">Terms of Use</h1>

            <div className="space-y-8 text-white/70 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">1. Acceptance of Terms</h2>
                <p>
                  By accessing or using this website, you agree to comply with these Terms of Use. If you do not agree,
                  you must not use the website. Reserve Financial Services Ltd reserves the right to modify these terms
                  at any time. Continued use constitutes acceptance of any changes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">2. Website Purpose</h2>
                <p>
                  This website is intended for informational purposes only. Reserve Financial Services Ltd is a company
                  that trades solely with company capital and develops financial technology. We do not provide
                  investment advice, manage client funds, or offer financial services to external parties.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">3. Intellectual Property</h2>
                <p>
                  All content on this website, including text, graphics, logos, images, and software, is the property of
                  Reserve Financial Services Ltd or its licensors and is protected by copyright, trademark, and other
                  intellectual property laws. You may not copy, reproduce, distribute, or create derivative works
                  without prior written consent.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">4. Use of Website Content</h2>
                <p>
                  You may use the website for personal, non-commercial purposes only. You may not rely on any content
                  for financial, investment, or trading decisions. Any reliance on website content is at your own risk.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">5. Limitation of Liability</h2>
                <p>
                  While we strive to provide accurate and up-to-date information, Reserve Financial Services Ltd makes
                  no warranties regarding the accuracy, completeness, or reliability of the website content. We are not
                  liable for any losses, damages, or consequences resulting from your use of the website.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">6. External Links</h2>
                <p>
                  The website may contain links to third-party websites. These links are provided for convenience only.
                  Reserve Financial Services Ltd is not responsible for the content, privacy practices, or accuracy of
                  third-party websites.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">7. Security and Access</h2>
                <p>
                  You are responsible for ensuring your access to the website is secure and free from unauthorised use.
                  Attempting to disrupt, hack, or interfere with the website is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">8. Governing Law</h2>
                <p>
                  These Terms of Use are governed by the laws of England and Wales. Any disputes arising from the use of
                  this website will be subject to the exclusive jurisdiction of the courts of England and Wales.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">9. Contact Information</h2>
                <p>
                  For questions regarding these Terms of Use or website usage, please contact us at:{" "}
                  <a href="mailto:info@reservefns.com" className="text-[#00d4ff] hover:underline cursor-pointer">
                    info@reservefns.com
                  </a>
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
