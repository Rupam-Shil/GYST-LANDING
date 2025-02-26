'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import demoContent from '../data/demo-content.json';

interface FeatureCardProps {
	id: string;
	title: string;
	description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
	id,
	title,
	description,
}) => {
	const [ref, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});
	const [isExpanded, setIsExpanded] = useState(false);
	const [displayText, setDisplayText] = useState('');

	const terminalContent = demoContent[id as keyof typeof demoContent]
		?.content || [
		'$ gyst init',
		'Initializing GYST in current directory...',
		'Creating configuration file...',
		'Setting up AI models...',
		'Done! GYST is ready to use.',
	];

	const handleOpenTerminal = () => {
		// Prevent multiple initializations
		if (isExpanded) return;

		setIsExpanded(true);

		// Clean up any existing content
		setDisplayText('');

		let isDestroyed = false;
		let currentIndex = 0;

		const appendNextLine = () => {
			if (isDestroyed || currentIndex >= terminalContent.length) {
				return;
			}

			const currentLine = terminalContent[currentIndex];
			setDisplayText((prev) =>
				currentLine ? `${prev}${currentLine}\n` : prev
			);
			currentIndex++;

			if (currentIndex < terminalContent.length) {
				setTimeout(appendNextLine, 150);
			}
		};

		// Start the animation
		appendNextLine();

		// Cleanup function to prevent memory leaks
		return () => {
			isDestroyed = true;
		};
	};
	useEffect(() => {
		console.log(displayText);
	}, [displayText]);

	return (
		<>
			<motion.div
				ref={ref}
				initial={{ opacity: 0, y: 20 }}
				animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
				transition={{ duration: 0.6 }}
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
					className="text-gray-400 pl-6 border-l border-gray-800 mb-4"
					initial={{ opacity: 0, x: -20 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5, delay: 0.4 }}
				>
					{description}
				</motion.p>
				<motion.button
					onClick={handleOpenTerminal}
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full px-4 py-2 bg-black/50 border border-emerald-500/30 rounded font-mono text-emerald-400 hover:bg-emerald-500/10 hover:border-emerald-500 transition-all flex items-center gap-2"
				>
					<span className="text-emerald-500">$</span> ./open-terminal
				</motion.button>
			</motion.div>

			<AnimatePresence>
				{isExpanded && (
					<motion.div
						initial={{ opacity: 0, scale: 0.8 }}
						animate={{ opacity: 1, scale: 1 }}
						exit={{ opacity: 0, scale: 0.8 }}
						transition={{ duration: 0.3 }}
						className="fixed inset-0 flex items-center justify-center z-50 p-8"
						onClick={() => {
							setIsExpanded(false);
							setDisplayText('');
						}}
					>
						<motion.div
							className="w-[80vw] h-[80vh] bg-black/95 backdrop-blur-md rounded-lg border border-emerald-500/30 shadow-lg shadow-emerald-500/20 overflow-hidden"
							onClick={(e) => e.stopPropagation()}
						>
							<div className="p-4 border-b border-emerald-500/30 flex justify-between items-center">
								<div className="flex items-center gap-2">
									<div
										className="w-3 h-3 rounded-full bg-red-500 cursor-pointer"
										onClick={() => {
											setIsExpanded(false);
											setDisplayText('');
										}}
									></div>
									<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
									<div className="w-3 h-3 rounded-full bg-green-500"></div>
								</div>
								<span className="text-emerald-500 text-sm">
									{title} - Terminal
								</span>
							</div>
							<div className="p-6 h-[calc(80vh-4rem)] overflow-auto font-mono">
								<pre className="text-emerald-400 whitespace-pre-line">
									{displayText}
								</pre>
								<div className="flex items-center text-emerald-500 animate-pulse">
									<span className="mr-2">$</span>
									<div className="w-2 h-5 bg-emerald-500"></div>
								</div>
							</div>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default FeatureCard;
