import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WordCounterInterface from "@/components/wordcounter/WordCounterInterface";
import WordCounterFeatures from "@/components/wordcounter/WordCounterFeatures";
import AdBanner from "@/components/AdBanner";

const WordCounter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy Word & Character Counter",
    "url": `${window.location.origin}/word-counter`,
    "description": "Premium online word and character counter tool for writers and content creators. Count words, characters, sentences, and estimate reading time.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Word Count",
      "Character Count",
      "Sentence Count",
      "Paragraph Count",
      "Reading Time Estimate",
      "Real-time Analysis",
      "Copy to Clipboard",
      "Responsive Design"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Online Word & Character Counter</title>
        <meta
          name="description"
          content="Use Toolssy's online Word & Character Counter to count words, characters, sentences, paragraphs, and estimate reading time. Fast, accurate, responsive, and free."
        />
        <meta name="keywords" content="word counter, character counter, text counter, reading time, word count tool, character count, free word counter" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Online Word & Character Counter" />
        <meta property="og:description" content="Count words, characters, and estimate reading time with our free online tool." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/word-counter`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Online Word & Character Counter" />
        <meta name="twitter:description" content="Count words, characters, and estimate reading time instantly." />
        
        <link rel="canonical" href={`${window.location.origin}/word-counter`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Top Ad Banner */}
        <div className="pt-20 bg-background">
          <div className="container mx-auto px-4 py-4">
            <AdBanner />
          </div>
        </div>

        <main>
          <WordCounterInterface />
          <WordCounterFeatures />
        </main>
        
        {/* Bottom Ad Banner */}
        <section className="py-8 bg-background">
          <div className="container mx-auto px-4">
            <AdBanner />
          </div>
        </section>
        
        <Footer />
      </div>
    </>
  );
};

export default WordCounter;
