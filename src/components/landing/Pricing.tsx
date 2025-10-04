import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";

const plans = [
  {
    name: "Starter",
    monthlyPrice: 0,
    yearlyPrice: 0,
    description: "Perfect for trying out LegalMate AI",
    features: [
      "2 contracts per month",
      "Contract drafting",
      "Contract review",
      "Dashboard access"
    ],
    cta: "Get Started Free",
    popular: false
  },
  {
    name: "Pro",
    monthlyPrice: 29,
    yearlyPrice: 290,
    description: "For professionals and small businesses",
    features: [
      "Unlimited contracts",
      "Priority AI processing",
      "Advanced risk analysis",
      "Export to PDF/DOCX",
      "Email support"
    ],
    cta: "Start Pro Trial",
    popular: true
  },
  {
    name: "Enterprise",
    monthlyPrice: 99,
    yearlyPrice: 990,
    description: "For teams and large organizations",
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Custom templates",
      "API access",
      "Dedicated support",
      "SLA guarantee"
    ],
    cta: "Contact Sales",
    popular: false
  }
];

export const Pricing = () => {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-6">
            Start free, upgrade when you're ready
          </p>
          
          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-4 bg-card rounded-full p-1 border">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-6 py-2 rounded-full transition-all ${!isYearly ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-6 py-2 rounded-full transition-all ${isYearly ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              className={`bg-card p-8 rounded-xl border shadow-md relative ${plan.popular ? "ring-2 ring-accent shadow-glow" : ""}`}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              {plan.popular && (
                <div className="absolute top-4 right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-medium">
                  POPULAR
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold">
                    ${isYearly ? Math.floor(plan.yearlyPrice / 12) : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                {isYearly && plan.yearlyPrice > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Billed ${plan.yearlyPrice}/year
                  </p>
                )}
                <p className="text-muted-foreground mt-2">{plan.description}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className={`w-full ${plan.popular ? "bg-gradient-accent shadow-glow" : ""}`}
                variant={plan.popular ? "default" : "outline"}
                onClick={() => navigate("/auth")}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
