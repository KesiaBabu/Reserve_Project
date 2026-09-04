import Link from "next/link"
import { ArrowLeft, Activity } from "lucide-react"

export const metadata = {
  title: "Cookie Policy | Reserve Financial Services",
  description: "Cookie Policy for Reserve Financial Services Ltd website",
}

export default function CookiePolicyPage() {
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
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-8 text-center">Cookie Policy</h1>

            <div className="space-y-8 text-white/70 leading-relaxed">
              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">1. Introduction</h2>
                <p>
                  Reserve Financial Services Ltd ("we", "our", or "us") uses cookies and similar technologies on this
                  website to improve user experience, monitor website performance, and ensure security. This Cookie
                  Policy explains what cookies are, how we use them, and your options for managing them.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">2. What Are Cookies?</h2>
                <p>
                  Cookies are small text files stored on your device when you visit a website. They help the website
                  remember your preferences, analyse usage, and provide certain functionalities.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">3. Types of Cookies We Use</h2>
                <ul className="space-y-3 list-none">
                  <li>
                    <span className="text-[#f7d354] font-medium">Essential Cookies</span> - Necessary for the website to
                    function correctly, including security features and basic navigation.
                  </li>
                  <li>
                    <span className="text-[#f7d354] font-medium">Performance and Analytics Cookies</span> - Collect
                    anonymous information about how visitors use the website. This data helps us improve content,
                    performance, and user experience.
                  </li>
                  <li>
                    <span className="text-[#f7d354] font-medium">Functional Cookies</span> - Remember your preferences,
                    such as language settings, to provide a more personalised experience.
                  </li>
                  <li>
                    <span className="text-[#f7d354] font-medium">Third-Party Cookies</span> - We may use third-party
                    services, such as analytics providers, which may place cookies on your device. These are used for
                    monitoring website traffic and performance.
                  </li>
                </ul>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">4. Your Cookie Choices</h2>
                <p>
                  You can manage or disable cookies through your browser settings. Please note that blocking certain
                  cookies may affect website functionality or limit access to some features.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">5. Consent</h2>
                <p>
                  By continuing to use this website without changing your browser settings, you consent to the use of
                  cookies as described in this policy.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">6. Updates to This Policy</h2>
                <p>
                  We may update this Cookie Policy from time to time. Any changes will be posted on this page with an
                  updated "Last Revised" date.
                </p>
              </section>

              <section>
                <h2 className="text-lg font-semibold text-[#00d4ff] mb-3">7. Contact Us</h2>
                <p>
                  If you have any questions about our use of cookies or this policy, please contact us at:{" "}
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
