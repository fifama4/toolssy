import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Download, X, FileImage, FileType } from "lucide-react";
import { toast } from "sonner";
import { PDFDocument } from "pdf-lib";

type SupportedFormat = "jpg" | "png" | "pdf";

interface UploadedFile {
  file: File;
  preview: string;
  name: string;
  type: string;
}

const FileConverterInterface = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [targetFormat, setTargetFormat] = useState<SupportedFormat>("jpg");
  const [isConverting, setIsConverting] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, []);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      handleFiles(files);
    }
  }, []);

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter(file => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
      if (!validTypes.includes(file.type)) {
        toast.error(`${file.name} is not a supported format`);
        return false;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    const newFiles: UploadedFile[] = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      name: file.name,
      type: file.type
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);
    toast.success(`${validFiles.length} file(s) uploaded successfully`);
  };

  const removeFile = (index: number) => {
    setUploadedFiles(prev => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
    toast.info("File removed");
  };

  const convertImageToImage = async (file: File, format: "jpg" | "png"): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        
        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // For JPG, fill white background
        if (format === 'jpg') {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        ctx.drawImage(img, 0, 0);
        
        canvas.toBlob(
          (blob) => {
            if (blob) resolve(blob);
            else reject(new Error('Failed to create blob'));
          },
          format === 'jpg' ? 'image/jpeg' : 'image/png',
          0.95
        );
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  };

  const convertImageToPDF = async (file: File): Promise<Uint8Array> => {
    const pdfDoc = await PDFDocument.create();
    const imageBytes = await file.arrayBuffer();
    
    let image;
    if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
      image = await pdfDoc.embedJpg(imageBytes);
    } else if (file.type === 'image/png') {
      image = await pdfDoc.embedPng(imageBytes);
    } else {
      throw new Error('Unsupported image format');
    }

    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });

    return await pdfDoc.save();
  };

  const handleConvert = async () => {
    if (uploadedFiles.length === 0) {
      toast.error("Please upload files first");
      return;
    }

    setIsConverting(true);
    setProgress(0);

    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const { file, name } = uploadedFiles[i];
        setProgress(((i + 1) / uploadedFiles.length) * 100);

        let convertedBlob: Blob;
        let newFileName: string;

        // Image to Image conversion
        if ((file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && 
            (targetFormat === 'jpg' || targetFormat === 'png')) {
          convertedBlob = await convertImageToImage(file, targetFormat);
          newFileName = name.replace(/\.[^/.]+$/, `.${targetFormat}`);
        }
        // Image to PDF conversion
        else if ((file.type === 'image/jpeg' || file.type === 'image/jpg' || file.type === 'image/png') && 
                 targetFormat === 'pdf') {
          const pdfBytes = await convertImageToPDF(file);
          // Create a new ArrayBuffer to ensure compatibility
          const buffer = new ArrayBuffer(pdfBytes.length);
          const view = new Uint8Array(buffer);
          view.set(pdfBytes);
          convertedBlob = new Blob([buffer], { type: 'application/pdf' });
          newFileName = name.replace(/\.[^/.]+$/, '.pdf');
        }
        // PDF to Image (not implemented - requires server-side processing)
        else if (file.type === 'application/pdf' && (targetFormat === 'jpg' || targetFormat === 'png')) {
          toast.error("PDF to Image conversion requires server-side processing. Coming soon!");
          continue;
        }
        else {
          toast.error(`Cannot convert ${file.type} to ${targetFormat}`);
          continue;
        }

        // Download converted file
        const url = URL.createObjectURL(convertedBlob);
        const a = document.createElement('a');
        a.href = url;
        a.download = newFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        await new Promise(resolve => setTimeout(resolve, 300));
      }

      toast.success("All files converted and downloaded!");
    } catch (error) {
      console.error('Conversion error:', error);
      toast.error("Conversion failed. Please try again.");
    } finally {
      setIsConverting(false);
      setProgress(0);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-scale-in">
            File & Image <span className="bg-gradient-primary bg-clip-text text-transparent">Converter</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Convert PDF, JPG, PNG, and more instantly with our premium online tool. Fast, secure, and completely free.
          </p>
        </div>

        {/* Main Tool Interface */}
        <Card className="max-w-5xl mx-auto p-8 md:p-12 bg-gradient-card border-border shadow-premium-lg hover:shadow-premium-xl transition-all duration-500 animate-fade-in" style={{ animationDelay: '0.3s' }}>
          {/* Upload Area */}
          <div
            className={`border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 cursor-pointer hover:border-primary hover:bg-primary/5 ${
              isDragging ? 'border-primary bg-primary/10 scale-105' : 'border-border'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => document.getElementById('file-input')?.click()}
          >
            <div className="flex flex-col items-center gap-4">
              <div className="p-6 bg-primary/10 rounded-full animate-pulse">
                <Upload className="w-12 h-12 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground mb-2">
                  Drag & drop files here or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports: JPG, PNG, PDF (Max 10MB per file)
                </p>
              </div>
              <input
                id="file-input"
                type="file"
                multiple
                accept="image/jpeg,image/jpg,image/png,application/pdf"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>
          </div>

          {/* Uploaded Files Preview */}
          {uploadedFiles.length > 0 && (
            <div className="mt-8 animate-fade-in">
              <h3 className="text-lg font-semibold text-foreground mb-4">Uploaded Files ({uploadedFiles.length})</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {uploadedFiles.map((uploadedFile, index) => (
                  <Card
                    key={index}
                    className="relative group overflow-hidden hover:shadow-premium-md transition-all duration-300 hover:-translate-y-1 animate-scale-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="aspect-square bg-muted flex items-center justify-center p-4">
                      {uploadedFile.type.startsWith('image/') ? (
                        <img
                          src={uploadedFile.preview}
                          alt={uploadedFile.name}
                          className="w-full h-full object-cover rounded"
                        />
                      ) : (
                        <FileType className="w-16 h-16 text-primary" />
                      )}
                    </div>
                    <div className="p-3">
                      <p className="text-xs text-muted-foreground truncate">{uploadedFile.name}</p>
                    </div>
                    <Button
                      size="icon"
                      variant="destructive"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile(index);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Format Selection */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-3">
              <FileImage className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">Convert to:</span>
            </div>
            <Select value={targetFormat} onValueChange={(value) => setTargetFormat(value as SupportedFormat)}>
              <SelectTrigger className="w-[200px] bg-background border-border hover:border-primary transition-colors duration-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpg">JPG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Progress Bar */}
          {isConverting && (
            <div className="mt-8 animate-fade-in">
              <Progress value={progress} className="h-2" />
              <p className="text-sm text-muted-foreground text-center mt-2">
                Converting... {Math.round(progress)}%
              </p>
            </div>
          )}

          {/* Convert Button */}
          <div className="mt-8 flex justify-center">
            <Button
              size="lg"
              onClick={handleConvert}
              disabled={isConverting || uploadedFiles.length === 0}
              className="min-w-[200px] bg-primary hover:bg-primary-dark text-primary-foreground shadow-premium-md hover:shadow-premium-lg transition-all duration-300 hover:scale-105 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Download className="w-5 h-5" />
                {isConverting ? 'Converting...' : 'Convert & Download'}
              </span>
              <span className="absolute inset-0 bg-primary-light scale-0 group-hover:scale-100 transition-transform duration-500"></span>
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default FileConverterInterface;
