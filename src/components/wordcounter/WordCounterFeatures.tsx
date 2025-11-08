import { Zap, Gauge, Smartphone } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    name: "Fast & Accurate",
    description: "Real-time text analysis with instant word and character counting. Get precise statistics as you type.",
    icon: Zap,
  },
  {
    name: "Easy to Use",
    description: "Clean, intuitive interface that requires no learning curve. Simply paste your text and see results instantly.",
    icon: Gauge,
  },
  {
    name: "Fully Responsive",
    description: "Works seamlessly on any device - desktop, tablet, or mobile. Write and analyze text anywhere, anytime.",
    icon: Smartphone,
  },
];

const WordCounterFeatures = () => {
  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Use Our <span className="bg-gradient-primary bg-clip-text text-transparent">Word Counter</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Professional text analysis tools designed for writers, students, and content creators
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card
              key={feature.name}
              className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              {/* Gradient Background on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

              <div className="relative p-8 text-center">
                {/* Icon */}
                <div className="mb-6 inline-flex p-5 bg-primary/10 rounded-3xl group-hover:bg-primary group-hover:shadow-premium-glow transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-10 h-10 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>

                {/* Feature Name */}
                <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Decorative Element */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </Card>
          ))}
        </div>

        {/* Use Cases Section */}
        <div className="mt-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center text-foreground mb-12">
            Perfect For Every <span className="bg-gradient-primary bg-clip-text text-transparent">Writer</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Content Writing", emoji: "✍️", desc: "Track word count for blog posts and articles" },
              { title: "SEO Optimization", emoji: "🔍", desc: "Optimize meta descriptions and content length" },
              { title: "Academic Writing", emoji: "📚", desc: "Meet essay and thesis word requirements" },
              { title: "Social Media", emoji: "💬", desc: "Stay within character limits for posts" },
            ].map((useCase, index) => (
              <Card
                key={useCase.title}
                className="group relative overflow-hidden bg-background border-border hover:border-primary/50 transition-all duration-300 hover:shadow-premium-lg hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${0.5 + index * 0.1}s` }}
              >
                <div className="p-6 text-center">
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{useCase.emoji}</div>
                  <h4 className="text-lg font-bold text-foreground mb-2">{useCase.title}</h4>
                  <p className="text-sm text-muted-foreground">{useCase.desc}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <Card className="bg-gradient-to-br from-primary/5 to-transparent border-primary/20 shadow-premium-lg">
            <div className="p-8 md:p-10">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">Pro Tips</span> for Better Writing
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-muted-foreground">Aim for 200-300 words per minute reading time for blog posts</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-muted-foreground">Keep meta descriptions between 150-160 characters for best SEO</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-muted-foreground">Average paragraph should be 50-100 words for readability</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                    <p className="text-muted-foreground">Use short sentences (15-20 words) for better engagement</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Ad Placeholder - Bottom */}
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground text-sm">Ad Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WordCounterFeatures;
