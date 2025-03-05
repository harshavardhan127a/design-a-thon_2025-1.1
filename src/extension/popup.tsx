import React, { useState, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { Upload, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import '../index.css';

interface DetectionResult {
  isDeepfake: boolean;
  confidence: number;
}

const Popup: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFile = files[0];
      setFile(selectedFile);
      setError(null);
      setResult(null);
      
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDetection = () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    // In a real implementation, we would send the file to our API
    // For the extension, we'll use the background script to simulate this
    
    // Convert file to base64 for sending via message
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64data = reader.result;
      
      // Send message to background script
      chrome.runtime.sendMessage(
        { 
          action: 'analyzeMedia',
          file: base64data,
          filename: file.name,
          type: file.type
        },
        (response) => {
          if (chrome.runtime.lastError) {
            setError('Error communicating with the extension: ' + chrome.runtime.lastError.message);
            setIsLoading(false);
            return;
          }
          
          setResult(response);
          setIsLoading(false);
        }
      );
    };
    
    reader.onerror = () => {
      setError('Error reading file');
      setIsLoading(false);
    };
  };

  const resetDetection = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="w-96 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 p-4 shadow-lg">
      <div className="flex items-center justify-center mb-4">
        <h1 className="text-xl font-bold">DeepGuard Detector</h1>
      </div>

      {!preview ? (
        <div className="space-y-4">
          <div 
            onClick={handleUploadClick}
            className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-8 text-center cursor-pointer hover:border-blue-400 dark:hover:border-blue-600"
          >
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*,video/*"
              className="hidden" 
            />
            <Upload className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-500" />
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              Click to upload an image or video
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Supported formats: JPG, PNG, MP4, WEBM
            </p>
          </div>
          
          <button
            onClick={handleUploadClick}
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
          >
            Upload Media
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-sm">
            <div className="p-2 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-sm font-medium truncate max-w-[200px]">
                {file?.name}
              </h3>
              <button
                onClick={resetDetection}
                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              >
                Change
              </button>
            </div>
            <div className="p-2 flex justify-center">
              {file?.type.includes('image') ? (
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="max-h-48 max-w-full object-contain rounded"
                />
              ) : (
                <video 
                  src={preview} 
                  controls 
                  className="max-h-48 max-w-full rounded"
                />
              )}
            </div>
          </div>

          {!result && !isLoading && (
            <button
              onClick={handleDetection}
              className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow-sm"
            >
              Detect Deepfake
            </button>
          )}

          {isLoading && (
            <div className="text-center py-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Analyzing...
              </p>
            </div>
          )}

          {error && (
            <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-3 rounded">
              <div className="flex">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                <p className="ml-2 text-sm text-red-700 dark:text-red-400">{error}</p>
              </div>
            </div>
          )}

          {result && (
            <div className={`rounded-lg shadow-md overflow-hidden ${
              result.isDeepfake 
                ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' 
                : 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
            }`}>
              <div className="p-4">
                <div className="flex items-center">
                  {result.isDeepfake ? (
                    <XCircle className="h-6 w-6 text-red-500" />
                  ) : (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  )}
                  <h3 className="ml-2 text-lg font-bold text-gray-900 dark:text-white">
                    {result.isDeepfake ? 'Deepfake Detected' : 'Authentic Media'}
                  </h3>
                </div>
                
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-gray-700 dark:text-gray-300">Confidence</span>
                    <span className="text-xs text-gray-900 dark:text-white font-medium">
                      {result.confidence.toFixed(2)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                    <div 
                      className={`h-1.5 rounded-full ${
                        result.isDeepfake ? 'bg-red-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${result.confidence}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="mt-3">
                  <button
                    onClick={resetDetection}
                    className="w-full py-1.5 px-3 border border-gray-300 dark:border-gray-600 rounded-md text-xs font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    Analyze Another File
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
      
      <div className="mt-4 pt-3 border-t border-gray-200 dark:border-gray-700 text-center">
        <a 
          href="http://localhost:5173" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
        >
          Visit DeepGuard Website
        </a>
      </div>
    </div>
  );
};

// Render the popup
const root = createRoot(document.getElementById('root')!);
root.render(<Popup />);