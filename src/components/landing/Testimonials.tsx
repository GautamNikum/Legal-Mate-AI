import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Small Business Owner",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    content: "LegalMate AI saved me thousands in legal fees. I can now draft contracts in minutes instead of waiting days for my lawyer.",
    rating: 5
  },
  {
    name: "Michael Rodriguez",
    role: "Startup Founder",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
    content: "The AI review feature caught several risky clauses in a vendor contract. This tool is a game-changer for startups.",
    rating: 5
  },
  {
    name: "Emily Thompson",
    role: "Freelance Consultant",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
    content: "As a freelancer, I needed professional contracts quickly. LegalMate AI delivers exactly what I need every time.",
    rating: 5
  }
];

export const Testimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="testimonials" className="py-20 bg-background">
      <div className="container mx-auto px-4" ref={ref}>
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Professionals Worldwide
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See what our customers have to say about LegalMate AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="bg-card p-8 rounded-xl border shadow-md hover:shadow-lg transition-all"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: index * 0.15, duration: 0.5 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-muted-foreground italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
