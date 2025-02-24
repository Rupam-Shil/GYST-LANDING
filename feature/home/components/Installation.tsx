'use client';

import React from 'react';
import { toast } from 'sonner';

const Installation: React.FC = () => {
	const installCommand =
		'curl -fsSL https://raw.githubusercontent.com/created-by-varun/gyst/master/install.sh | bash';

	const handleCopy = () => {
		navigator.clipboard.writeText(installCommand);
		toast.success('Copied to clipboard');
	};

	return (
		<section className="container mx-auto px-4 py-20">
			<h2 className="text-4xl font-bold text-center mb-16">
				Quick Installation
			</h2>
			<div className="max-w-2xl mx-auto p-6 bg-gray-900 rounded-lg">
				<p className="font-mono mb-4 text-gray-400">For macOS:</p>
				<div className="bg-black p-4 rounded-lg flex justify-between items-center">
					<code className="font-mono text-sm">{installCommand}</code>
					<button
						className="text-sm text-gray-400 hover:text-white"
						onClick={handleCopy}
					>
						Copy
					</button>
				</div>
			</div>
		</section>
	);
};

export default Installation;
