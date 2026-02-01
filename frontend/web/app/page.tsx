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
                <section className="relative py-24 sm:py-32 bg-orange-50/50 overflow-hidden">
                    <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.orange.100),white)] opacity-20" />
                    <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-orange-600/10 ring-1 ring-orange-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />

                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto max-w-2xl text-center">
                            <h2 className="text-3xl font-serif font-medium tracking-tight text-gray-900 sm:text-4xl">
                                Never take meeting notes again
                            </h2>
                            <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600">
                                Let Notemind handle the details — so you can focus on the conversation.
                            </p>
                            <div className="mt-10 flex items-center justify-center gap-x-6">
                                <Button size="lg" className="rounded-md px-8 h-12 bg-primary hover:bg-primary/90 text-white font-medium text-base shadow-sm" asChild>
                                    <Link href="/signup">Get Started</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
}
