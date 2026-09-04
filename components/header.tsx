"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X, Activity } from "lucide-react"

const navItems = [
  { label: "About Us", id: "about" },
  { label: "What We Do", id: "what-we-do" },
  { label: "Workflow", id: "workflow" },
  { label: "How We Work", id: "how-we-work" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      setIsScrolled(scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setIsMobileMenuOpen(false)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-14 lg:h-16 overflow-visible ${
          isScrolled ? "bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-[#00d4ff]/10" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8 h-full overflow-visible">
          <div className="flex items-center justify-between h-full overflow-visible">
            <button onClick={scrollToTop} className="flex items-center gap-3 group cursor-pointer">
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
            </button>

            {/* Desktop Navigation - Added overflow-visible and padding for hover underline */}
            <nav className="hidden lg:flex items-center gap-8 overflow-visible py-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="relative text-sm font-medium text-white/60 hover:text-[#00d4ff] transition-colors group pb-1 overflow-visible"
                >
                  {item.label}
                  <span className="absolute -bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-[#00d4ff] to-[#f7d354] transition-all duration-300 group-hover:w-full" />
                </button>
              ))}
              <Button
                onClick={() => scrollToSection("contact")}
                className="bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 hover:border-[#00d4ff]/50 px-6 transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)]"
              >
                Get In Touch
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2 hover:bg-white/5 rounded-lg transition-colors z-[60]"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[55] lg:hidden">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={closeMobileMenu} />
          <div className="absolute right-0 top-0 h-full w-80 bg-[#0a0a0f]/98 backdrop-blur-xl border-l border-[#00d4ff]/10">
          {/* Close button inside menu */}
          <button
            onClick={closeMobileMenu}
            className="absolute top-4 right-4 text-white p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          <div className="flex flex-col h-full pt-20 px-6">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="text-left text-lg font-medium text-white/70 hover:text-[#00d4ff] hover:bg-[#00d4ff]/5 transition-all py-4 px-4 rounded-lg border-b border-white/5"
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="mt-auto pb-8">
              <Button
                onClick={() => scrollToSection("contact")}
                className="w-full bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30"
              >
                Get In Touch
              </Button>
            </div>
          </div>
          </div>
        </div>
      )}
    </>
  )
}
