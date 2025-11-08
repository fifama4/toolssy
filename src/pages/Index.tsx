import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ToolsGrid from "@/components/ToolsGrid";
import Features from "@/components/Features";
import Footer from "@/components/Footer";
import AdBanner from "@/components/AdBanner";

const Index = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Toolssy",
    "description": "Free online tools for productivity - Timer, Word Counter, QR Generator, PDF Tools, File Converter, and Text Tools",
    "url": window.location.origin,
    "potentialAction": {
      "@type": "SearchAction",
      "target": `${window.location.origin}/?s={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Free Online Tools for Productivity & Efficiency</title>
        <meta
          name="description"
          content="Discover Toolssy's collection of free online tools: Timer, Word Counter, QR Generator, PDF Merge & Compress, File Converter, and Text Tools. Fast, responsive, and easy to use."
        />
        <meta name="keywords" content="online tools, timer, stopwatch, word counter, qr generator, pdf tools, file converter, text tools, productivity, free tools" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Free Online Tools for Productivity & Efficiency" />
        <meta property="og:description" content="Discover Toolssy's collection of free online tools: Timer, Word Counter, QR Generator, PDF Merge & Compress, File Converter, and Text Tools." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.origin} />
        <meta property="og:image" content={`${window.location.origin}/og-image.png`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Free Online Tools for Productivity & Efficiency" />
        <meta name="twitter:description" content="Discover Toolssy's collection of free online tools for enhanced productivity." />
        <meta name="twitter:image" content={`${window.location.origin}/og-image.png`} />
        
        <link rel="canonical" href={window.location.origin} />
        
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
          <Hero />
          <ToolsGrid />
          
          {/* Middle Ad Banner */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <AdBanner />
            </div>
          </section>
          
          <Features />
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

export default Index;
