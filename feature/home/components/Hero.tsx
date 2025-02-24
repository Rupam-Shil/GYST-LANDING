'use client';

import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-20 text-center">
      <h1 className="text-6xl font-bold mb-6">Gyst</h1>
      <p className="text-2xl mb-8 text-gray-300">
        AI-Powered Git Commit Assistant
      </p>
      <p className="text-lg mb-12 max-w-2xl mx-auto text-gray-400">
        Simplify your git commit workflows with AI-powered commit messages.
        Maintain consistent commit history and save time while following best
        practices.
      </p>
      <div className="flex justify-center gap-4">
        <a
          href="https://github.com/created-by-varun/gyst/releases"
          className="bg-white text-black px-8 py-3 rounded-lg font-medium hover:bg-gray-200 transition-colors"
        >
          Download Now
        </a>
        <a
          href="#features"
          className="border border-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-black transition-colors"
        >
          Learn More
        </a>
      </div>
    </section>
  );
};

export default Hero;