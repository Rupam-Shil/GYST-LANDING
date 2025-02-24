'use client';

import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => (
  <div className="p-6 border border-gray-800 rounded-lg">
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const Features: React.FC = () => {
  const features = [
    {
      title: 'AI-Powered Commit Messages',
      description: 'Automatically generate meaningful commit messages based on your changes'
    },
    {
      title: 'Conventional Commit Format',
      description: 'All messages follow the conventional commit format for consistency'
    },
    {
      title: 'Multiple Suggestions',
      description: 'Get multiple commit message options to choose from'
    },
    {
      title: 'Quick Mode',
      description: 'Fast commit workflow without confirmation prompts'
    },
    {
      title: 'Smart Diff Analysis',
      description: 'Analyze staged changes for better context'
    },
    {
      title: 'Command Help',
      description: 'Get AI-powered suggestions for Git commands'
    }
  ];

  return (
    <section id="features" className="container mx-auto px-4 py-20">
      <h2 className="text-4xl font-bold text-center mb-16">Features</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </section>
  );
};

export default Features;