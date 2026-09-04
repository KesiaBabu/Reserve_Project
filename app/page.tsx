import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { About } from "@/components/about"
import { Values } from "@/components/values"
import { WhatWeDo } from "@/components/what-we-do"
import { WorkflowDiagram } from "@/components/workflow-diagram"
import { HowWeWork } from "@/components/how-we-work"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { LiveTicker } from "@/components/live-ticker"
import { GradientMesh } from "@/components/gradient-mesh"

export default function Home() {
  return (
    <div className="relative min-h-screen bg-[#0a0a0f]">
      <GradientMesh />

      <div className="relative z-10">
        <Header />
        <LiveTicker />
        <main className="bg-[#0a0a0f]">
          <Hero />
          <Features />
          <About />
          <Values />
          <WhatWeDo />
          <WorkflowDiagram />
          <HowWeWork />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  )
}
