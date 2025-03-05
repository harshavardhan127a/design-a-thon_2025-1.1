import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import axios from 'axios';

// This would be replaced with your actual API endpoint
const API_ENDPOINT = 'https://api.example.com/deepfake-detection';

interface DetectionResult {
  isDeepfake: boolean;
  confidence: number;
  areas?: { x: number; y: number; width: number; height: number }[];
}

const DetectionPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DetectionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setError(null);
      setResult(null);
      
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'video/*': ['.mp4', '.webm', '.mov']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB max
  });

  const handleDetection = async () => {
    if (!file) {
      setError('Please upload a file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // In a real implementation, this would call your backend API
      // For demo purposes, we'll simulate a response after a delay
      
      // Simulated API call
      // const response = await axios.post(API_ENDPOINT, formData);
      // const data = response.data;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Simulate a response
      const simulatedResponse = {
        isDeepfake: Math.random() > 0.5, // Random result for demo
        confidence: Math.random() * 100,
        areas: file.type.includes('image') ? [
          { x: 100, y: 100, width: 50, height: 50 }
        ] : undefined
      };
      
      setResult(simulatedResponse);
    } catch (err) {
      console.error('Error during detection:', err);
      setError('An error occurred during detection. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const resetDetection = () => {
    setFile(null);
    setPreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Deepfake Detection Tool
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Upload an image or video to analyze it for potential deepfake manipulation.
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {!preview ? (
            <div 
              {...getRootProps()} 
              className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors ${
                isDragActive 
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30' 
                  : 'border-gray-300 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600'
              }`}
            >
              <input {...getInputProps()} />
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
              <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">
                {isDragActive
                  ? "Drop the file here..."
                  : "Drag and drop an image or video, or click to select"}
              </p>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Supported formats: JPG, PNG, MP4, WEBM, MOV (Max 50MB)
              </p>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg overflow-hidden shadow-md">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    {file?.name}
                  </h3>
                  <button
                    onClick={resetDetection}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  >
                    Change file
                  </button>
                </div>
                <div className="p-4 flex justify-center">
                  {file?.type.includes('image') ? (
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="max-h-96 max-w-full object-contain rounded"
                    />
                  ) : (
                    <video 
                      src={preview} 
                      controls 
                      className="max-h-96 max-w-full rounded"
                    />
                  )}
                </div>
              </div>

              {!result && !isLoading && (
                <div className="flex justify-center">
                  <button
                    onClick={handleDetection}
                    className="px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-sm"
                  >
                    Analyze for Deepfakes
                  </button>
                </div>
              )}

              {isLoading && (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">
                    Analyzing your media... This may take a moment.
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded">
                  <div className="flex">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <p className="ml-3 text-red-700 dark:text-red-400">{error}</p>
                  </div>
                </div>
              )}

              {result && (
                <div className={`rounded-lg shadow-md overflow-hidden ${
                  result.isDeepfake 
                    ? 'bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800' 
                    : 'bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800'
                }`}>
                  <div className="p-6">
                    <div className="flex items-center">
                      {result.isDeepfake ? (
                        <XCircle className="h-8 w-8 text-red-500" />
                      ) : (
                        <CheckCircle className="h-8 w-8 text-green-500" />
                      )}
                      <h3 className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
                        {result.isDeepfake ? 'Deepfake Detected' : 'Authentic Media'}
                      </h3>
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between mb-2">
                        <span className="text-gray-700 dark:text-gray-300">Detection Confidence</span>
                        <span className="text-gray-900 dark:text-white font-medium">
                          {result.confidence.toFixed(2)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div 
                          className={`h-2.5 rounded-full ${
                            result.isDeepfake ? 'bg-red-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${result.confidence}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {result.isDeepfake && (
                      <div className="mt-6 text-gray-700 dark:text-gray-300">
                        <p className="font-medium">Potential manipulation detected in:</p>
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                          <li>Facial features</li>
                          <li>Unnatural movements</li>
                          <li>Inconsistent lighting</li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="mt-6">
                      <button
                        onClick={resetDetection}
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                      >
                        Analyze Another File
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;