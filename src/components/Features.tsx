import { Zap, Smile, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    name: "Fast & Reliable",
    description: "Lightning-fast performance with 99.9% uptime guarantee. Your tools work when you need them.",
    icon: Zap,
  },
  {
    name: "Easy to Use",
    description: "Intuitive interface designed for everyone. No technical knowledge required to get started.",
    icon: Smile,
  },
  {
    name: "Fully Functional",
    description: "Complete feature sets with no limitations. Professional tools accessible to everyone.",
    icon: CheckCircle2,
  },
];

const Features = () => {
  return (
    <section className="py-20 md:py-32 bg-secondary/30 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Why Choose <span className="bg-gradient-primary bg-clip-text text-transparent">Toolssy</span>?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Experience the perfect blend of power, simplicity, and reliability
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.name}
              className="group relative overflow-hidden bg-background border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
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
      </div>
    </section>
  );
};

export default Features;
