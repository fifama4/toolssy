import { Card } from "@/components/ui/card";
import { Zap, Shield, Smartphone, Type, Copy, RotateCcw } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Fast & Accurate",
    description: "Instant text transformations with precise results every time",
  },
  {
    icon: Shield,
    title: "Easy to Use",
    description: "Simple, intuitive interface designed for everyone",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Works seamlessly on desktop, tablet, and mobile devices",
  },
];

const useCases = [
  {
    icon: Type,
    title: "Text Formatting",
    description: "Quickly convert text case for consistent formatting in documents and content",
  },
  {
    icon: Copy,
    title: "Data Cleaning",
    description: "Remove unwanted spaces and clean up text data for processing",
  },
  {
    icon: RotateCcw,
    title: "Creative Projects",
    description: "Reverse text for fun effects, puzzles, or creative writing projects",
  },
];

const TextToolsFeatures = () => {
  return (
    <>
      {/* Features Section */}
      <section className="py-20 md:py-32 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose Our{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Text Tools
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed to make text transformation effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 md:py-32 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Perfect For{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Every Need
              </span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From professional work to creative projects, our text tools have you covered
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={useCase.title}
                className="group p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
                  <useCase.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 md:py-32 bg-gradient-subtle relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Pro <span className="bg-gradient-primary bg-clip-text text-transparent">Tips</span>
              </h2>
            </div>

            <Card className="p-8 bg-gradient-card border-border shadow-premium-xl">
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Batch Processing</h3>
                    <p className="text-muted-foreground">
                      Process multiple lines at once - perfect for lists, CSV data, or code formatting
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Copy & Share</h3>
                    <p className="text-muted-foreground">
                      Use the copy button to quickly paste results into your documents or applications
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground mb-2">Real-Time Stats</h3>
                    <p className="text-muted-foreground">
                      Monitor word and character count as you type to meet specific length requirements
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </>
  );
};

export default TextToolsFeatures;
