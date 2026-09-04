import Link from "next/link"
import { ArrowLeft, Activity } from "lucide-react"

export const metadata = {
  title: "Privacy Policy | Reserve Financial Services",
  description: "Privacy Policy for Reserve Financial Services Ltd website",
}

export default function PrivacyPolicyPage() {
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">Privacy Policy</h1>

            <div className="space-y-8 text-white/70 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">1. Introduction</h2>
                <p>
                  Reserve Financial Services Ltd ("we", "our", or "us") respects your privacy and is committed to
                  protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard
                  your data when you visit our website.
                </p>
                <p className="mt-3">
                  We operate as a company that trades solely with company capital and develops financial technology. We
                  do not offer financial services to the public or collect information for investment or advisory
                  purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">2. Information We Collect</h2>
                <p className="mb-3">We may collect limited personal information in the following ways:</p>
                <ul className="space-y-3 list-none">
                  <li>
                    <span className="text-[#f7d354] font-medium">Contact Forms</span> - When you submit an enquiry, we
                    may collect your name, email address, and any details you voluntarily provide.
                  </li>
                  <li>
                    <span className="text-[#f7d354] font-medium">Website Usage Data</span> - Basic analytics (such as IP
                    address, browser type, pages visited, and session duration) may be collected automatically to
                    improve website performance and security.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">3. How We Use Your Information</h2>
                <p className="mb-3">We use the information we collect to:</p>
                <ul className="space-y-2 list-none">
                  <li>Respond to your enquiries or requests.</li>
                  <li>Maintain and improve our website's functionality and user experience.</li>
                  <li>Ensure website security and protect against unauthorised access.</li>
                </ul>
                <p className="mt-3">
                  We do not sell, rent, or share your data with third parties for marketing purposes.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">4. Legal Basis for Processing</h2>
                <p className="mb-3">
                  We process personal data under the following lawful bases as defined by the UK GDPR:
                </p>
                <ul className="space-y-2 list-none">
                  <li>
                    <span className="text-[#f7d354] font-medium">Legitimate interest</span> - To operate and improve our
                    website.
                  </li>
                  <li>
                    <span className="text-[#f7d354] font-medium">Consent</span> - When you choose to submit a contact
                    form or communicate with us directly.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">5. Data Retention</h2>
                <p>
                  We retain personal data only for as long as necessary to fulfil the purpose for which it was collected
                  or as required by law.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">6. Data Security</h2>
                <p>
                  We use appropriate technical and organisational measures to protect your information against loss,
                  misuse, unauthorised access, disclosure, or alteration.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">7. Your Rights</h2>
                <p className="mb-3">Under the UK GDPR, you have the right to:</p>
                <ul className="space-y-2 list-none">
                  <li>Access the personal data we hold about you.</li>
                  <li>Request correction of inaccurate information.</li>
                  <li>Request deletion of your personal data (where applicable).</li>
                  <li>Object to or restrict processing in certain circumstances.</li>
                </ul>
                <p className="mt-3">
                  To exercise your rights, please contact us at:{" "}
                  <a href="mailto:info@reservefns.com" className="text-[#00d4ff] hover:underline cursor-pointer">
                    info@reservefns.com
                  </a>
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">8. Third-Party Links</h2>
                <p>
                  Our website may contain links to external websites. We are not responsible for the content or privacy
                  practices of those websites.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">9. Changes to This Policy</h2>
                <p>
                  We may update this Privacy Policy from time to time. Any updates will be posted on this page with an
                  updated "Last Revised" date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">10. Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy or how we handle your personal data, please
                  contact us at:{" "}
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
