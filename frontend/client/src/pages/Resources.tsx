import { Phone, Globe, Shield, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGetResources } from "@/hooks/use-resources";
import { Skeleton } from "@/components/ui/skeleton";

export default function Resources() {
  const { data: resources, isLoading } = useGetResources();

  // Keep emergency hotlines hardcoded as they are critical and shouldn't depend on DB
  const emergencyResources = [
    {
      name: "National Suicide Prevention Lifeline",
      description: "24/7, free and confidential support for people in distress.",
      contact: "988",
      type: "phone",
    },
    {
      name: "Crisis Text Line",
      description: "Text HOME to 741741 to connect with a Crisis Counselor.",
      contact: "Text HOME to 741741",
      type: "text",
    },
    {
      name: "The Trevor Project",
      description: "Crisis intervention and suicide prevention for LGBTQ youth.",
      contact: "1-866-488-7386",
      type: "phone",
    },
  ];

  return (
    <div className="min-h-screen bg-muted/30 pb-20">
      <div className="bg-primary/5 border-b py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-display font-bold text-foreground mb-4">Support Resources</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional help is available. If you or someone you know is in crisis,
            please reach out to these organizations immediately.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 max-w-5xl">
        {/* Emergency Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-100 rounded-lg text-red-600">
              <Phone className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Emergency Hotlines</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyResources.map((resource) => (
              <div key={resource.name} className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all border-l-4 border-l-red-500">
                <h3 className="font-bold text-lg mb-2">{resource.name}</h3>
                <p className="text-muted-foreground text-sm mb-4 min-h-[40px]">
                  {resource.description}
                </p>
                <div className="bg-red-50 text-red-700 font-mono font-bold text-lg py-2 px-4 rounded-lg text-center">
                  {resource.contact}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Additional Resources from DB */}
        {isLoading ? (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <Skeleton className="h-10 w-10 rounded-lg" />
              <Skeleton className="h-8 w-48" />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-32 rounded-2xl" />
              ))}
            </div>
          </section>
        ) : resources && resources.length > 0 ? (
          <section className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold">Additional Resources</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource) => (
                <a
                  key={resource.id}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition-all group"
                >
                  <h3 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center text-primary text-sm font-medium">
                    <ExternalLink className="w-4 h-4 mr-1" />
                    Visit Resource
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        {/* Therapy Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold">Find a Therapist</h2>
          </div>

          <div className="bg-white rounded-3xl p-8 border shadow-sm">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Professional Directory</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Connecting with a licensed therapist can be a transformative step in your mental health journey.
                  Browse our partner directories to find a specialist who fits your needs, location, and insurance.
                </p>
                <div className="flex gap-4 flex-wrap">
                  <Button variant="outline" className="rounded-full">
                    Psychology Today <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    BetterHelp <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                  <Button variant="outline" className="rounded-full">
                    Talkspace <ExternalLink className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-1/3 aspect-square bg-muted rounded-2xl flex items-center justify-center relative overflow-hidden">
                {/* Abstract shape illustration placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                <Globe className="w-16 h-16 text-primary/50 relative z-10" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
