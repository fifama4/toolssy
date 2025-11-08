import { Zap, Shield, Smartphone, Image, FileCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Fast & Accurate",
    description: "Lightning-fast conversion with high-quality output every time",
    color: "from-primary/20 to-primary/5",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Your files are processed locally in your browser for maximum privacy",
    color: "from-primary-light/20 to-primary-light/5",
  },
  {
    icon: Smartphone,
    title: "Fully Responsive",
    description: "Works perfectly on desktop, tablet, and mobile devices",
    color: "from-primary/20 to-primary/5",
  },
];

const useCases = [
  {
    icon: Image,
    title: "Image Format Conversion",
    description: "Convert between JPG and PNG formats with ease",
  },
  {
    icon: FileCheck,
    title: "Create PDF Documents",
    description: "Transform images into professional PDF files",
  },
  {
    icon: Sparkles,
    title: "Batch Processing",
    description: "Convert multiple files at once to save time",
  },
];

const FileConverterFeatures = () => {
  return (
    <>
      {/* Main Features Section */}
      <section className="py-20 bg-muted/30 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Why Choose Our <span className="bg-gradient-primary bg-clip-text text-transparent">Converter</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional-grade file conversion with powerful features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={feature.title}
                className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

                <div className="relative p-8">
                  <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <feature.icon className="w-8 h-8 text-primary" />
                  </div>

                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                    {feature.title}
                  </h3>

                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>

                <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors duration-300"></div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-20 bg-background relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Powerful <span className="bg-gradient-primary bg-clip-text text-transparent">Conversion Features</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Everything you need for professional file conversion
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {useCases.map((useCase, index) => (
              <Card
                key={useCase.title}
                className="p-8 bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-1 animate-fade-in-up group"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110">
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

      {/* Best Practices Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Conversion <span className="bg-gradient-primary bg-clip-text text-transparent">Best Practices</span>
              </h2>
            </div>

            <Card className="p-8 md:p-12 bg-gradient-card border-border shadow-premium-lg animate-fade-in-up">
              <div className="space-y-6">
                <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Choose the Right Format
                    </h3>
                    <p className="text-muted-foreground">
                      Use JPG for photos with many colors, PNG for images with transparency, and PDF for documents.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Check File Size
                    </h3>
                    <p className="text-muted-foreground">
                      Ensure your files are under 10MB for optimal conversion speed and quality.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Batch Convert Similar Files
                    </h3>
                    <p className="text-muted-foreground">
                      Upload multiple files of the same type to convert them all at once and save time.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 group hover:translate-x-2 transition-transform duration-300">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      Privacy First
                    </h3>
                    <p className="text-muted-foreground">
                      All conversions happen in your browser - your files never leave your device.
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

export default FileConverterFeatures;
