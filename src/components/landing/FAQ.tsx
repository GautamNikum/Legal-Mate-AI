import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const faqs = [
  {
    question: "How does LegalMate AI work?",
    answer: "LegalMate AI uses advanced artificial intelligence to analyze and generate legal contracts. Simply choose a template or upload an existing contract, and our AI will provide instant analysis, suggestions, and drafting capabilities."
  },
  {
    question: "Is LegalMate AI a replacement for a lawyer?",
    answer: "No, LegalMate AI is a tool to assist with contract drafting and review, but it's not a replacement for professional legal advice. For complex legal matters, we always recommend consulting with a qualified attorney."
  },
  {
    question: "What types of contracts can I create?",
    answer: "You can create various types of contracts including NDAs, Service Agreements, Lease Agreements, Employment Contracts, and more. We're constantly expanding our template library based on user feedback."
  },
  {
    question: "How secure is my data?",
    answer: "We take security seriously. All data is encrypted end-to-end, and we're GDPR compliant and SOC 2 certified. Your contracts are private and never shared with third parties."
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer: "Yes, you can cancel your subscription at any time. If you're on a paid plan, you'll continue to have access until the end of your billing period."
  },
  {
    question: "Do you offer refunds?",
    answer: "We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied, contact our support team for a full refund."
  }
];

export const FAQ = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Got questions? We've got answers
          </p>
        </motion.div>

        <motion.div 
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-card border rounded-lg px-6"
              >
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-semibold">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};
