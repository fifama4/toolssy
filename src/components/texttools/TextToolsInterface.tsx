import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import {
  Type,
  Copy,
  RotateCcw,
  Trash2,
  AlignLeft,
  Space,
  ArrowUpDown,
} from "lucide-react";

const TextToolsInterface = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);

  // Calculate stats whenever input changes
  const handleInputChange = (text: string) => {
    setInputText(text);
    setOutputText(text);
    
    // Count words (split by whitespace and filter empty strings)
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setWordCount(words.length);
    
    // Count characters
    setCharCount(text.length);
  };

  const handleUppercase = () => {
    const result = inputText.toUpperCase();
    setOutputText(result);
    toast.success("Text converted to UPPERCASE!");
  };

  const handleLowercase = () => {
    const result = inputText.toLowerCase();
    setOutputText(result);
    toast.success("Text converted to lowercase!");
  };

  const handleRemoveSpaces = () => {
    const result = inputText.replace(/\s+/g, "");
    setOutputText(result);
    toast.success("Spaces removed successfully!");
  };

  const handleReverseText = () => {
    const result = inputText.split("").reverse().join("");
    setOutputText(result);
    toast.success("Text reversed successfully!");
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      toast.success("Copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy text");
    }
  };

  const handleClear = () => {
    setInputText("");
    setOutputText("");
    setWordCount(0);
    setCharCount(0);
    toast.success("Text cleared!");
  };

  return (
    <section className="pt-32 pb-20 md:pb-32 bg-background relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Top Ad Placeholder */}
        <div className="max-w-5xl mx-auto mb-8">
          <Card className="p-4 bg-secondary/30 border-dashed border-2 border-border text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space - Top Banner (728x90)</p>
          </Card>
        </div>
        {/* Hero Section */}
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Text <span className="bg-gradient-primary bg-clip-text text-transparent">Tools</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto animate-fade-in-up">
            Transform your text easily using our premium online text tools.
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-5xl mx-auto">
          <Card className="p-6 md:p-8 bg-gradient-card border-border shadow-premium-xl animate-fade-in-up">
            {/* Input Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Type className="w-4 h-4 text-primary" />
                Enter Your Text
              </label>
              <Textarea
                value={inputText}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder="Type or paste your text here..."
                className="min-h-[200px] text-base focus-visible:ring-primary transition-all duration-300 hover:border-primary/50"
              />
            </div>

            {/* Stats Display */}
            <div className="grid grid-cols-2 gap-4 mb-6 animate-fade-in">
              <Card className="p-4 bg-secondary border-border hover:border-primary/50 transition-all duration-300 hover:shadow-premium-md">
                <div className="flex items-center gap-2">
                  <AlignLeft className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Words</p>
                    <p className="text-2xl font-bold text-foreground">{wordCount}</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4 bg-secondary border-border hover:border-primary/50 transition-all duration-300 hover:shadow-premium-md">
                <div className="flex items-center gap-2">
                  <Type className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Characters</p>
                    <p className="text-2xl font-bold text-foreground">{charCount}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
              <Button
                onClick={handleUppercase}
                disabled={!inputText}
                className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:scale-105"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                UPPERCASE
              </Button>
              <Button
                onClick={handleLowercase}
                disabled={!inputText}
                className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:scale-105"
              >
                <ArrowUpDown className="w-4 h-4 mr-2" />
                lowercase
              </Button>
              <Button
                onClick={handleRemoveSpaces}
                disabled={!inputText}
                className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:scale-105"
              >
                <Space className="w-4 h-4 mr-2" />
                Remove Spaces
              </Button>
              <Button
                onClick={handleReverseText}
                disabled={!inputText}
                className="group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-sm hover:shadow-premium-md transition-all duration-300 hover:scale-105"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reverse Text
              </Button>
              <Button
                onClick={handleCopy}
                disabled={!outputText}
                variant="outline"
                className="group relative overflow-hidden hover:bg-primary hover:text-primary-foreground border-2 transition-all duration-300 hover:scale-105"
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Result
              </Button>
              <Button
                onClick={handleClear}
                disabled={!inputText}
                variant="outline"
                className="group relative overflow-hidden hover:bg-destructive hover:text-destructive-foreground border-2 transition-all duration-300 hover:scale-105"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>

            {/* Output Area */}
            {outputText && (
              <div className="animate-fade-in">
                <label className="block text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                  <Type className="w-4 h-4 text-primary" />
                  Result
                </label>
                <Textarea
                  value={outputText}
                  readOnly
                  className="min-h-[200px] text-base bg-secondary/50 focus-visible:ring-primary transition-all duration-300"
                />
              </div>
            )}
          </Card>
        </div>

        {/* Middle Ad Placeholder */}
        <div className="max-w-5xl mx-auto mt-12">
          <Card className="p-6 bg-secondary/30 border-dashed border-2 border-border text-center">
            <p className="text-sm text-muted-foreground">Advertisement Space - Middle Banner (970x250)</p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default TextToolsInterface;
