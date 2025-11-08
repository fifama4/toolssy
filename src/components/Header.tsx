import { useState, useEffect } from "react";
import { Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearchResults, setShowSearchResults] = useState(false);
  const navigate = useNavigate();

  const tools = [
    { name: "Timer", path: "/timer", description: "Countdown and stopwatch" },
    { name: "Word Counter", path: "/word-counter", description: "Count words and characters" },
    { name: "QR Generator", path: "/qr-generator", description: "Create QR codes instantly" },
    { name: "PDF Tool", path: "/pdf-tool", description: "Merge and compress PDFs" },
    { name: "File Converter", path: "/file-converter", description: "Convert files and images" },
    { name: "Text Tools", path: "/text-tools", description: "Transform text easily" },
  ];

  const filteredTools = tools.filter(
    (tool) =>
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Tools", href: "/#tools" },
    { name: "About", href: "/#about" },
    { name: "Contact", href: "/#contact" },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    setShowSearchResults(value.length > 0);
  };

  const handleToolClick = (path: string) => {
    navigate(path);
    setSearchQuery("");
    setShowSearchResults(false);
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-premium-md"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl md:text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in hover:scale-105 transition-transform duration-300"
          >
            Toolssy
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link, index) => (
              link.name === "Home" ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="relative text-foreground font-medium hover:text-primary transition-colors duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  className="relative text-foreground font-medium hover:text-primary transition-colors duration-300 group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </a>
              )
            ))}
          </nav>

          {/* Search Bar */}
          <div className="hidden lg:flex relative">
            <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 shadow-premium-sm transition-all duration-300 focus-within:shadow-premium-md focus-within:scale-105">
              <Search className="w-4 h-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tools..."
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={() => searchQuery && setShowSearchResults(true)}
                className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 w-40 xl:w-60"
              />
            </div>
            {showSearchResults && filteredTools.length > 0 && (
              <Card className="absolute top-full mt-2 right-0 w-80 p-2 bg-background border-border shadow-premium-xl z-50 animate-fade-in">
                {filteredTools.map((tool) => (
                  <button
                    key={tool.path}
                    onClick={() => handleToolClick(tool.path)}
                    className="w-full text-left p-3 rounded-lg hover:bg-secondary transition-all duration-300 hover:scale-105"
                  >
                    <h4 className="font-semibold text-foreground">{tool.name}</h4>
                    <p className="text-sm text-muted-foreground">{tool.description}</p>
                  </button>
                ))}
              </Card>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:bg-secondary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6 text-primary" />
            ) : (
              <Menu className="w-6 h-6 text-primary" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden animate-fade-in-up bg-background/95 backdrop-blur-md rounded-lg shadow-premium-lg p-4 mb-4">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                link.name === "Home" ? (
                  <Link
                    key={link.name}
                    to={link.href}
                    className="text-foreground font-medium hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                ) : (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-foreground font-medium hover:text-primary transition-colors duration-300 py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                )
              ))}
            </nav>
            <div className="relative">
              <div className="flex items-center gap-2 bg-secondary rounded-full px-4 py-2 mt-4">
                <Search className="w-4 h-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search tools..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              {showSearchResults && filteredTools.length > 0 && (
                <div className="mt-2 space-y-2">
                  {filteredTools.map((tool) => (
                    <button
                      key={tool.path}
                      onClick={() => handleToolClick(tool.path)}
                      className="w-full text-left p-3 rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300"
                    >
                      <h4 className="font-semibold text-foreground">{tool.name}</h4>
                      <p className="text-sm text-muted-foreground">{tool.description}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
