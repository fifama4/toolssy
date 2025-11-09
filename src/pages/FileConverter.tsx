import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FileConverterInterface from "@/components/fileconverter/FileConverterInterface";
import FileConverterFeatures from "@/components/fileconverter/FileConverterFeatures";
import AdBanner from "@/components/AdBanner";

const FileConverter = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy File & Image Converter",
    "url": `${window.location.origin}/file-converter`,
    "description": "Premium online file and image converter supporting PDF, JPG, PNG formats. Convert files easily with high-quality output.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Image to Image Conversion (JPG/PNG)",
      "Image to PDF Conversion",
      "Drag and Drop Interface",
      "Batch Conversion",
      "High Quality Output",
      "Client-side Processing",
      "Responsive Design"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Online File & Image Converter (PDF, JPG, PNG)</title>
        <meta
          name="description"
          content="Convert PDF, JPG, PNG, and more easily using Toolssy's online converter. Transform images and files with high quality. Fast, responsive, and free."
        />
        <meta name="keywords" content="file converter, image converter, pdf converter, jpg to png, png to jpg, image to pdf, convert files, online converter" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Online File & Image Converter" />
        <meta property="og:description" content="Convert files and images easily between PDF, JPG, and PNG formats." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/file-converter`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Online File & Image Converter" />
        <meta name="twitter:description" content="Convert files and images between PDF, JPG, and PNG formats instantly." />
        
        <link rel="canonical" href={`${window.location.origin}/file-converter`} />
        
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
          <FileConverterInterface />
          <FileConverterFeatures />
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

export default FileConverter;
