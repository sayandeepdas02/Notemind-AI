import { Navbar } from "../components/landing/navbar";
import { Hero } from "../components/landing/hero";
import { Features } from "../components/landing/features";
import { Stats } from "../components/landing/stats";
import { Testimonials } from "../components/landing/testimonials";
import { Pricing } from "../components/landing/pricing";
import { Footer } from "../components/landing/footer";
import { Button } from "@notemind/ui";
import Link from "next/link";
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Notemind AI — Automated Meeting Notes',
    description: 'AI Agents that automate modern workflows. Notemind handles tasks like meeting notes, summaries, and scheduling.',
}

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col bg-white font-sans antialiased text-gray-900 selection:bg-orange-100 selection:text-orange-900">
            <Navbar />
            <main className="flex-1 w-full">
                <Hero />
                <Features />
                <Stats />
                <Pricing />
                <Testimonials />

                {/* Final CTA Section */}
                <section className="bg-gray-900 py-24 sm:py-32 relative overflow-hidden">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl font-serif font-medium tracking-tight text-white sm:text-5xl mb-6">
                                Work smarter, not harder with Notemind
                            </h2>
                            <p className="text-lg text-gray-400 mb-10 max-w-xl">
                                Start automating tasks today and give your team more time to focus on what matters.
                            </p>
                            <Button size="lg" className="rounded-md px-8 h-12 bg-primary hover:bg-primary/90 text-white font-medium text-base shadow-sm" asChild>
                                <Link href="/login">Request a demo</Link>
                            </Button>
                        </div>
                    </div>
                    <div className="absolute top-0 right-0 -mr-24 -mt-24 h-[500px] w-[500px] rounded-full bg-gray-800/20 blur-3xl pointer-events-none"></div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
