import { useState, useRef } from "react";
import { FiUploadCloud, FiTrash2, FiLoader } from "react-icons/fi";
import { uploadImageToCloudinary } from "../../services/cloudinaryService";

export default function ImageUpload({ 
  value, 
  onChange, 
  folder = "general", 
  maxSizeMB = 5 
}) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);

  const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const validateFile = (file) => {
    if (!file) return false;
    
    // Check file type
    if (!allowedTypes.includes(file.type)) {
      setError("Supported file types are JPG, JPEG, PNG, and WebP only.");
      return false;
    }

    // Check size
    if (file.size > maxSizeBytes) {
      setError(`File is too large. Maximum size allowed is ${maxSizeMB}MB.`);
      return false;
    }

    setError("");
    return true;
  };

  const handleFileUpload = async (file) => {
    setLoading(true);
    setError("");
    try {
      const result = await uploadImageToCloudinary(file, folder);
      if (onChange) {
        onChange({
          url: result.secure_url,
          publicId: result.public_id
        });
      }
    } catch (err) {
      console.error(err);
      setError(err.message || "Upload failed. Please check your network or credentials config.");
    } finally {
      setLoading(false);
    }
  };

  // Drag handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        handleFileUpload(file);
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        handleFileUpload(file);
      }
    }
  };

  const triggerFileSelect = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (onChange) {
      onChange(null);
    }
    setError("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // 1. Loading state view
  if (loading) {
    return (
      <div className="w-full min-h-[140px] border-2 border-dashed border-gold/40 bg-[#FDFBF7] rounded-2xl flex flex-col items-center justify-center p-6 text-center select-none space-y-3">
        <FiLoader className="animate-spin text-gold w-6 h-6 shrink-0" />
        <span className="text-xs font-bold text-charcoal/70 uppercase tracking-wider">Uploading asset to Media Library...</span>
      </div>
    );
  }

  // 2. Active image preview view
  if (value) {
    return (
      <div className="w-full relative border border-[#E5E3DC] bg-white rounded-2xl p-4 flex items-center justify-between gap-4 select-none">
        <div className="flex items-center gap-4">
          <div className="w-16 h-20 rounded bg-[#F5F4F0] border border-[#E5E3DC]/60 overflow-hidden flex items-center justify-center shadow-sm shrink-0">
            <img 
              src={value} 
              alt="Asset preview" 
              className="w-full h-full object-cover"
              onError={(e) => {
                // If preview fails to load
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="text-left">
            <span className="block text-xs font-bold text-charcoal truncate max-w-[150px] sm:max-w-xs">
              File uploaded successfully
            </span>
            <span className="block text-[9px] uppercase font-bold text-green-600 tracking-wider mt-0.5">
              Secure Cloud Link Ready
            </span>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRemove}
          className="p-3 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 rounded-xl transition-colors cursor-pointer"
          title="Remove Image"
        >
          <FiTrash2 size={16} />
        </button>
      </div>
    );
  }

  // 3. Standard drag-drop upload zone
  return (
    <div className="space-y-3 text-left">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileSelect}
        className={`w-full min-h-[140px] border-2 border-dashed rounded-2xl p-6 text-center transition-all select-none cursor-pointer flex flex-col items-center justify-center space-y-2.5 ${
          dragging 
            ? "border-gold bg-[#FAF5ED] text-gold" 
            : "border-[#E5E3DC] hover:border-gold bg-[#FBFBF9]/35 text-charcoal/40"
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileSelect}
          accept="image/jpeg, image/jpg, image/png, image/webp"
          className="hidden"
        />
        <FiUploadCloud size={24} className={dragging ? "text-gold" : "text-charcoal/40"} />
        <div>
          <span className="block text-[11px] font-bold text-charcoal/70">
            {dragging ? "Drop your file here" : "Drag and drop or click to upload image"}
          </span>
          <span className="block text-[9px] text-charcoal/40 mt-1">
            Supported formats: JPG, JPEG, PNG, WebP (Max size {maxSizeMB}MB)
          </span>
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-[10px] text-red-600 font-sans leading-relaxed">
          {error}
        </div>
      )}
    </div>
  );
}
