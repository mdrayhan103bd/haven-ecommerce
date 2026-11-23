'use client';

import React, { useState, useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon, X, Check, Loader2 } from 'lucide-react';

interface ImageUploadInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  helperText?: string;
  aspectHint?: string;
  placeholder?: string;
  className?: string;
}

/**
 * Resizes an image file to a maximum dimension (default 1280px) and converts to JPEG Data URL.
 * This keeps the image size lightweight for fast loading and seamless localStorage storage.
 */
function compressImage(file: File, maxDim = 1280, quality = 0.85): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Failed to read file'));
    reader.onload = (e) => {
      const img = new Image();
      img.onerror = () => reject(new Error('Failed to parse image'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(dataUrl);
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  });
}

export default function ImageUploadInput({
  label,
  value,
  onChange,
  helperText,
  aspectHint,
  placeholder = 'https://images.unsplash.com/...',
  className = ''
}: ImageUploadInputProps) {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (file: File) => {
    if (!file || !file.type.startsWith('image/')) return;

    setLoading(true);
    try {
      const compressedDataUrl = await compressImage(file);
      onChange(compressedDataUrl);
    } catch (err) {
      console.error('Image compression failed:', err);
      // Fallback to direct FileReader
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          onChange(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    } finally {
      setLoading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  const isUploadedDataUrl = value && value.startsWith('data:image/');

  return (
    <div className={`space-y-2 font-sans ${className}`}>
      {/* Header with Label and Mode Switcher */}
      <div className="flex items-center justify-between">
        {label && (
          <label className="block text-xs font-bold text-gray-800">
            {label}
            {aspectHint && <span className="font-normal text-gray-400 ml-1.5">({aspectHint})</span>}
          </label>
        )}
        <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-[11px] font-semibold">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              tab === 'upload' ? 'bg-white text-black shadow-xs font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            <Upload className="w-3 h-3" /> Upload File
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`px-2.5 py-1 rounded-md transition-all flex items-center gap-1 ${
              tab === 'url' ? 'bg-white text-black shadow-xs font-bold' : 'text-gray-500 hover:text-black'
            }`}
          >
            <LinkIcon className="w-3 h-3" /> Web Link
          </button>
        </div>
      </div>

      {/* Main Upload Box / URL Input */}
      {tab === 'upload' ? (
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                handleFileChange(e.target.files[0]);
              }
            }}
          />

          <div
            onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
            onDragLeave={() => setDragActive(false)}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group ${
              dragActive 
                ? 'border-black bg-gray-50' 
                : 'border-gray-200 hover:border-black/50 hover:bg-gray-50/50 bg-white'
            }`}
          >
            {loading ? (
              <div className="py-4 flex flex-col items-center gap-2 text-xs font-semibold text-gray-500">
                <Loader2 className="w-6 h-6 animate-spin text-black" />
                <span>Processing & optimizing image...</span>
              </div>
            ) : value ? (
              <div className="w-full flex items-center justify-between gap-3 text-left">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-200 bg-gray-50 shrink-0 relative group-hover:scale-105 transition-transform">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-gray-900 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{isUploadedDataUrl ? 'Uploaded from device' : 'Active Image'}</span>
                    </div>
                    <p className="text-[11px] text-gray-400 truncate max-w-xs mt-0.5">
                      Click to choose another photo or drop a file here
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-lg hover:bg-blue-100">
                    Change
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onChange('');
                    }}
                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-3 flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mb-2 group-hover:bg-black group-hover:text-white transition-colors">
                  <Upload className="w-4 h-4" />
                </div>
                <div className="text-xs font-bold text-gray-900">
                  Click to upload from device <span className="font-normal text-gray-500">or drag & drop</span>
                </div>
                <p className="text-[11px] text-gray-400 mt-0.5">
                  PNG, JPG, WEBP up to 10MB (automatically optimized)
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full border border-gray-200 rounded-xl pl-3 pr-8 py-2.5 text-xs outline-none focus:border-black font-mono"
              />
              {value && (
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
          {value && (
            <div className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl border border-gray-100">
              <img src={value} alt="Preview" className="w-8 h-8 rounded-lg object-cover border border-gray-200" />
              <span className="text-[11px] text-gray-500 font-mono truncate flex-1">{value}</span>
            </div>
          )}
        </div>
      )}

      {helperText && <p className="text-[11px] text-gray-400">{helperText}</p>}
    </div>
  );
}
