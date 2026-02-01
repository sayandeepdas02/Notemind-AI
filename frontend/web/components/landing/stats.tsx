export function Stats() {
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16">
                    <div className="flex justify-center mb-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Metrics</span>
                    </div>
                    <h2 className="text-3xl font-serif font-medium text-gray-900 sm:text-4xl">Measurable results, every time</h2>
                    <p className="mt-4 text-gray-600 font-sans">
                        Notemind isn't just another tool — it delivers speed, accuracy, and real productivity gains.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 border divide-y md:divide-y-0 md:divide-x divide-gray-100 border-gray-100 bg-white">
                    <div className="p-8 text-center md:text-left">
                        <div className="text-5xl font-serif text-gray-900 mb-2">97%</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">accuracy in AI generated summaries</div>
                    </div>
                    <div className="p-8 text-center md:text-left">
                        <div className="text-5xl font-serif text-gray-900 mb-2">200+ hours</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">saved per team each month</div>
                    </div>
                    <div className="p-8 text-center md:text-left">
                        <div className="text-5xl font-serif text-gray-900 mb-2">3x faster</div>
                        <div className="text-sm text-gray-500 uppercase tracking-wide font-medium">meeting scheduling & follow-ups</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
