import React, { useCallback, useState } from 'react';
import { Upload, Camera, Image as ImageIcon } from 'lucide-react';

interface ImageUploadProps {
  onImageSelected: (base64: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelected }) => {
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file.');
      return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      onImageSelected(base64);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`
          relative border-3 border-dashed rounded-[2rem] p-6 md:p-12 text-center transition-all duration-300 cursor-pointer bg-white/50 backdrop-blur-sm
          ${isDragging 
            ? 'border-bloom-400 bg-bloom-50 scale-[1.02] shadow-xl shadow-bloom-100' 
            : 'border-gray-200 hover:border-leaf-400 hover:bg-white hover:shadow-xl hover:shadow-leaf-100'}
        `}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
        
        <div className="flex flex-col items-center space-y-6 pointer-events-none">
          <div className={`
            w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-2 transition-colors duration-300
            ${isDragging ? 'bg-bloom-100 text-bloom-600' : 'bg-leaf-50 text-leaf-600'}
          `}>
            <Camera className="w-10 h-10 md:w-12 md:h-12" />
          </div>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900">Identify Your Plant</h3>
          <p className="text-gray-500 max-w-sm mx-auto font-medium text-sm md:text-base">
            Snap a photo or upload an image to get instant care instructions and AI insights.
          </p>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4 mt-6">
            <span className="inline-flex items-center gap-2 text-sm font-bold text-leaf-700 bg-leaf-100 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <ImageIcon className="w-4 h-4" /> Upload
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-sky-700 bg-sky-100 px-4 py-2 md:px-5 md:py-2.5 rounded-full">
              <Upload className="w-4 h-4" /> Drag & Drop
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
