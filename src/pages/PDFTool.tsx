import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PDFToolInterface from "@/components/pdftool/PDFToolInterface";
import PDFToolFeatures from "@/components/pdftool/PDFToolFeatures";
import AdBanner from "@/components/AdBanner";

const PDFTool = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy PDF Merge & Compress Tool",
    "description": "Combine multiple PDFs or reduce file size easily with our premium online tool. Fast, secure, and fully responsive.",
    "url": `${window.location.origin}/pdf-tool`,
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Merge multiple PDF files",
      "Compress PDF file size",
      "Drag and drop interface",
      "Secure client-side processing",
      "No file size limits",
      "No uploads to server"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Online PDF Merge & Compress Tool</title>
        <meta
          name="description"
          content="Merge and compress PDFs easily using Toolssy's online PDF tool. Fast, secure, responsive, and free."
        />
        <meta name="keywords" content="pdf merge, pdf compress, combine pdf, reduce pdf size, pdf tool, online pdf, merge pdf files, compress pdf online" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Online PDF Merge & Compress Tool" />
        <meta property="og:description" content="Merge and compress PDFs easily using Toolssy's online PDF tool. Fast, secure, responsive, and free." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/pdf-tool`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Online PDF Merge & Compress Tool" />
        <meta name="twitter:description" content="Merge and compress PDFs easily with our free online tool." />
        
        <link rel="canonical" href={`${window.location.origin}/pdf-tool`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        {/* Top Ad Banner */}
        <div className="pt-20 bg-background">
          <div className="container mx-auto px-4 py-4">
            <AdBanner />
          </div>
        </div>
        
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20 md:py-32">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            
            <div className="container mx-auto px-4 relative z-10">
              <div className="text-center max-w-4xl mx-auto animate-fade-in">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent animate-scale-in">
                  PDF Merge & Compress
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  Combine multiple PDFs or reduce file size easily with our premium online tool.
                </p>
              </div>
            </div>
          </section>

          {/* Tool Interface */}
          <PDFToolInterface />

          {/* Features Section */}
          <PDFToolFeatures />
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

export default PDFTool;
