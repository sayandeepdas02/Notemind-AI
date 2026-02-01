import { Card, CardContent } from "@notemind/ui";
import { Zap, Link as LinkIcon, Clock, BarChart } from "lucide-react";

export function Features() {
    return (
        <section className="py-24 sm:py-32 bg-white border-t border-gray-100" id="features">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-24">
                    <div className="flex justify-center mb-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Benefits</span>
                    </div>
                    <h2 className="text-4xl font-serif font-medium tracking-tight text-gray-900 sm:text-5xl">
                        Smarter meetings, zero friction
                    </h2>
                    <p className="mt-6 text-lg text-gray-600 font-sans">
                        From recording to insights, everything works seamlessly in the background.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
                    {/* Feature 1 */}
                    <div className="flex flex-col p-8 bg-white border border-gray-100 rounded-none hover:shadow-sm transition-shadow">
                        <div className="mb-6 h-10 w-10 flex items-center justify-center rounded bg-primary text-white">
                            <Zap className="h-5 w-5" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-gray-900 mb-3">Autonomous Execution</h3>
                        <p className="text-gray-600 font-sans leading-relaxed text-base">
                            Notemind joins meetings and captures notes automatically — no manual input required.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex flex-col p-8 bg-white border border-gray-100 rounded-none hover:shadow-sm transition-shadow">
                        <div className="mb-6 h-10 w-10 flex items-center justify-center rounded bg-primary text-white">
                            <LinkIcon className="h-5 w-5" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-gray-900 mb-3">Seamless Integration</h3>
                        <p className="text-gray-600 font-sans leading-relaxed text-base">
                            Works effortlessly with Google Meet and Google Calendar.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex flex-col p-8 bg-white border border-gray-100 rounded-none hover:shadow-sm transition-shadow">
                        <div className="mb-6 h-10 w-10 flex items-center justify-center rounded bg-primary text-white">
                            <Clock className="h-5 w-5" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-gray-900 mb-3">Real-Time Insights</h3>
                        <p className="text-gray-600 font-sans leading-relaxed text-base">
                            Summaries and transcripts are generated minutes after each meeting.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="flex flex-col p-8 bg-white border border-gray-100 rounded-none hover:shadow-sm transition-shadow">
                        <div className="mb-6 h-10 w-10 flex items-center justify-center rounded bg-primary text-white">
                            <BarChart className="h-5 w-5" />
                        </div>
                        <h3 className="text-2xl font-serif font-medium text-gray-900 mb-3">Scalable Performance</h3>
                        <p className="text-gray-600 font-sans leading-relaxed text-base">
                            Built for individuals, teams, and growing organizations.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
