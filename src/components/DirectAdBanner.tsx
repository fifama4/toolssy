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
      // Create the ad configuration script
      const configScript = document.createElement("script");
      configScript.type = "text/javascript";
      configScript.innerHTML = `
        atOptions = {
          'key': '2f22910538b32dc11b54e6abb18c5eca',
          'format': 'iframe',
          'height': 90,
          'width': 728,
          'params': {}
        };
      `;

      // Create the invoke script
      const invokeScript = document.createElement("script");
      invokeScript.type = "text/javascript";
      invokeScript.src = "https://www.highperformanceformat.com/2f22910538b32dc11b54e6abb18c5eca/invoke.js";
      // Ensure execution order and better compatibility
      ;(invokeScript as any).async = false;
      invokeScript.referrerPolicy = "no-referrer-when-downgrade";
      
      // Add onload handler for debugging
      invokeScript.onload = () => {
        console.log(`✅ Ad script loaded successfully for ${adId}`, invokeScript.src);
      };
      
      // One retry with cache-busting if it fails
      let retried = false;
      invokeScript.onerror = () => {
        if (!retried) {
          retried = true;
          const base = "https://www.highperformanceformat.com/2f22910538b32dc11b54e6abb18c5eca/invoke.js";
          const retrySrc = `${base}?cb=${Date.now()}`;
          console.warn(`⚠️ Retry loading ad script for ${adId}:`, retrySrc);
          invokeScript.src = retrySrc;
          return;
        }
        console.error(`❌ Failed to load ad script for ${adId}`, invokeScript.src);
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
