import React from 'react';
import { Shield, Github, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 shadow-inner">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <span className="ml-2 text-lg font-semibold text-gray-900 dark:text-white">DeepGuard</span>
          </div>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Github className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} DeepGuard. All rights reserved.</p>
          <p className="mt-1">Protecting digital truth in the age of synthetic media.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;