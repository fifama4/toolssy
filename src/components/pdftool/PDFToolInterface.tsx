import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Upload, Download, FileText, X, Loader2, Merge, Minimize2 } from "lucide-react";
import { PDFDocument } from "pdf-lib";

type ToolMode = "merge" | "compress";

interface UploadedFile {
  id: string;
  file: File;
  name: string;
  size: number;
}

const PDFToolInterface = () => {
  const [mode, setMode] = useState<ToolMode>("merge");
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFiles = Array.from(e.dataTransfer.files).filter(
      file => file.type === "application/pdf"
    );

    if (droppedFiles.length === 0) {
      toast.error("Please upload only PDF files");
      return;
    }

    const newFiles: UploadedFile[] = droppedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${droppedFiles.length} PDF file(s) uploaded`);
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const pdfFiles = Array.from(selectedFiles).filter(
      file => file.type === "application/pdf"
    );

    if (pdfFiles.length === 0) {
      toast.error("Please upload only PDF files");
      return;
    }

    const newFiles: UploadedFile[] = pdfFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      name: file.name,
      size: file.size
    }));

    setFiles(prev => [...prev, ...newFiles]);
    toast.success(`${pdfFiles.length} PDF file(s) uploaded`);
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
    toast.success("File removed");
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + " " + sizes[i];
  };

  const mergePDFs = async () => {
    if (files.length < 2) {
      toast.error("Please upload at least 2 PDF files to merge");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const fileBytes = await files[i].file.arrayBuffer();
        const pdf = await PDFDocument.load(fileBytes);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        setProgress(((i + 1) / files.length) * 100);
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([new Uint8Array(mergedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      link.click();
      URL.revokeObjectURL(url);

      toast.success("PDFs merged successfully!");
    } catch (error) {
      console.error("Merge error:", error);
      toast.error("Failed to merge PDFs. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const compressPDF = async () => {
    if (files.length === 0) {
      toast.error("Please upload a PDF file to compress");
      return;
    }

    setIsProcessing(true);
    setProgress(0);

    try {
      const file = files[0];
      const fileBytes = await file.file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(fileBytes);
      
      setProgress(50);
      
      // Save with compression
      const compressedPdfBytes = await pdfDoc.save({
        useObjectStreams: false,
        addDefaultPage: false,
      });

      const blob = new Blob([new Uint8Array(compressedPdfBytes)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `compressed-${file.name}`;
      link.click();
      URL.revokeObjectURL(url);

      setProgress(100);
      
      const reduction = ((1 - (compressedPdfBytes.length / fileBytes.byteLength)) * 100).toFixed(1);
      toast.success(`PDF compressed successfully! Reduced by ${reduction}%`);
    } catch (error) {
      console.error("Compression error:", error);
      toast.error("Failed to compress PDF. Please try again.");
    } finally {
      setIsProcessing(false);
      setProgress(0);
    }
  };

  const handleProcess = () => {
    if (mode === "merge") {
      mergePDFs();
    } else {
      compressPDF();
    }
  };

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Mode Selection */}
          <div className="flex gap-4 mb-8 justify-center animate-fade-in">
            <Button
              onClick={() => setMode("merge")}
              variant={mode === "merge" ? "default" : "outline"}
              size="lg"
              className="flex-1 max-w-xs transition-all duration-300 hover:scale-105 hover:shadow-premium-md"
            >
              <Merge className="mr-2 h-5 w-5" />
              Merge PDFs
            </Button>
            <Button
              onClick={() => setMode("compress")}
              variant={mode === "compress" ? "default" : "outline"}
              size="lg"
              className="flex-1 max-w-xs transition-all duration-300 hover:scale-105 hover:shadow-premium-md"
            >
              <Minimize2 className="mr-2 h-5 w-5" />
              Compress PDF
            </Button>
          </div>

          {/* Upload Area */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={`relative border-2 border-dashed rounded-2xl p-12 mb-8 text-center transition-all duration-300 animate-fade-in ${
              isDragging
                ? "border-primary bg-primary/5 scale-105 shadow-premium-lg"
                : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-primary/5"
            }`}
            style={{ animationDelay: '0.1s' }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 to-transparent rounded-2xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <Upload className="w-16 h-16 mx-auto mb-4 text-primary animate-pulse" />
              <h3 className="text-xl font-semibold mb-2 text-foreground">
                Drop your PDF files here
              </h3>
              <p className="text-muted-foreground mb-6">
                or click to browse your files
              </p>
              <input
                type="file"
                accept="application/pdf"
                multiple={mode === "merge"}
                onChange={handleFileSelect}
                className="hidden"
                id="pdf-upload"
              />
              <label htmlFor="pdf-upload">
                <Button
                  asChild
                  size="lg"
                  className="cursor-pointer hover:scale-105 transition-transform duration-300 shadow-premium-md hover:shadow-premium-lg"
                >
                  <span>
                    <Upload className="mr-2 h-5 w-5" />
                    Select Files
                  </span>
                </Button>
              </label>
            </div>
          </div>

          {/* Uploaded Files */}
          {files.length > 0 && (
            <div className="mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Uploaded Files ({files.length})
              </h3>
              <div className="grid gap-4">
                {files.map((file, index) => (
                  <div
                    key={file.id}
                    className="flex items-center gap-4 p-4 bg-secondary rounded-xl border border-border hover:shadow-premium-md transition-all duration-300 hover:scale-[1.02] animate-fade-in"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
                    <FileText className="w-10 h-10 text-primary flex-shrink-0" />
                    <div className="flex-grow min-w-0">
                      <p className="font-medium text-foreground truncate">{file.name}</p>
                      <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFile(file.id)}
                      className="flex-shrink-0 hover:bg-destructive/10 hover:text-destructive transition-colors duration-300"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Progress Bar */}
          {isProcessing && (
            <div className="mb-8 animate-fade-in">
              <Progress value={progress} className="h-2 mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                Processing... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button
              onClick={handleProcess}
              disabled={files.length === 0 || isProcessing}
              size="lg"
              className="min-w-[200px] hover:scale-105 transition-all duration-300 shadow-premium-md hover:shadow-premium-lg"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download className="mr-2 h-5 w-5" />
                  {mode === "merge" ? "Merge PDFs" : "Compress PDF"}
                </>
              )}
            </Button>
            {files.length > 0 && (
              <Button
                onClick={() => setFiles([])}
                variant="outline"
                size="lg"
                disabled={isProcessing}
                className="hover:scale-105 transition-all duration-300"
              >
                Clear All
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PDFToolInterface;
