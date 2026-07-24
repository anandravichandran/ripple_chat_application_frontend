import Navbar from "@/components/sections/navbar"
import Hero from "@/components/sections/hero"
import Stats from "@/components/sections/stats"
import Features from "@/components/sections/features"
import HowItWorks from "@/components/sections/how-it-works"
import AppPreview from "@/components/sections/app-preview"
import Security from "@/components/sections/security"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"
import CTA from "@/components/sections/cta"
import Footer from "@/components/sections/footer"

export default function Page() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative overflow-hidden">
        <Hero />
        <Stats />
        <Features />
        <HowItWorks />
        <AppPreview />
        <Security />
        <Testimonials />
        <Pricing />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  )
}
