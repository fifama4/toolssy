import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import QRGeneratorInterface from "@/components/qrgenerator/QRGeneratorInterface";
import QRGeneratorFeatures from "@/components/qrgenerator/QRGeneratorFeatures";

const QRGenerator = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "Toolssy – Online QR Code Generator";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Generate custom QR codes instantly using Toolssy's online QR Code Generator. Fast, high-quality, responsive, and free."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <QRGeneratorInterface />
        <QRGeneratorFeatures />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Toolssy QR Code Generator",
          "url": "https://toolssy.com/qr-generator",
          "description": "Premium online QR code generator for URLs, text, and Wi-Fi credentials",
          "applicationCategory": "UtilityApplication",
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
            "Responsive Design"
          ]
        })}
      </script>
    </div>
  );
};

export default QRGenerator;
