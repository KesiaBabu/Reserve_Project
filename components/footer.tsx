"use client"

import Link from "next/link"
import { Linkedin, Instagram, Facebook, MapPin, Mail, Activity } from "lucide-react"

export function Footer() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className="relative pt-16 pb-8 px-4 md:px-6 lg:px-8 border-t border-white/5">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f] to-transparent" />

      <div className="container mx-auto relative z-10">
        {/* Top section - Mobile: 2 columns, Tablet: 3 columns, Desktop: 4 columns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Logo + Social - spans 2 cols on mobile, 3 on tablet, 1 on desktop */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1 flex flex-col items-start gap-4">
            <button onClick={scrollToTop} className="flex items-center gap-3 group cursor-pointer">
              <div className="relative transition-transform duration-300 group-hover:scale-110">
                <Activity className="w-7 h-7 text-[#00d4ff] transition-all duration-300 group-hover:text-[#f7d354]" />
                <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#00ff88] rounded-full animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="font-bold tracking-wider text-white text-lg">
                  RESERV<span className="text-[#f7d354]">E</span>
                </span>
                <span className="text-[9px] tracking-[0.2em] text-white/50 -mt-1 font-mono">FINANCIAL SERVICES</span>
              </div>
            </button>
            <div className="flex flex-col gap-2">
              <span className="text-xs text-white/40 font-mono">Follow Us</span>
              <div className="flex items-center gap-2">
                {[
                  {
                    icon: () => (
                      <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    ),
                  },
                  { icon: Linkedin },
                  { icon: Instagram },
                  { icon: Facebook },
                ].map((item, i) => (
                  <a
                    key={i}
                    href="#"
                    className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:bg-[#00d4ff]/10 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all cursor-pointer"
                  >
                    <item.icon />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs text-white font-semibold tracking-wide mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "What We Do", id: "what-we-do" },
                { label: "How We Work", id: "how-we-work" },
                { label: "About Us", id: "about" },
                { label: "Contact", id: "contact" },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className="text-sm text-white/50 hover:text-[#f7d354] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="font-mono text-xs text-white font-semibold tracking-wide mb-4">Legal & Compliance</h4>
            <ul className="space-y-2">
              {[
                { label: "Cookie Policy", href: "/cookie-policy" },
                { label: "Privacy Policy", href: "/privacy-policy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-white/50 hover:text-[#f7d354] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="col-span-2 sm:col-span-1">
            <h4 className="font-mono text-xs text-white font-semibold tracking-wide mb-4">Get in Touch</h4>
            <div className="space-y-3 text-sm text-white/50">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-white/30 flex-shrink-0" />
                <p className="leading-relaxed">
                  DBA - Suite 01.03-1st Floor Commerce House, 1 Exchange Square, Middlesbrough, England, TS1 1DE
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-white/30 flex-shrink-0" />
                <a href="mailto:info@reservefns.com" className="text-[#00d4ff] hover:underline cursor-pointer">
                  info@reservefns.com
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-white/30 font-mono">
            &copy; {currentYear} Reserve Financial Services. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/cookie-policy"
              className="text-xs text-white/30 hover:text-[#00d4ff] transition-colors cursor-pointer"
            >
              Cookie Policy
            </Link>
            <Link
              href="/privacy-policy"
              className="text-xs text-white/30 hover:text-[#00d4ff] transition-colors cursor-pointer"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
