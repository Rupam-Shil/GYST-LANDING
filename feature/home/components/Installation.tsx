'use client';

import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { motion, AnimatePresence } from 'framer-motion';

const Installation: React.FC = () => {
	const installCommand =
		'curl -fsSL https://raw.githubusercontent.com/created-by-varun/gyst/master/install.sh | bash';
	const [displayedCommand, setDisplayedCommand] = useState('');
	const [showCursor, setShowCursor] = useState(true);
	const [isCopied, setIsCopied] = useState(false);

	useEffect(() => {
		let index = 0;
		const timer = setInterval(() => {
			if (index <= installCommand.length) {
				setDisplayedCommand(installCommand.slice(0, index));
				index++;
			} else {
				clearInterval(timer);
			}
		}, 50);

		const cursorTimer = setInterval(() => {
			setShowCursor((prev) => !prev);
		}, 530);

		return () => {
			clearInterval(timer);
			clearInterval(cursorTimer);
		};
	}, []);

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		toast.success('Copied to clipboard');
		setIsCopied(true);
		setTimeout(() => setIsCopied(false), 2000);
	};

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="container mx-auto px-4 py-20"
		>
			<motion.h2
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 0.3 }}
				className="text-4xl font-bold text-center mb-16 bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent"
			>
				Quick Installation
			</motion.h2>
			<motion.div
				initial={{ scale: 0.95 }}
				animate={{ scale: 1 }}
				transition={{ delay: 0.4 }}
				className="max-w-2xl mx-auto p-6 bg-neutral-900 rounded-lg border border-gray-800 shadow-xl"
			>
				<div className="flex items-center gap-2 mb-4">
					<div className="w-3 h-3 rounded-full bg-red-500"></div>
					<div className="w-3 h-3 rounded-full bg-yellow-500"></div>
					<div className="w-3 h-3 rounded-full bg-green-500"></div>
					<p className="font-mono text-gray-400 ml-2">For macOS:</p>
				</div>
				<motion.div
					whileHover={{ scale: 1.01 }}
					className="bg-black p-4 rounded-lg flex justify-between items-center border border-gray-800 group relative overflow-hidden"
				>
					<code className="font-mono text-sm text-emerald-400">
						$ {displayedCommand}
						<span
							className={`inline-block w-2 h-5 ml-1 bg-emerald-400 ${
								showCursor ? 'opacity-100' : 'opacity-0'
							}`}
						></span>
					</code>
					<AnimatePresence>
						<motion.button
							whileTap={{ scale: 0.95 }}
							className={`text-sm px-3 py-1 rounded transition-all ${
								isCopied
									? 'bg-emerald-500 text-white'
									: 'text-gray-400 hover:text-emerald-400'
							}`}
							onClick={handleCopy}
						>
							{isCopied ? 'Copied!' : 'Copy'}
						</motion.button>
					</AnimatePresence>
				</motion.div>
			</motion.div>
		</motion.section>
	);
};

export default Installation;
