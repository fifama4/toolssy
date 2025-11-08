import { useState, useRef, useEffect } from "react";
import { Download, QrCode as QrCodeIcon, Link as LinkIcon, Type, Wifi } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { z } from "zod";
import QRCode from "qrcode";

// Input validation schemas
const urlSchema = z.string().url({ message: "Please enter a valid URL" }).max(2048, { message: "URL must be less than 2048 characters" });
const textSchema = z.string().min(1, { message: "Text cannot be empty" }).max(1000, { message: "Text must be less than 1000 characters" });
const wifiSchema = z.object({
  ssid: z.string().min(1, { message: "Network name is required" }).max(32, { message: "Network name must be less than 32 characters" }),
  password: z.string().max(63, { message: "Password must be less than 63 characters" }),
  security: z.enum(["WPA", "WEP", "nopass"]),
});

const QRGeneratorInterface = () => {
  const [activeTab, setActiveTab] = useState("url");
  const [qrDataUrl, setQrDataUrl] = useState<string>("");
  const [generating, setGenerating] = useState(false);
  
  // URL input
  const [urlInput, setUrlInput] = useState("");
  const [urlError, setUrlError] = useState<string | null>(null);
  
  // Text input
  const [textInput, setTextInput] = useState("");
  const [textError, setTextError] = useState<string | null>(null);
  
  // Wi-Fi inputs
  const [wifiSSID, setWifiSSID] = useState("");
  const [wifiPassword, setWifiPassword] = useState("");
  const [wifiSecurity, setWifiSecurity] = useState<"WPA" | "WEP" | "nopass">("WPA");
  const [wifiError, setWifiError] = useState<string | null>(null);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Generate QR Code
  const generateQRCode = async (data: string) => {
    if (!data.trim()) {
      toast.error("Please enter some data to generate QR code");
      return;
    }

    setGenerating(true);
    try {
      const dataUrl = await QRCode.toDataURL(data, {
        width: 400,
        margin: 2,
        color: {
          dark: "#1E90FF",
          light: "#FFFFFF",
        },
        errorCorrectionLevel: "H",
      });
      
      setQrDataUrl(dataUrl);
      toast.success("QR Code generated successfully!");
    } catch (error) {
      console.error("QR generation error:", error);
      toast.error("Failed to generate QR code");
    } finally {
      setGenerating(false);
    }
  };

  // Handle URL generation
  const handleGenerateURL = async () => {
    const validation = urlSchema.safeParse(urlInput);
    
    if (!validation.success) {
      setUrlError(validation.error.errors[0].message);
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    setUrlError(null);
    await generateQRCode(urlInput);
  };

  // Handle Text generation
  const handleGenerateText = async () => {
    const validation = textSchema.safeParse(textInput);
    
    if (!validation.success) {
      setTextError(validation.error.errors[0].message);
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    setTextError(null);
    await generateQRCode(textInput);
  };

  // Handle Wi-Fi generation
  const handleGenerateWiFi = async () => {
    const validation = wifiSchema.safeParse({
      ssid: wifiSSID,
      password: wifiPassword,
      security: wifiSecurity,
    });
    
    if (!validation.success) {
      setWifiError(validation.error.errors[0].message);
      toast.error(validation.error.errors[0].message);
      return;
    }
    
    setWifiError(null);
    const wifiString = `WIFI:T:${wifiSecurity};S:${wifiSSID};P:${wifiPassword};;`;
    await generateQRCode(wifiString);
  };

  // Download QR Code
  const handleDownload = () => {
    if (!qrDataUrl) {
      toast.error("Generate a QR code first");
      return;
    }

    const link = document.createElement("a");
    link.href = qrDataUrl;
    link.download = `toolssy-qrcode-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("QR Code downloaded!");
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32 bg-gradient-hero relative overflow-hidden min-h-screen">
      {/* Animated Background Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }}></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4 animate-fade-in">
            QR Code <span className="bg-gradient-primary bg-clip-text text-transparent">Generator</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in-left" style={{ animationDelay: "0.2s" }}>
            Create custom QR codes instantly for URLs, text, or Wi-Fi credentials
          </p>
        </div>

        {/* Main Tool Interface */}
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Section */}
            <Card className="bg-gradient-card border-border shadow-premium-xl animate-scale-in overflow-hidden" style={{ animationDelay: "0.3s" }}>
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-secondary/50 p-2">
                  <TabsTrigger 
                    value="url" 
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 data-[state=active]:shadow-premium-md"
                  >
                    <LinkIcon className="w-4 h-4 mr-2" />
                    URL
                  </TabsTrigger>
                  <TabsTrigger 
                    value="text"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 data-[state=active]:shadow-premium-md"
                  >
                    <Type className="w-4 h-4 mr-2" />
                    Text
                  </TabsTrigger>
                  <TabsTrigger 
                    value="wifi"
                    className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-300 data-[state=active]:shadow-premium-md"
                  >
                    <Wifi className="w-4 h-4 mr-2" />
                    Wi-Fi
                  </TabsTrigger>
                </TabsList>

                {/* URL Tab */}
                <TabsContent value="url" className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="url-input" className="text-sm font-medium">Enter URL</Label>
                    <Input
                      id="url-input"
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com"
                      className="focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      onKeyDown={(e) => e.key === "Enter" && handleGenerateURL()}
                    />
                    {urlError && (
                      <p className="text-destructive text-sm animate-fade-in">{urlError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleGenerateURL}
                    size="lg"
                    className="w-full group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                    disabled={generating}
                  >
                    <QrCodeIcon className="w-5 h-5 mr-2" />
                    <span className="relative z-10">{generating ? "Generating..." : "Generate QR Code"}</span>
                    <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                  </Button>
                </TabsContent>

                {/* Text Tab */}
                <TabsContent value="text" className="p-6 space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="text-input" className="text-sm font-medium">Enter Text</Label>
                    <Input
                      id="text-input"
                      type="text"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      placeholder="Your text here..."
                      className="focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      onKeyDown={(e) => e.key === "Enter" && handleGenerateText()}
                    />
                    {textError && (
                      <p className="text-destructive text-sm animate-fade-in">{textError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleGenerateText}
                    size="lg"
                    className="w-full group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                    disabled={generating}
                  >
                    <QrCodeIcon className="w-5 h-5 mr-2" />
                    <span className="relative z-10">{generating ? "Generating..." : "Generate QR Code"}</span>
                    <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                  </Button>
                </TabsContent>

                {/* Wi-Fi Tab */}
                <TabsContent value="wifi" className="p-6 space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="wifi-ssid" className="text-sm font-medium">Network Name (SSID)</Label>
                      <Input
                        id="wifi-ssid"
                        type="text"
                        value={wifiSSID}
                        onChange={(e) => setWifiSSID(e.target.value)}
                        placeholder="MyWiFiNetwork"
                        className="focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wifi-password" className="text-sm font-medium">Password</Label>
                      <Input
                        id="wifi-password"
                        type="password"
                        value={wifiPassword}
                        onChange={(e) => setWifiPassword(e.target.value)}
                        placeholder="••••••••"
                        className="focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="wifi-security" className="text-sm font-medium">Security Type</Label>
                      <select
                        id="wifi-security"
                        value={wifiSecurity}
                        onChange={(e) => setWifiSecurity(e.target.value as "WPA" | "WEP" | "nopass")}
                        className="w-full px-3 py-2 border border-input rounded-md focus:ring-2 focus:ring-primary transition-all duration-300 hover:border-primary bg-background"
                      >
                        <option value="WPA">WPA/WPA2</option>
                        <option value="WEP">WEP</option>
                        <option value="nopass">No Password</option>
                      </select>
                    </div>
                    {wifiError && (
                      <p className="text-destructive text-sm animate-fade-in">{wifiError}</p>
                    )}
                  </div>
                  <Button
                    onClick={handleGenerateWiFi}
                    size="lg"
                    className="w-full group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                    disabled={generating}
                  >
                    <QrCodeIcon className="w-5 h-5 mr-2" />
                    <span className="relative z-10">{generating ? "Generating..." : "Generate QR Code"}</span>
                    <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                  </Button>
                </TabsContent>
              </Tabs>
            </Card>

            {/* Output Section */}
            <Card className="bg-gradient-card border-border shadow-premium-xl animate-scale-in overflow-hidden" style={{ animationDelay: "0.4s" }}>
              <div className="p-6 md:p-10 space-y-6">
                <h3 className="text-xl font-bold text-center text-foreground">Your QR Code</h3>
                
                {/* QR Code Display */}
                <div className="flex items-center justify-center bg-white rounded-2xl p-8 shadow-premium-lg min-h-[300px]">
                  {qrDataUrl ? (
                    <img 
                      src={qrDataUrl} 
                      alt="Generated QR Code" 
                      className="max-w-full h-auto animate-scale-in"
                    />
                  ) : (
                    <div className="text-center space-y-4">
                      <div className="w-24 h-24 mx-auto bg-primary/10 rounded-2xl flex items-center justify-center">
                        <QrCodeIcon className="w-12 h-12 text-primary" />
                      </div>
                      <p className="text-muted-foreground">Generate a QR code to see it here</p>
                    </div>
                  )}
                </div>

                {/* Download Button */}
                <Button
                  onClick={handleDownload}
                  size="lg"
                  className="w-full group relative overflow-hidden bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300"
                  disabled={!qrDataUrl}
                >
                  <Download className="w-5 h-5 mr-2" />
                  <span className="relative z-10">Download QR Code</span>
                  <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Ad Placeholder - Top */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="bg-muted/30 border-2 border-dashed border-border rounded-lg p-8 text-center">
            <p className="text-muted-foreground text-sm">Ad Placeholder</p>
          </div>
        </div>
      </div>

      <canvas ref={canvasRef} className="hidden" />
    </section>
  );
};

export default QRGeneratorInterface;
