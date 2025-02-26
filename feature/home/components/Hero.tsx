'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
	const [hoverProgress, setHoverProgress] = useState(0);
	const [displayedText, setDisplayedText] = useState('');
	const fullText = 'Git Your Shit Together';
	useEffect(() => {
		if (hoverProgress === 1) {
			let index = 0;
			const timer = setInterval(() => {
				if (index <= fullText.length) {
					setDisplayedText(fullText.slice(0, index));
					index++;
				} else {
					clearInterval(timer);
				}
			}, 50);
			return () => clearInterval(timer);
		} else {
			setDisplayedText('');
		}
	}, [hoverProgress]);

	return (
		<section className="relative isolate w-full overflow-hidden">
			<div className="container mx-auto px-4 py-20 text-center relative">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="relative inline-block group mb-6 z-10"
					onMouseEnter={() => setHoverProgress(1)}
					onMouseLeave={() => setHoverProgress(0)}
				>
					<motion.h1
						className="text-6xl font-bold relative"
						whileHover={{ scale: 1.05 }}
						transition={{ type: 'spring', stiffness: 300 }}
					>
						<span className="group-hover:opacity-0 transition-opacity duration-300">
							Gyst
						</span>
						<span className="absolute left-1/2 top-0 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-r from-emerald-100 to-emerald-300 bg-clip-text text-transparent whitespace-nowrap transform origin-center">
							{displayedText}
						</span>
					</motion.h1>
					<motion.div
						className="absolute -inset-2 bg-emerald-500/20 rounded-lg blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
						layoutId="glow"
					/>
				</motion.div>
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
