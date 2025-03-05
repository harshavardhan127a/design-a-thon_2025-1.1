import React from 'react';
import { AlertTriangle, Brain, Shield, Zap } from 'lucide-react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl">
            Understanding Deepfakes
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 dark:text-gray-400">
            Learn about deepfake technology, its implications, and how to protect yourself.
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Brain className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">What are Deepfakes?</h3>
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence. The term is a combination of "deep learning" and "fake."
                  </p>
                  <p>
                    These AI-generated videos, images, or audio recordings can make it appear that someone said or did something they never actually did, raising significant concerns about misinformation and privacy.
                  </p>
                  <p>
                    The technology behind deepfakes has evolved rapidly in recent years, making them increasingly difficult to distinguish from authentic media with the naked eye.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Zap className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">How Deepfakes are Created</h3>
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Deepfakes are created using deep learning algorithms, particularly generative adversarial networks (GANs). These systems consist of two AI algorithms working against each other:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>A <strong>generator</strong> that creates fake images</li>
                    <li>A <strong>discriminator</strong> that tries to identify if the images are real or fake</li>
                  </ul>
                  <p>
                    Through this process, the system learns to create increasingly convincing fake media. The creation process typically requires:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>Large datasets of images or videos of the target person</li>
                    <li>Significant computing power</li>
                    <li>Time for the AI to train and refine its output</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <AlertTriangle className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Risks of Deepfakes</h3>
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Deepfakes pose several significant risks to individuals and society:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>Misinformation and Fake News:</strong> Deepfakes can be used to create convincing but false videos of public figures making inflammatory statements.
                    </li>
                    <li>
                      <strong>Personal Reputation Damage:</strong> Individuals can be targeted with fake compromising videos that damage their reputation.
                    </li>
                    <li>
                      <strong>Election Interference:</strong> Fake videos of political candidates could influence election outcomes.
                    </li>
                    <li>
                      <strong>Financial Fraud:</strong> Deepfake audio has been used to impersonate executives and authorize fraudulent transfers.
                    </li>
                    <li>
                      <strong>Erosion of Trust:</strong> As deepfakes become more common, people may begin to doubt even authentic media.
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="px-6 py-8">
                <div className="flex items-center">
                  <div className="flex-shrink-0 bg-blue-500 rounded-md p-3">
                    <Shield className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="ml-4 text-xl font-medium text-gray-900 dark:text-white">Detecting Deepfakes</h3>
                </div>
                <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
                  <p>
                    Several methods can help identify deepfake media:
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      <strong>AI-Based Detection:</strong> Machine learning algorithms can be trained to identify telltale signs of manipulation.
                    </li>
                    <li>
                      <strong>Physical Inconsistencies:</strong> Look for unnatural eye movements, blinking patterns, or facial expressions.
                    </li>
                    <li>
                      <strong>Lighting and Shadows:</strong> Inconsistent lighting or shadows can indicate manipulation.
                    </li>
                    <li>
                      <strong>Audio-Visual Mismatches:</strong> Lip movements that don't match speech or unnatural voice patterns.
                    </li>
                    <li>
                      <strong>Digital Forensics:</strong> Analyzing metadata and digital artifacts that may reveal manipulation.
                    </li>
                  </ul>
                  <p className="mt-4">
                    Our detection tool uses a combination of these techniques to provide a comprehensive analysis of potentially manipulated media.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-blue-50 dark:bg-blue-900 rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Protecting Yourself from Deepfakes</h3>
            <div className="mt-4 text-gray-600 dark:text-gray-300 space-y-4">
              <p>
                While technology continues to evolve, here are some steps you can take to protect yourself:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Verify information from multiple trusted sources before believing or sharing sensational content</li>
                <li>Be skeptical of emotionally charged or surprising videos, especially if they seem out of character</li>
                <li>Check the source and context of media before sharing</li>
                <li>Use our DeepGuard detection tools to analyze suspicious media</li>
                <li>Stay informed about deepfake technology and detection methods</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;