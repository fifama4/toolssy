import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextToolsInterface from "@/components/texttools/TextToolsInterface";
import TextToolsFeatures from "@/components/texttools/TextToolsFeatures";

const TextTools = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "Toolssy – Online Text Tools: Uppercase, Lowercase, Remove Spaces";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Use Toolssy's Text Tools to quickly transform text: uppercase, lowercase, remove spaces, reverse text, and more. Fast, responsive, and free."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TextToolsInterface />
        <TextToolsFeatures />
        
        {/* Bottom Ad Placeholder */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="p-6 bg-secondary/30 border-dashed border-2 border-border rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Advertisement Space - Footer Banner (728x90)</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Toolssy Text Tools",
          "url": "https://toolssy.com/text-tools",
          "description": "Premium online text transformation tools for converting text to uppercase, lowercase, removing spaces, reversing text, and counting words and characters",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Uppercase Conversion",
            "Lowercase Conversion",
            "Remove Spaces",
            "Reverse Text",
            "Word Count",
            "Character Count",
            "Copy to Clipboard",
            "Real-time Processing",
            "Responsive Design"
          ]
        })}
      </script>
    </div>
  );
};

export default TextTools;
