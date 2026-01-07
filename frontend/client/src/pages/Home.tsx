import { motion } from "framer-motion";
import { Link } from "wouter";
import { CreateStoryModal } from "@/components/CreateStoryModal";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, ShieldCheck, HeartHandshake } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-gradient-soft">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
                Your safe space to <br />
                <span className="text-primary">heal & connect</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
                Share your thoughts anonymously, find support from a caring community, 
                and realize you are never alone in your journey.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <CreateStoryModal />
                <Link href="/community">
                  <Button variant="outline" size="lg" className="rounded-full bg-white/50 backdrop-blur-sm hover:bg-white border-primary/20 text-primary">
                    Browse Stories <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Background decorative blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
          <div className="absolute top-10 left-10 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-3xl" />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white/50 backdrop-blur-sm border-t border-white/60">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={ShieldCheck}
              title="Completely Anonymous"
              description="Share without fear of judgment. Your identity is protected, allowing you to be your authentic self."
              color="text-primary"
              bg="bg-primary/10"
            />
            <FeatureCard 
              icon={HeartHandshake}
              title="Supportive Community"
              description="Connect with people who understand what you're going through. Give and receive support freely."
              color="text-secondary-foreground"
              bg="bg-secondary/20"
            />
            <FeatureCard 
              icon={MessageCircle}
              title="Express Yourself"
              description="Vent, share joys, or ask for advice. Whatever you're feeling, there's space for it here."
              color="text-accent-foreground"
              bg="bg-accent"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="bg-foreground rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-white">
              Need immediate help?
            </h2>
            <p className="text-white/80 mb-8 text-lg">
              If you're in crisis, please don't hesitate to reach out to professional support services available 24/7.
            </p>
            <Link href="/resources">
              <Button size="lg" className="rounded-full bg-white text-foreground hover:bg-gray-100 font-semibold">
                Get Professional Help
              </Button>
            </Link>
          </div>
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-3xl -translate-x-1/3 translate-y-1/3" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, description, color, bg }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-sm border hover:shadow-lg transition-all"
    >
      <div className={`w-14 h-14 rounded-xl ${bg} ${color} flex items-center justify-center mb-6`}>
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}
