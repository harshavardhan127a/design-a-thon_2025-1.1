import React, { useState } from 'react';
import { Info } from 'lucide-react';

interface Example {
  id: number;
  title: string;
  description: string;
  realImage: string;
  fakeImage: string;
  telltaleSign: string;
}

const examples: Example[] = [
  {
    id: 1,
    title: 'Facial Expressions',
    description: 'Deepfakes often struggle with natural facial expressions, especially around the eyes and mouth.',
    realImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    fakeImage: 'https://images.unsplash.com/photo-1646794437913-df965ae2d8a9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    telltaleSign: 'Notice the unnatural smile and eye movements in the deepfake version.'
  },
  {
    id: 2,
    title: 'Lighting and Shadows',
    description: 'Inconsistent lighting and shadows are common in deepfakes as AI struggles to maintain physical consistency.',
    realImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    fakeImage: 'https://images.unsplash.com/photo-1635378430424-a5e7f6c1a0b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    telltaleSign: 'Look at how the shadows don\'t match the lighting direction in the deepfake.'
  },
  {
    id: 3,
    title: 'Blending and Boundaries',
    description: 'Deepfakes often show artifacts at the boundaries where the fake face meets the original image.',
    realImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=776&q=80',
    fakeImage: 'https://images.unsplash.com/photo-1629747490241-624f07d70e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    telltaleSign: 'Check the hairline and edges of the face for unnatural blending or blurring.'
  },
  {
    id: 4,
    title: 'Texture and Details',
    description: 'Deepfakes may lose fine details like skin texture, pores, or hair strands that are present in real images.',
    realImage: 'https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    fakeImage: 'https://images.unsplash.com/photo-1646794438411-ab788a0ed95d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80',
    telltaleSign: 'The skin appears too smooth and lacks natural texture in the deepfake version.'
  }
];

const ExamplesPage: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<Example>(examples[0]);
  const [showReal, setShowReal] = useState(true);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Deepfake Examples
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Compare real images with deepfakes to train your eye to spot the differences.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-4">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Examples</h2>
              <div className="space-y-2">
                {examples.map((example) => (
                  <button
                    key={example.id}
                    onClick={() => setSelectedExample(example)}
                    className={`w-full text-left px-4 py-3 rounded-md transition-colors ${
                      selectedExample.id === example.id
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {example.title}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-6 shadow-md">
              <div className="flex items-start">
                <Info className="h-6 w-6 text-blue-500 mt-0.5" />
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    How to Use This Tool
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    Select an example from the list and use the toggle to switch between the real and deepfake versions. Pay attention to the telltale signs described to help you identify manipulated media in the wild.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{selectedExample.title}</h2>
                <p className="mt-2 text-gray-600 dark:text-gray-400">{selectedExample.description}</p>
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-900 dark:text-white">
                    {showReal ? 'Real Image' : 'Deepfake Image'}
                  </span>
                  <div className="relative inline-block w-12 mr-2 align-middle select-none">
                    <input
                      type="checkbox"
                      id="toggle"
                      checked={!showReal}
                      onChange={() => setShowReal(!showReal)}
                      className="sr-only"
                    />
                    <label
                      htmlFor="toggle"
                      className={`block overflow-hidden h-6 rounded-full cursor-pointer transition-colors ${
                        showReal ? 'bg-gray-300 dark:bg-gray-600' : 'bg-red-500'
                      }`}
                    >
                      <span
                        className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform ${
                          showReal ? 'translate-x-0' : 'translate-x-6'
                        }`}
                      ></span>
                    </label>
                  </div>
                </div>

                <div className="relative aspect-w-16 aspect-h-9 bg-black rounded-lg overflow-hidden">
                  <img
                    src={showReal ? selectedExample.realImage : selectedExample.fakeImage}
                    alt={showReal ? 'Real image' : 'Deepfake image'}
                    className="object-contain w-full h-full"
                  />
                </div>

                <div className="mt-6 bg-yellow-50 dark:bg-yellow-900/30 border-l-4 border-yellow-500 p-4 rounded">
                  <div className="flex">
                    <Info className="h-6 w-6 text-yellow-500" />
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Telltale Sign</h3>
                      <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-200">{selectedExample.telltaleSign}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-center">
                  <button
                    onClick={() => setShowReal(!showReal)}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    Switch to {showReal ? 'Deepfake' : 'Real'} Image
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesPage;