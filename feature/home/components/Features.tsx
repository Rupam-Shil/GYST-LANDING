'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface FeatureCardProps {
	title: string;
	description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description }) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	return (
		<motion.div
			ref={ref}
			initial={{ opacity: 0, y: 20 }}
			animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
			transition={{ duration: 0.6 }}
			whileHover={{ scale: 1.02 }}
			className="p-6 border border-gray-800 rounded-lg bg-black/30 backdrop-blur-sm hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20 transition-all relative overflow-hidden font-mono"
		>
			<div className="absolute top-2 right-3 flex gap-2">
				<div className="w-3 h-3 rounded-full bg-red-500/50"></div>
				<div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
				<div className="w-3 h-3 rounded-full bg-green-500/50"></div>
			</div>
			<div className="mt-4">
				<motion.span
					className="text-emerald-500 inline-block"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.3 }}
				>
					$ ~
				</motion.span>
				<motion.h3
					className="text-xl font-bold mb-4 text-emerald-400 inline-block ml-2"
					initial={{ width: 0 }}
					animate={{ width: 'auto' }}
					transition={{ duration: 0.5, delay: 0.2 }}
				>
					{title}
				</motion.h3>
			</div>
			<motion.p
				className="text-gray-400 pl-6 border-l border-gray-800"
				initial={{ opacity: 0, x: -20 }}
				animate={{ opacity: 1, x: 0 }}
				transition={{ duration: 0.5, delay: 0.4 }}
			>
				{description}
			</motion.p>
		</motion.div>
	);
};

const Features: React.FC = () => {
	const features = [
		{
			title: 'AI-Powered Commit Messages',
			description:
				'Automatically generate meaningful commit messages based on your changes',
		},
		{
			title: 'Conventional Commit Format',
			description:
				'All messages follow the conventional commit format for consistency',
		},
		{
			title: 'Multiple Suggestions',
			description: 'Get multiple commit message options to choose from',
		},
		{
			title: 'Quick Mode',
			description: 'Fast commit workflow without confirmation prompts',
		},
		{
			title: 'Smart Diff Analysis',
			description: 'Analyze staged changes for better context',
		},
		{
			title: 'Command Help',
			description: 'Get AI-powered suggestions for Git commands',
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
						title={feature.title}
						description={feature.description}
					/>
				))}
			</div>
		</section>
	);
};

export default Features;
