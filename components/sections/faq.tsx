"use client"
import { SectionHeading } from "@/components/shared/section-heading"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { FAQS } from "@/lib/data"

export default function FAQ() {
  return (
    <section aria-labelledby="faq-title" className="container py-24 md:py-32">
      <SectionHeading eyebrow="FAQ" title="Answers to the questions we hear most" />
      <div className="mx-auto mt-12 max-w-3xl">
        <Accordion type="single" collapsible className="space-y-3">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
