import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileConverterInterface from "@/components/fileconverter/FileConverterInterface";
import FileConverterFeatures from "@/components/fileconverter/FileConverterFeatures";

const FileConverter = () => {
  return (
    <>
      <Helmet>
        <title>Toolssy – Online File & Image Converter (PDF, JPG, PNG)</title>
        <meta
          name="description"
          content="Convert PDF, JPG, PNG, and more easily using Toolssy's online converter. Fast, high-quality, responsive, and free."
        />
        <meta name="keywords" content="file converter, image converter, PDF to JPG, JPG to PNG, PNG to PDF, online converter, free converter" />
        <link rel="canonical" href="https://toolssy.com/file-converter" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Toolssy – Online File & Image Converter" />
        <meta property="og:description" content="Convert PDF, JPG, PNG, and more easily using Toolssy's online converter." />
        <meta property="og:type" content="website" />
        
        {/* JSON-LD Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            "name": "Toolssy File & Image Converter",
            "applicationCategory": "UtilitiesApplication",
            "operatingSystem": "Any",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "USD"
            },
            "description": "Convert PDF, JPG, PNG, and other file formats instantly online. Fast, secure, and free.",
            "featureList": [
              "Convert images between JPG and PNG formats",
              "Convert images to PDF documents",
              "High-quality conversion",
              "Fast processing",
              "No registration required",
              "Secure and private"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        
        {/* Ad Placeholder - Top Banner */}
        <div className="w-full bg-muted/30 border-y border-border animate-fade-in">
          <div className="container mx-auto px-4 py-4">
            <div className="bg-background/50 border border-dashed border-primary/30 rounded-lg p-6 text-center">
              <p className="text-sm text-muted-foreground">Advertisement Placeholder - Top Banner (728x90)</p>
              <p className="text-xs text-muted-foreground mt-1">Adfster Integration Ready</p>
            </div>
          </div>
        </div>

        <main>
          <FileConverterInterface />
          
          {/* Ad Placeholder - Middle */}
          <div className="w-full bg-muted/20 py-8 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="bg-background/50 border border-dashed border-primary/30 rounded-lg p-8 text-center max-w-4xl mx-auto">
                <p className="text-sm text-muted-foreground">Advertisement Placeholder - Middle Banner (970x250)</p>
                <p className="text-xs text-muted-foreground mt-1">Adfster Integration Ready</p>
              </div>
            </div>
          </div>

          <FileConverterFeatures />
          
          {/* Ad Placeholder - Bottom Banner */}
          <div className="w-full bg-muted/30 border-y border-border py-8 animate-fade-in">
            <div className="container mx-auto px-4">
              <div className="bg-background/50 border border-dashed border-primary/30 rounded-lg p-6 text-center">
                <p className="text-sm text-muted-foreground">Advertisement Placeholder - Bottom Banner (728x90)</p>
                <p className="text-xs text-muted-foreground mt-1">Adfster Integration Ready</p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default FileConverter;
