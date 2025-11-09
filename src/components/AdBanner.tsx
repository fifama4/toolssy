import { useEffect, useRef } from "react";

interface AdBannerProps {
  className?: string;
}

const AdBanner = ({ className = "" }: AdBannerProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    // Only load the script once
    if (scriptLoadedRef.current || !adContainerRef.current) return;

    try {
      // Create the ad configuration
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key' : '5e09a783462a2bb5ff8eff1447398ae1',
          'format' : 'iframe',
          'height' : 90,
          'width' : 728,
          'params' : {}
        };
      `;

      // Create the ad script
      const adScript = document.createElement("script");
      adScript.type = "text/javascript";
      adScript.src = "//www.highperformanceformat.com/5e09a783462a2bb5ff8eff1447398ae1/invoke.js";
      adScript.async = true;

      // Append scripts to the container
      if (adContainerRef.current) {
        adContainerRef.current.appendChild(configScript);
        adContainerRef.current.appendChild(adScript);
        scriptLoadedRef.current = true;
      }
    } catch (error) {
      console.error("Error loading ad script:", error);
    }

    // Cleanup function
    return () => {
      if (adContainerRef.current) {
        adContainerRef.current.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className={`flex justify-center items-center min-h-[90px] ${className}`}>
      <div
        ref={adContainerRef}
        className="max-w-full overflow-hidden"
        style={{ minHeight: "90px", width: "728px", maxWidth: "100%" }}
      />
    </div>
  );
};

export default AdBanner;
