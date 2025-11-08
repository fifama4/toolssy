import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRGeneratorInterface from "@/components/qrgenerator/QRGeneratorInterface";
import QRGeneratorFeatures from "@/components/qrgenerator/QRGeneratorFeatures";
import AdBanner from "@/components/AdBanner";

const QRGenerator = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy QR Code Generator",
    "url": `${window.location.origin}/qr-generator`,
    "description": "Premium online QR code generator for URLs, text, and Wi-Fi credentials. Create custom QR codes instantly with high-quality output.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "URL QR Codes",
      "Text QR Codes",
      "Wi-Fi QR Codes",
      "High Resolution Output",
      "Instant Download",
      "Custom Colors",
      "Responsive Design"
    ]
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Online QR Code Generator</title>
        <meta
          name="description"
          content="Generate custom QR codes instantly using Toolssy's online QR Code Generator. Create QR codes for URLs, text, and Wi-Fi. Fast, high-quality, responsive, and free."
        />
        <meta name="keywords" content="qr code generator, create qr code, qr code maker, free qr generator, wifi qr code, url qr code, text qr code" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Online QR Code Generator" />
        <meta property="og:description" content="Create custom QR codes instantly for URLs, text, and Wi-Fi credentials." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/qr-generator`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Online QR Code Generator" />
        <meta name="twitter:description" content="Generate custom QR codes instantly with our free online tool." />
        
        <link rel="canonical" href={`${window.location.origin}/qr-generator`} />
        
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <QRGeneratorInterface />
          
          {/* Middle Ad Banner */}
          <section className="py-8 bg-background">
            <div className="container mx-auto px-4">
              <AdBanner />
            </div>
          </section>
          
          <QRGeneratorFeatures />
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

export default QRGenerator;
