export function Testimonials() {
    return (
        <section className="py-24 sm:py-32 bg-gray-50/50 border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Testimonials</span>
                    </div>
                    <h2 className="text-3xl font-serif font-medium text-gray-900 sm:text-4xl">Trusted by forward-thinking companies</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">

                    <div className="flex flex-col gap-6">
                        <div className="aspect-[4/3] w-full bg-gray-200 rounded-lg overflow-hidden relative">
                            {/* Placeholder for Image - Clean/Professional */}
                            <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                                <span className="text-gray-500 font-serif italic">Photo</span>
                            </div>
                        </div>
                        <blockquote className="text-2xl font-serif leading-relaxed text-gray-900 font-medium">
                            “The automation feels invisible yet powerful. Notemind keeps everything on track so we can focus on the bigger picture.”
                        </blockquote>
                        <div>
                            <div className="font-bold text-sm text-gray-900 uppercase tracking-wide">Trevor James</div>
                            <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Project Lead, Gloops</div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 md:mt-24">
                        <blockquote className="text-2xl font-serif leading-relaxed text-gray-900 font-medium">
                            “Notemind has completely changed the way we work. It’s like having an extra team member in every meeting.”
                        </blockquote>
                        <div className="flex items-center gap-4">
                            <div className="h-12 w-12 bg-gray-200 rounded-full" />
                            <div>
                                <div className="font-bold text-sm text-gray-900 uppercase tracking-wide">Abraham John</div>
                                <div className="text-xs text-gray-500 font-medium uppercase tracking-wider">Product Manager, FlowOps</div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
