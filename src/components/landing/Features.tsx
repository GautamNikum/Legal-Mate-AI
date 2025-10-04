import { FileText, Search, Zap, Shield, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const features = [
  {
    icon: FileText,
    title: "AI Contract Drafting",
    description: "Generate professional contracts instantly. Choose from NDAs, Service Agreements, Lease Agreements, and more.",
    items: ["Industry-standard templates", "Customizable clauses", "Instant generation"]
  },
  {
    icon: Search,
    title: "Smart Contract Review",
    description: "Upload any contract and get instant AI analysis. Identify risks, missing clauses, and improvement opportunities.",
    items: ["Risk detection", "Missing clause identification", "Plain English suggestions"]
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get results in seconds, not days. Save thousands in legal fees while maintaining professional quality.",
    items: ["Instant AI processing", "Contract history tracking", "Unlimited revisions"]
  },
  {
    icon: Shield,
    title: "Secure & Compliant",
    description: "Bank-level encryption and data protection. Your contracts are private and secure with industry-standard compliance.",
    items: ["End-to-end encryption", "GDPR compliant", "SOC 2 certified"]
  }
];

export const Features = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything You Need to Manage Contracts
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From drafting to review, LegalMate AI provides comprehensive contract management powered by advanced AI.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-card p-8 rounded-xl border shadow-md hover:shadow-lg transition-all hover:scale-105"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
            >
              <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-muted-foreground mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
