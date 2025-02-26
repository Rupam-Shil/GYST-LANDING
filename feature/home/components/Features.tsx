'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './FeatureCard';

const Features: React.FC = () => {
	const features = [
		{
			id: 'commit',
			title: 'AI-Powered Commit Messages',
			description:
				'Automatically generate meaningful commit messages based on your changes',
		},
		{
			id: 'suggestions',
			title: 'Multiple Suggestions',
			description: 'Get multiple commit message options to choose from',
		},
		{
			id: 'help',
			title: 'Command Help',
			description: 'Get AI-powered suggestions for Git commands',
		},
		{
			id: 'health',
			title: 'Branch Health Report',
			description: 'Get health reports on your branch status',
		},
	];

	return (
		<section id="features" className="container mx-auto px-4 py-20">
			<motion.h2
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8 }}
				viewport={{ once: true }}
				className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 via-emerald-500 to-green-500 bg-clip-text text-transparent"
			>
				Features
			</motion.h2>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map((feature, index) => (
					<FeatureCard
						key={index}
						id={feature.id}
						title={feature.title}
						description={feature.description}
					/>
				))}
			</div>
		</section>
	);
};

export default Features;
