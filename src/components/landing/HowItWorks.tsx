import { Upload, Sparkles, Download } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    icon: Upload,
    title: "Upload or Choose Template",
    description: "Upload an existing contract for review or select from our library of professional templates to draft a new one."
  },
  {
    icon: Sparkles,
    title: "AI Analysis",
    description: "Our advanced AI analyzes your contract in seconds, identifying risks, missing clauses, and suggesting improvements."
  },
  {
    icon: Download,
    title: "Review & Download",
    description: "Review AI suggestions, make edits, and download your professional contract in PDF or DOCX format."
  }
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="how-it-works" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get professional contracts in three simple steps
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines for desktop */}
            <div className="hidden md:block absolute top-20 left-1/4 right-1/4 h-0.5 bg-gradient-accent" />
            
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
              >
                <div className="bg-card p-8 rounded-xl border shadow-md text-center relative z-10">
                  <div className="mx-auto h-16 w-16 bg-gradient-accent rounded-full flex items-center justify-center mb-6 shadow-glow">
                    <step.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-4 right-4 h-10 w-10 bg-accent text-accent-foreground rounded-full flex items-center justify-center font-bold shadow-md">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
