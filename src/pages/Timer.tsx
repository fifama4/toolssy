import { useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TimerInterface from "@/components/timer/TimerInterface";
import TimerFeatures from "@/components/timer/TimerFeatures";
import AdBanner from "@/components/AdBanner";

const Timer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Toolssy Timer & Stopwatch",
    "url": `${window.location.origin}/timer`,
    "description": "Premium online timer and stopwatch tool for tracking time efficiently. Fast, accurate, and fully responsive.",
    "applicationCategory": "UtilityApplication",
    "operatingSystem": "Any",
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
  };

  return (
    <>
      <Helmet>
        <title>Toolssy – Premium Online Timer & Stopwatch</title>
        <meta
          name="description"
          content="Use Toolssy's online Timer & Stopwatch to track time efficiently. Fast, accurate, fully responsive, modern, and free."
        />
        <meta name="keywords" content="online timer, stopwatch, countdown timer, time tracker, productivity timer, free timer" />
        
        {/* Open Graph Tags */}
        <meta property="og:title" content="Toolssy – Premium Online Timer & Stopwatch" />
        <meta property="og:description" content="Use Toolssy's online Timer & Stopwatch to track time efficiently." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${window.location.origin}/timer`} />
        
        {/* Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Toolssy – Premium Online Timer & Stopwatch" />
        <meta name="twitter:description" content="Track time efficiently with our premium online timer and stopwatch." />
        
        <link rel="canonical" href={`${window.location.origin}/timer`} />
        
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
          <TimerInterface />
          <TimerFeatures />
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

export default Timer;
