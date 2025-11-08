import { Zap, Shield, Smartphone, FileCheck, Clock, Lock } from "lucide-react";

const PDFToolFeatures = () => {
  const features = [
    {
      icon: Zap,
      title: "Fast & Accurate",
      description: "Process PDFs instantly with high precision. Merge multiple files or compress them in seconds without quality loss."
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your files are processed locally in your browser. No uploads to external servers, ensuring complete privacy and security."
    },
    {
      icon: Smartphone,
      title: "Fully Responsive",
      description: "Works seamlessly on desktop, tablet, and mobile devices. Merge or compress PDFs anywhere, anytime with ease."
    }
  ];

  const useCases = [
    {
      icon: FileCheck,
      title: "Document Management",
      description: "Combine multiple PDF reports, invoices, or contracts into a single organized file for easy sharing and storage."
    },
    {
      icon: Clock,
      title: "Quick Compression",
      description: "Reduce large PDF file sizes for faster email attachments, uploads, and downloads without losing readability."
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "All processing happens in your browser. Your sensitive documents never leave your device, ensuring complete confidentiality."
    }
  ];

  return (
    <>
      {/* Main Features Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Why Choose Our PDF Tool?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Professional-grade PDF processing with enterprise-level features, completely free and secure.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group bg-background rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl group-hover:blur-2xl transition-all duration-500"></div>
                  <div className="relative w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-500">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Perfect For Every Need
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              From business professionals to students, our PDF tool simplifies your workflow.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-secondary to-secondary/50 rounded-2xl p-8 border border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-lg hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <useCase.icon className="w-12 h-12 text-primary mb-6" />
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  {useCase.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
                Pro Tips for PDF Processing
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-background rounded-xl p-6 border border-border hover:shadow-premium-md transition-all duration-300 animate-fade-in">
                <h4 className="font-semibold text-foreground mb-2">✨ Organize Before Merging</h4>
                <p className="text-sm text-muted-foreground">
                  Upload your PDFs in the order you want them merged. The final document will maintain this sequence.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border hover:shadow-premium-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                <h4 className="font-semibold text-foreground mb-2">🎯 Compression Works Best For</h4>
                <p className="text-sm text-muted-foreground">
                  Large files with high-resolution images. Text-heavy documents may see minimal size reduction.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border hover:shadow-premium-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                <h4 className="font-semibold text-foreground mb-2">🔒 Privacy Guaranteed</h4>
                <p className="text-sm text-muted-foreground">
                  All processing happens in your browser using client-side JavaScript. Your files never touch our servers.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 border border-border hover:shadow-premium-md transition-all duration-300 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                <h4 className="font-semibold text-foreground mb-2">⚡ No File Limits</h4>
                <p className="text-sm text-muted-foreground">
                  Merge or compress as many files as your browser memory can handle. Most modern browsers support very large files.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PDFToolFeatures;
