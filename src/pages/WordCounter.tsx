import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordCounterInterface from "@/components/wordcounter/WordCounterInterface";
import WordCounterFeatures from "@/components/wordcounter/WordCounterFeatures";

const WordCounter = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "Toolssy – Online Word & Character Counter";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Use Toolssy's online Word & Character Counter to count words, characters, and reading time. Fast, accurate, responsive, and free."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <WordCounterInterface />
        <WordCounterFeatures />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Toolssy Word & Character Counter",
          "url": "https://toolssy.com/word-counter",
          "description": "Premium online word and character counter tool for writers and content creators",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Word Count",
            "Character Count",
            "Reading Time Estimate",
            "Real-time Analysis",
            "Copy to Clipboard",
            "Responsive Design"
          ]
        })}
      </script>
    </div>
  );
};

export default WordCounter;
