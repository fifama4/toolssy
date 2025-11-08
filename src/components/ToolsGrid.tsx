import { Timer, FileText, QrCode, FileStack, Type } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";

const tools = [
  {
    name: "Timer",
    description: "Set precise countdowns and stopwatches for any task",
    icon: Timer,
    color: "from-primary/20 to-primary/5",
    link: "/timer",
  },
  {
    name: "Word Counter",
    description: "Count words, characters, and analyze your text instantly",
    icon: FileText,
    color: "from-primary-light/20 to-primary-light/5",
    link: "/word-counter",
  },
  {
    name: "QR Generator",
    description: "Create custom QR codes for links, text, and more",
    icon: QrCode,
    color: "from-primary/20 to-primary/5",
    link: "/qr-generator",
  },
  {
    name: "PDF Merge",
    description: "Combine multiple PDF files into one document easily",
    icon: FileStack,
    color: "from-primary-light/20 to-primary-light/5",
    link: "/pdf-tool",
  },
  {
    name: "File Converter",
    description: "Convert PDF, JPG, PNG, and other formats instantly",
    icon: Type,
    color: "from-primary/20 to-primary/5",
    link: "/file-converter",
  },
];

const ToolsGrid = () => {
  return (
    <section id="tools" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Our <span className="bg-gradient-primary bg-clip-text text-transparent">Premium Tools</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Powerful, easy-to-use tools designed to make your work faster and more efficient
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {tools.map((tool, index) => (
            <Card
              key={tool.name}
              className="group relative overflow-hidden bg-gradient-card border-border hover:border-primary/50 transition-all duration-500 hover:shadow-premium-xl hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Gradient Background on Hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${tool.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>

              <div className="relative p-8">
                {/* Icon */}
                <div className="mb-6 inline-flex p-4 bg-primary/10 rounded-2xl group-hover:bg-primary/20 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <tool.icon className="w-8 h-8 text-primary" />
                </div>

                {/* Tool Name */}
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-300">
                  {tool.name}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {tool.description}
                </p>

                {/* Button */}
                <Link to={tool.link}>
                  <Button
                    className="w-full group/btn relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all duration-300"
                  >
                    <span className="relative z-10">Use Now</span>
                    <span className="absolute inset-0 bg-primary-light scale-0 group-hover/btn:scale-100 transition-transform duration-500"></span>
                  </Button>
                </Link>
              </div>

              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors duration-300"></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToolsGrid;
