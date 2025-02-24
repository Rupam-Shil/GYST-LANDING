import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '@/styles/globals.scss';
import { Toaster } from 'sonner';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Gyst - AI-Powered Git Commit Assistant',
	description:
		'Simplify your git commit workflows with AI-powered commit messages. Maintain consistent commit history and save time while following best practices.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}
			>
				{children}
				<Toaster closeButton theme="dark" />
			</body>
		</html>
	);
}
