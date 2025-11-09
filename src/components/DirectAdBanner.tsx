import { useEffect, useRef } from "react";

interface DirectAdBannerProps {
  adId: string; // Unique identifier for each ad instance
}

const DirectAdBanner = ({ adId }: DirectAdBannerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scriptsLoadedRef = useRef(false);

  useEffect(() => {
    if (scriptsLoadedRef.current || !containerRef.current) return;

    try {
      // Create unique variable name for this ad instance
      const configVarName = `atOptions_${adId}`;
      
      // Create the ad configuration script
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        window.${configVarName} = {
          'key': '5e09a783462a2bb5ff8eff1447398ae1',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
        if (typeof atOptions === 'undefined') {
          atOptions = window.${configVarName};
        }
      `;

      // Create the invoke script
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "//www.highperformanceformat.com/5e09a783462a2bb5ff8eff1447398ae1/invoke.js";
      invokeScript.async = true;
      
      // Add onload handler for debugging
      invokeScript.onload = () => {
        console.log(`✅ Ad script loaded successfully for ${adId}`);
      };
      
      invokeScript.onerror = () => {
        console.error(`❌ Failed to load ad script for ${adId}`);
      };

      // Append scripts to container
      if (containerRef.current) {
        containerRef.current.appendChild(configScript);
        containerRef.current.appendChild(invokeScript);
        scriptsLoadedRef.current = true;
      }
    } catch (error) {
      console.error(`Error loading ad script for ${adId}:`, error);
    }

    // Cleanup function
    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [adId]);

  return (
    <div style={{ textAlign: 'center', margin: '20px 0' }}>
      <div
        ref={containerRef}
        id={`ad-container-${adId}`}
        style={{ 
          minHeight: '90px', 
          width: '100%', 
          maxWidth: '728px', 
          margin: '0 auto'
        }}
      />
    </div>
  );
};

export default DirectAdBanner;
