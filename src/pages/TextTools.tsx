import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TextToolsInterface from "@/components/texttools/TextToolsInterface";
import TextToolsFeatures from "@/components/texttools/TextToolsFeatures";
import AdBanner from "@/components/AdBanner";

const TextTools = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy Text Tools",
    "url": `${window.location.origin}/text-tools`,
    "description": "Premium online text transformation tools for converting text to uppercase, lowercase, removing spaces, reversing text, and counting words and characters",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
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
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Online Text Tools: Uppercase, Lowercase, Remove Spaces</title>
        <meta
          name="description"
          content="Use Toolssy's Text Tools to quickly transform text: uppercase, lowercase, remove spaces, reverse text, word count, and character count. Fast, responsive, and free."
        />
        <meta name="keywords" content="text tools, uppercase, lowercase, remove spaces, reverse text, text transformer, word count, character count, text converter" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Online Text Tools" />
        <meta property="og:description" content="Transform text easily with our free online text tools: uppercase, lowercase, reverse, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/text-tools`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Online Text Tools" />
        <meta name="twitter:description" content="Transform text with our free text tools: uppercase, lowercase, remove spaces, and more." />
        
        <link rel="canonical" href={`${window.location.origin}/text-tools`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <TextToolsInterface />
          
          {/* Middle Ad Banner */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <AdBanner />
            </div>
          </section>
          
          <TextToolsFeatures />
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

export default TextTools;
