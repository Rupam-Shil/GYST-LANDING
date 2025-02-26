import React from 'react';
import Hero from '../feature/home/components/Hero';
import Features from '../feature/home/components/Features';
import Installation from '../feature/home/components/Installation';
import Footer from '../feature/home/components/Footer';
import ThreeBackground from '@/feature/home/components/ThreeBackground';

export default function Home() {
	return (
		<main className="min-h-screen bg-black text-white relative isolate">
			<Hero />
			<Features />
			<Installation />
			<Footer />
			<ThreeBackground />
		</main>
	);
}
