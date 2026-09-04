"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Send, MessageSquare, ChevronDown, Search } from "lucide-react"

const countries = [
  { code: "GB", name: "United Kingdom", dialCode: "+44" },
  { code: "US", name: "United States", dialCode: "+1" },
  { code: "CA", name: "Canada", dialCode: "+1" },
  { code: "AU", name: "Australia", dialCode: "+61" },
  { code: "DE", name: "Germany", dialCode: "+49" },
  { code: "FR", name: "France", dialCode: "+33" },
  { code: "ES", name: "Spain", dialCode: "+34" },
  { code: "IT", name: "Italy", dialCode: "+39" },
  { code: "NL", name: "Netherlands", dialCode: "+31" },
  { code: "BE", name: "Belgium", dialCode: "+32" },
  { code: "CH", name: "Switzerland", dialCode: "+41" },
  { code: "AT", name: "Austria", dialCode: "+43" },
  { code: "SE", name: "Sweden", dialCode: "+46" },
  { code: "NO", name: "Norway", dialCode: "+47" },
  { code: "DK", name: "Denmark", dialCode: "+45" },
  { code: "FI", name: "Finland", dialCode: "+358" },
  { code: "IE", name: "Ireland", dialCode: "+353" },
  { code: "PT", name: "Portugal", dialCode: "+351" },
  { code: "PL", name: "Poland", dialCode: "+48" },
  { code: "CZ", name: "Czech Republic", dialCode: "+420" },
  { code: "GR", name: "Greece", dialCode: "+30" },
  { code: "RU", name: "Russia", dialCode: "+7" },
  { code: "CN", name: "China", dialCode: "+86" },
  { code: "JP", name: "Japan", dialCode: "+81" },
  { code: "KR", name: "South Korea", dialCode: "+82" },
  { code: "IN", name: "India", dialCode: "+91" },
  { code: "SG", name: "Singapore", dialCode: "+65" },
  { code: "HK", name: "Hong Kong", dialCode: "+852" },
  { code: "AE", name: "United Arab Emirates", dialCode: "+971" },
  { code: "SA", name: "Saudi Arabia", dialCode: "+966" },
  { code: "IL", name: "Israel", dialCode: "+972" },
  { code: "ZA", name: "South Africa", dialCode: "+27" },
  { code: "BR", name: "Brazil", dialCode: "+55" },
  { code: "MX", name: "Mexico", dialCode: "+52" },
  { code: "AR", name: "Argentina", dialCode: "+54" },
  { code: "NZ", name: "New Zealand", dialCode: "+64" },
  { code: "MY", name: "Malaysia", dialCode: "+60" },
  { code: "TH", name: "Thailand", dialCode: "+66" },
  { code: "PH", name: "Philippines", dialCode: "+63" },
  { code: "ID", name: "Indonesia", dialCode: "+62" },
  { code: "VN", name: "Vietnam", dialCode: "+84" },
  { code: "EG", name: "Egypt", dialCode: "+20" },
  { code: "NG", name: "Nigeria", dialCode: "+234" },
  { code: "KE", name: "Kenya", dialCode: "+254" },
  { code: "TR", name: "Turkey", dialCode: "+90" },
  { code: "PK", name: "Pakistan", dialCode: "+92" },
  { code: "BD", name: "Bangladesh", dialCode: "+880" },
  { code: "LK", name: "Sri Lanka", dialCode: "+94" },
]

function CountryFlag({ code, size = 24 }: { code: string; size?: number }) {
  return (
    <img
      src={`https://flagcdn.com/w40/${code.toLowerCase()}.png`}
      srcSet={`https://flagcdn.com/w80/${code.toLowerCase()}.png 2x`}
      width={size}
      height={Math.round(size * 0.75)}
      alt={`${code} flag`}
      className="rounded-sm object-cover"
      style={{ minWidth: size }}
    />
  )
}

export function Contact() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
    privacyConsent: false,
    marketingConsent: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  })

  const [selectedCountry, setSelectedCountry] = useState(countries[0]) // UK default
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false)
  const [countrySearch, setCountrySearch] = useState("")
  const dropdownRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)

  const validateName = (value: string): string => {
    if (!value.trim()) return "" // Empty is not an error, just required
    if (!/^[a-zA-Z\s]+$/.test(value)) return "Only letters allowed"
    return ""
  }

  const validateEmail = (value: string): string => {
    if (!value.trim()) return ""
    // Only allow letters, numbers, @, underscore, dot
    if (!/^[a-zA-Z0-9@_.]+$/.test(value)) return "Only letters, numbers, @, _ and . allowed"
    if (!value.includes("@")) return "Enter a valid email"
    // Basic email format check
    if (!/^[a-zA-Z0-9_.]+@[a-zA-Z0-9_.]+\.[a-zA-Z]{2,}$/.test(value)) return "Enter a valid email"
    return ""
  }

  const validatePhone = (value: string): string => {
    if (!value.trim()) return ""
    if (!/^[0-9\s]+$/.test(value)) return "Only numbers allowed"
    const digitsOnly = value.replace(/\s/g, "")
    if (digitsOnly.length < 10) return "Minimum 10 digits required"
    return ""
  }

  const validateMessage = (value: string): string => {
    if (!value.trim()) return ""
    if (/[^a-zA-Z0-9\s.]/.test(value))
      return "No special characters allowed (only letters, numbers, spaces, and periods)"
    return ""
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    let sanitizedValue = value

    if (name === "firstName" || name === "lastName") {
      setErrors((prev) => ({ ...prev, [name]: validateName(value) }))
    } else if (name === "email") {
      setErrors((prev) => ({ ...prev, email: validateEmail(value) }))
    } else if (name === "phone") {
      sanitizedValue = value.replace(/[^0-9\s]/g, "")
      setErrors((prev) => ({ ...prev, phone: validatePhone(sanitizedValue) }))
    } else if (name === "message") {
      setErrors((prev) => ({ ...prev, message: validateMessage(value) }))
    }

    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }))
  }

  const isFormValid = useMemo(() => {
    const phoneDigits = formData.phone.replace(/\s/g, "")
    const hasRequiredFields =
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.phone.trim() &&
      phoneDigits.length >= 10 &&
      formData.message.trim() &&
      formData.privacyConsent
    const hasNoErrors = !errors.firstName && !errors.lastName && !errors.email && !errors.phone && !errors.message
    return hasRequiredFields && hasNoErrors
  }, [formData, errors])

  const filteredCountries = countries.filter(
    (country) =>
      country.name.toLowerCase().includes(countrySearch.toLowerCase()) ||
      country.dialCode.includes(countrySearch) ||
      country.code.toLowerCase().includes(countrySearch.toLowerCase()),
  )

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCountryDropdownOpen(false)
        setCountrySearch("")
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    if (isCountryDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isCountryDropdownOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus("idle")

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          phone: `${selectedCountry.dialCode} ${formData.phone}`,
        }),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          message: "",
          privacyConsent: false,
          marketingConsent: false,
        })
      } else {
        setSubmitStatus("error")
      }
    } catch {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 lg:py-32 px-4 md:px-6 lg:px-8 bg-[#0a0a0f] overflow-x-hidden overflow-y-visible"
    >
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#0a0a0f] to-transparent pointer-events-none z-20" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent pointer-events-none z-20" />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00d4ff]/5 rounded-full blur-[150px]" />
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/20 mb-6 cursor-pointer transition-all duration-300 hover:bg-[#00d4ff]/20 hover:border-[#00d4ff]/40 hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] hover:scale-105 active:bg-[#00d4ff]/20 active:border-[#00d4ff]/40 active:shadow-[0_0_20px_rgba(0,212,255,0.3)] active:scale-105 relative z-[60]">
            <MessageSquare className="w-4 h-4 text-[#00d4ff]" />
            <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Contact</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            Get In <span className="gradient-text-yellow">Touch</span>
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="terminal-card p-6 md:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white/60 text-xs font-mono">
                FIRST_NAME<span className="text-[#f7d354]">*</span>
              </Label>
              <Input
                id="firstName"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20 font-mono ${
                  errors.firstName ? "border-[#ff4757]/50 focus:border-[#ff4757]/50" : ""
                }`}
              />
              {errors.firstName && <p className="text-[#ff4757] text-xs font-mono">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white/60 text-xs font-mono">
                LAST_NAME<span className="text-[#f7d354]">*</span>
              </Label>
              <Input
                id="lastName"
                name="lastName"
                required
                value={formData.lastName}
                onChange={handleChange}
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20 font-mono ${
                  errors.lastName ? "border-[#ff4757]/50 focus:border-[#ff4757]/50" : ""
                }`}
              />
              {errors.lastName && <p className="text-[#ff4757] text-xs font-mono">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white/60 text-xs font-mono">
              EMAIL<span className="text-[#f7d354]">*</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20 ${
                errors.email ? "border-[#ff4757]/50 focus:border-[#ff4757]/50" : ""
              }`}
            />
            {errors.email && <p className="text-[#ff4757] text-xs font-mono">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white/60 text-xs font-mono">
              PHONE<span className="text-[#f7d354]">*</span>
            </Label>
            <div className="flex flex-row gap-2 items-center">
              {/* Country dropdown container */}
              <div className="relative shrink-0" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                  className="flex items-center gap-1.5 px-2 py-2 h-10 bg-white/5 border border-white/10 rounded-md text-white text-sm font-mono hover:bg-white/10 hover:border-[#00d4ff]/30 active:bg-white/10 active:border-[#00d4ff]/30 transition-all cursor-pointer whitespace-nowrap"
                >
                  <CountryFlag code={selectedCountry.code} size={20} />
                  <span className="text-white/60 text-xs font-mono">{selectedCountry.dialCode}</span>
                  <ChevronDown
                    className={`w-3 h-3 text-white/40 transition-transform ${isCountryDropdownOpen ? "rotate-180" : ""}`}
                  />
                </button>

                {isCountryDropdownOpen && (
                  <>
                    {/* Backdrop overlay */}
                    <div
                      className="fixed inset-0 z-[100] bg-black/50 md:bg-black/30"
                      onClick={() => {
                        setIsCountryDropdownOpen(false)
                        setCountrySearch("")
                      }}
                    />

                    <div className="fixed left-4 right-4 top-1/2 -translate-y-1/2 z-[101] lg:absolute lg:left-0 lg:right-auto lg:top-full lg:translate-y-0 lg:mt-1 w-auto lg:w-64 max-h-[60vh] lg:max-h-72 bg-[#0f1419] border border-white/20 rounded-lg shadow-2xl overflow-hidden">
                      {/* Search input inside dropdown */}
                      <div className="p-3 border-b border-white/10">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                          <input
                            ref={searchInputRef}
                            type="text"
                            placeholder="Search country..."
                            value={countrySearch}
                            onChange={(e) => setCountrySearch(e.target.value)}
                            className="w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-md text-white text-sm placeholder:text-white/40 focus:outline-none focus:border-[#00d4ff]/50 font-mono"
                            autoComplete="off"
                          />
                        </div>
                      </div>

                      {/* Country list */}
                      <div className="max-h-[45vh] lg:max-h-52 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => {
                                setSelectedCountry(country)
                                setIsCountryDropdownOpen(false)
                                setCountrySearch("")
                              }}
                              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 active:bg-white/10 transition-colors cursor-pointer ${
                                selectedCountry.code === country.code ? "bg-[#00d4ff]/10" : ""
                              }`}
                            >
                              <CountryFlag code={country.code} size={24} />
                              <span className="flex-1 text-white text-sm truncate">{country.name}</span>
                              <span className="text-white/50 text-xs font-mono">{country.dialCode}</span>
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-6 text-center text-white/40 text-sm">No countries found</div>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Phone number input */}
              <Input
                id="phone"
                name="phone"
                type="tel"
                required
                placeholder="7700 900000"
                value={formData.phone}
                onChange={(e) => handleChange(e)}
                className={`flex-1 min-w-0 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20 resize-none font-mono h-10 ${
                  errors.phone ? "border-[#ff4757]/50 focus:border-[#ff4757]/50" : ""
                }`}
              />
            </div>
            {errors.phone && <p className="text-[#ff4757] text-xs font-mono">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="message" className="text-white/60 text-xs font-mono">
              MESSAGE<span className="text-[#f7d354]">*</span>
            </Label>
            <Textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => handleChange(e)}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-[#00d4ff]/50 focus:ring-[#00d4ff]/20 resize-none font-mono ${
                errors.message ? "border-[#ff4757]/50 focus:border-[#ff4757]/50" : ""
              }`}
            />
            {errors.message && <p className="text-[#ff4757] text-xs font-mono">{errors.message}</p>}
          </div>

          <div className="flex items-start gap-3 mt-4">
            <div className="relative flex-shrink-0 mt-0.5">
              <input
                type="checkbox"
                id="privacyConsent"
                checked={formData.privacyConsent}
                onChange={(e) => setFormData({ ...formData, privacyConsent: e.target.checked })}
                className="sr-only peer"
              />
              <div
                onClick={() => setFormData({ ...formData, privacyConsent: !formData.privacyConsent })}
                className="w-5 h-5 border-2 border-[#00d4ff]/50 rounded bg-[#0a0a0f] cursor-pointer peer-checked:bg-[#00d4ff]/20 peer-checked:border-[#00d4ff] transition-all flex items-center justify-center"
              >
                {formData.privacyConsent && (
                  <svg
                    className="w-3 h-3 text-[#00d4ff]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            </div>
            <Label htmlFor="privacyConsent" className="text-xs leading-relaxed cursor-pointer text-white/70">
              By submitting, you agree to our Privacy Policy and data processing terms.
            </Label>
          </div>

          {submitStatus === "success" && (
            <div className="p-4 rounded-lg bg-[#00ff88]/10 border border-[#00ff88]/30 text-[#00ff88] text-sm text-center font-mono">
              Message sent successfully
            </div>
          )}

          {submitStatus === "error" && (
            <div className="p-4 rounded-lg bg-[#ff4757]/10 border border-[#ff4757]/30 text-[#ff4757] text-sm text-center font-mono">
              Error: Please try again
            </div>
          )}

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting || !isFormValid}
            className={`w-full font-semibold border-0 rounded-lg transition-all ${
              isFormValid
                ? "bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0a0f] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)]"
                : "bg-white/20 text-white/40 cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="font-mono">Processing...</span>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                <span className="font-mono">Send Message</span>
              </>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
