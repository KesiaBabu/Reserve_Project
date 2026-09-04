"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Scale, FileText } from "lucide-react"

export function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const hasSeenDisclaimer = localStorage.getItem("reserveFinancialDisclaimer")
    if (!hasSeenDisclaimer) {
      setIsOpen(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("reserveFinancialDisclaimer", "true")
    setIsOpen(false)
  }

  const handleExit = () => {
    window.location.href = "about:blank"
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0f]/95 backdrop-blur-sm flex items-center justify-center p-4 overflow-hidden">
      <div className="max-w-xl w-full bg-[#0d1117] border border-white/10 rounded-xl p-6 lg:p-8 shadow-2xl">
        <div className="flex items-center justify-center pb-4 mb-6 border-b border-white/5">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white/5 border border-white/10">
            <FileText className="w-3.5 h-3.5 text-white/60" />
            <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">Legal Disclosure</span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-14 h-14 rounded-full bg-[#00d4ff]/5 border border-[#00d4ff]/20 flex items-center justify-center">
            <Scale className="w-6 h-6 text-[#00d4ff]/70" />
          </div>
        </div>

        <h2 className="text-xl lg:text-2xl font-semibold text-white/90 mb-6 text-center">Important Information</h2>

        <div className="space-y-4 text-sm text-white/60 leading-relaxed mb-8">
          <p>
            Reserve Financial Services Ltd is a UK-registered company that trades solely with company capital. This
            website is for informational purposes only.
          </p>
          <p>
            We do not provide investment advice, manage client funds, or offer financial services to external parties.
            Trading involves risk, and past activity is not a reliable indicator of future outcomes.
          </p>
          <p>
            By entering this website, you acknowledge that all content is intended to describe internal operations and
            tools, not to promote or solicit external investment.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={handleAccept}
            className="flex-1 bg-[#00d4ff]/90 hover:bg-[#00d4ff] text-[#0a0a0f] font-medium border-0 rounded-lg transition-colors"
          >
            I Understand, Continue
          </Button>
          <Button
            onClick={handleExit}
            variant="outline"
            className="flex-1 bg-transparent border-white/10 text-white/70 hover:bg-white/5 hover:text-white/90 hover:border-white/20 rounded-lg transition-colors"
          >
            Leave Site
          </Button>
        </div>

        <p className="text-[10px] text-white/30 text-center mt-6">
          By continuing, you confirm you have read and understood this disclosure.
        </p>
      </div>
    </div>
  )
}
