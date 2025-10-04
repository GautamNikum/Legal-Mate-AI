import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight, Scale } from "lucide-react";
import { motion } from "framer-motion";
// import legalIconBg from "@/assets/legal-icon-bg.png";

export const Hero = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const isLoggedIn = localStorage.getItem("currentUser");
    if (isLoggedIn) {
      navigate("/dashboard");
    } else {
      navigate("/auth");
    }
  };

  return (
    <section className="relative overflow-hidden py-20 md:py-32" 
      style={{ 
        background: 'linear-gradient(135deg, hsl(220 60% 20%) 0%, hsl(188 85% 45%) 100%)'
      }}>
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(26,168,177,0.3),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(30,58,95,0.3),transparent_50%)]" />
      </div>

    
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 relative">
        <div className="max-w-4xl">
          <motion.div 
            className="text-left space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <Sparkles className="h-4 w-4" />
              <span className="text-sm font-medium">AI-Powered Legal Intelligence</span>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl font-bold leading-tight text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Draft and Review Contracts in{" "}
              <span className="text-accent">
                Seconds, Not Hours
              </span>
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              LegalMate AI helps you create professional contracts and identify risks instantly. 
              Save time, reduce legal costs, and protect your business with AI-powered contract intelligence.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                className="bg-accent text-white hover:bg-accent-hover shadow-glow hover:shadow-lg transition-all hover:scale-105"
              >
                Get Started <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 transition-all"
              >
                See How It Works
              </Button>
            </motion.div>
            
            <motion.p 
              className="text-sm text-white/70 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              Free users get 2 contracts per month • No credit card required
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
