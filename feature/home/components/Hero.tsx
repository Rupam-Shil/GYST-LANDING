'use client';

import React from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
	return (
		<section className="relative isolate  w-full overflow-hidden">
			<div className="container mx-auto px-4 py-20 text-center relative">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="text-6xl font-bold mb-6 relative z-10"
				>
					Gyst
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.2 }}
					className="text-2xl mb-8 text-gray-300 relative z-10"
				>
					AI-Powered Git Commit Assistant
				</motion.p>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.4 }}
					className="text-lg mb-12 max-w-2xl mx-auto text-gray-400 relative z-10"
				>
					Simplify your git commit workflows with AI-powered commit messages.
					Maintain consistent commit history and save time while following best
					practices.
				</motion.p>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					className="flex justify-center gap-4 relative z-10"
				>
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
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
