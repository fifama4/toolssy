import { useState, useEffect } from "react";
import { Copy, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { z } from "zod";

// Input validation schema
const textInputSchema = z.string().max(50000, { message: "Text must be less than 50,000 characters" });

const WordCounterInterface = () => {
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Calculate statistics
  const wordCount = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;
  const charCountWithSpaces = text.length;
  const charCountWithoutSpaces = text.replace(/\s/g, "").length;
  const sentenceCount = text.trim() === "" ? 0 : (text.match(/[.!?]+/g) || []).length;
  const paragraphCount = text.trim() === "" ? 0 : text.split(/\n\n+/).filter(p => p.trim() !== "").length;
  
  // Average reading speed: 200 words per minute
  const readingTimeMinutes = Math.ceil(wordCount / 200);
  const readingTimeDisplay = readingTimeMinutes === 0 ? "< 1 min" : `${readingTimeMinutes} min${readingTimeMinutes > 1 ? "s" : ""}`;

  // Validate input
  const handleTextChange = (value: string) => {
    const validation = textInputSchema.safeParse(value);
    
    if (!validation.success) {
      setValidationError(validation.error.errors[0].message);
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    setValidationError(null);
    setText(value);
  };

  // Clear text
  const handleClear = () => {
    setText("");
    setValidationError(null);
    toast.success("Text cleared");
  };

  // Copy to clipboard
  const handleCopy = async () => {
    if (text.trim() === "") {
      toast.error("Nothing to copy");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success("Copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero relative overflow-hidden min-h-screen">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/3 right-1/3 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            Word & <span className="bg-gradient-primary bg-clip-text text-transparent">Character Counter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            Count words, characters, and track your text efficiently with our premium online tool
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gradient-card border-border shadow-premium-xl animate-scale-in overflow-hidden" style={{ animationDelay: "0.3s" }}>
            <div className="p-6 md:p-10">
              {/* Text Input Area */}
              <div className="mb-8">
                <Textarea
                  value={text}
                  onChange={(e) => handleTextChange(e.target.value)}
                  placeholder="Start typing or paste your text here..."
                  className="min-h-[300px] md:min-h-[400px] text-base md:text-lg resize-none focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary/50 focus:border-primary"
                  aria-label="Text input for word and character counting"
                />
                {validationError && (
                  <p className="text-destructive text-sm mt-2 animate-fade-in">{validationError}</p>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <Button
                  onClick={handleCopy}
                  size="lg"
                  className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                  disabled={text.trim() === ""}
                >
                  {copied ? (
                    <CheckCircle2 className="w-5 h-5 mr-2" />
                  ) : (
                    <Copy className="w-5 h-5 mr-2" />
                  )}
                  <span className="relative z-10">{copied ? "Copied!" : "Copy Text"}</span>
                  <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                </Button>

                <Button
                  onClick={handleClear}
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden border-2 hover:border-primary hover:text-primary shadow-premium-sm hover:shadow-premium-md transition-all duration-300"
                  disabled={text === ""}
                >
                  <RotateCcw className="w-5 h-5 mr-2 group-hover:rotate-180 transition-transform duration-500" />
                  <span className="relative z-10">Clear Text</span>
                </Button>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <StatCard
                  label="Words"
                  value={wordCount}
                  delay="0s"
                />
                <StatCard
                  label="Characters"
                  value={charCountWithSpaces}
                  delay="0.05s"
                />
                <StatCard
                  label="No Spaces"
                  value={charCountWithoutSpaces}
                  delay="0.1s"
                />
                <StatCard
                  label="Sentences"
                  value={sentenceCount}
                  delay="0.15s"
                />
                <StatCard
                  label="Paragraphs"
                  value={paragraphCount}
                  delay="0.2s"
                />
                <StatCard
                  label="Reading Time"
                  value={readingTimeDisplay}
                  delay="0.25s"
                  isString
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Ad Placeholder - Top */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground text-sm">Ad Placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
};

// Stat Card Component
interface StatCardProps {
  label: string;
  value: number | string;
  delay?: string;
  isString?: boolean;
}

const StatCard = ({ label, value, delay = "0s", isString = false }: StatCardProps) => {
  return (
    <div
      className="group relative overflow-hidden bg-gradient-to-br from-primary/5 to-transparent border border-border rounded-xl p-4 hover:border-primary/50 transition-all duration-300 hover:shadow-premium-md hover:-translate-y-1 animate-fade-in"
      style={{ animationDelay: delay }}
    >
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
      <div className="relative">
        <p className="text-xs md:text-sm text-muted-foreground mb-1 font-medium">{label}</p>
        <p className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
          {isString ? value : typeof value === 'number' ? value.toLocaleString() : value}
        </p>
      </div>
    </div>
  );
};

export default WordCounterInterface;
