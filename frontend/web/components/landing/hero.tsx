import { Button } from "@notemind/ui";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
    return (
        <section className="relative pt-32 pb-24 sm:pt-40 sm:pb-32 overflow-hidden bg-white">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
                <div className="mx-auto max-w-4xl text-center">
                    <h1 className="text-5xl font-serif font-medium tracking-tight text-gray-900 sm:text-7xl mb-8 leading-[1.1]">
                        AI agents that automate <br className="hidden sm:block" /> modern meetings
                    </h1>
                    <p className="mt-8 text-xl leading-8 text-gray-600 font-sans max-w-2xl mx-auto">
                        Notemind joins your meetings, records conversations, and delivers clear summaries and transcripts — automatically.
                    </p>
                    <div className="mt-12 flex items-center justify-center gap-x-6">
                        <Button size="lg" className="rounded-md px-8 h-12 bg-primary hover:bg-primary/90 text-white font-medium text-base shadow-sm" asChild>
                            <Link href="/signup">Get Started</Link>
                        </Button>
                        <Button size="lg" variant="outline" className="rounded-md px-8 h-12 border-gray-200 text-gray-700 font-medium text-base hover:bg-gray-50" asChild>
                            <Link href="/demo">Request a demo</Link>
                        </Button>
                    </div>
                </div>

                {/* Dashboard Preview Image Placeholder - Matching Aurius Style */}
                <div className="mt-20 flow-root sm:mt-24">
                    <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                        {/* Replace with actual image later */}
                        <div className="aspect-[16/9] w-full rounded-md bg-gray-50 object-cover shadow-2xl ring-1 ring-gray-900/10 flex items-center justify-center border border-gray-100">
                            <span className="text-gray-400 font-serif italic text-lg">Dashboard preview</span>
                        </div>
                    </div>
                </div>

                <div className="mt-24 text-center">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-8">Trusted by forward-thinking teams worldwide</p>
                    {/* Add logos here later - keeping placeholders as requested "Logos only" */}
                    <div className="grid grid-cols-2 gap-8 md:grid-cols-5 opacity-40 grayscale">
                        <div className="col-span-1 flex justify-center"><span className="font-bold text-gray-600">ACME</span></div>
                        <div className="col-span-1 flex justify-center"><span className="font-bold text-gray-600 font-serif">GlobalBank</span></div>
                        <div className="col-span-1 flex justify-center"><span className="font-bold text-gray-600">Sisyphus</span></div>
                        <div className="col-span-1 flex justify-center"><span className="font-bold text-gray-600">Quotient</span></div>
                        <div className="col-span-1 flex justify-center"><span className="font-bold text-gray-600">Hourglass</span></div>
                    </div>
                </div>

            </div>
        </section>
    );
}
