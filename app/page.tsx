import React from 'react';
import Hero from '../feature/home/components/Hero';
import Features from '../feature/home/components/Features';
import Installation from '../feature/home/components/Installation';
import Footer from '../feature/home/components/Footer';

export default function Home() {
	return (
		<main className="min-h-screen bg-black text-white">
			<Hero />
			<Features />
			<Installation />
			<Footer />
		</main>
	);
}
