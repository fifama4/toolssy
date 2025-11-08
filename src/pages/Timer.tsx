import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimerInterface from "@/components/timer/TimerInterface";
import TimerFeatures from "@/components/timer/TimerFeatures";

const Timer = () => {
  useEffect(() => {
    // Update meta tags for SEO
    document.title = "Toolssy – Premium Online Timer & Stopwatch";
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        "content",
        "Use Toolssy's online Timer & Stopwatch to track time efficiently. Fast, accurate, fully responsive, modern, and free."
      );
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <TimerInterface />
        <TimerFeatures />
      </main>
      <Footer />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": "Toolssy Timer & Stopwatch",
          "url": "https://toolssy.com/timer",
          "description": "Premium online timer and stopwatch tool for tracking time efficiently",
          "applicationCategory": "UtilityApplication",
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          },
          "featureList": [
            "Countdown Timer",
            "Stopwatch",
            "Millisecond Precision",
            "Audio Alerts",
            "Responsive Design"
          ]
        })}
      </script>
    </div>
  );
};

export default Timer;
