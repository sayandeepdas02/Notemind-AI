import { Button, Card, CardHeader, CardTitle, CardContent } from "@notemind/ui";
import { Check } from "lucide-react";

export function Pricing() {
    return (
        <section className="py-24 sm:py-32 bg-white border-t border-gray-100" id="pricing">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-24">
                    <div className="flex justify-center mb-4">
                        <span className="text-primary font-bold uppercase tracking-widest text-[10px]">Pricing</span>
                    </div>
                    <h2 className="text-3xl font-serif font-medium tracking-tight text-gray-900 sm:text-4xl">
                        Simple, flexible plans
                    </h2>
                    <p className="mt-4 text-gray-600 font-sans">
                        Choose the right plan for your team and scale as you grow.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-lg mx-auto md:max-w-none">

                    {/* Starter */}
                    <Card className="flex flex-col shadow-none border border-gray-200 bg-white rounded-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-serif font-medium text-gray-900">Starter</CardTitle>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-serif font-medium text-gray-900">$19</span>
                                <span className="text-sm font-medium text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 font-sans">For individuals looking to automate their daily tasks.</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pt-0">
                            <Button variant="outline" className="w-full border-gray-200 mt-4 mb-8">Get Started</Button>
                            <ul className="space-y-3 text-sm text-gray-600 flex-1">
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> 100 tasks / month</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Email automation</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Meeting summaries</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Basic support</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Pro */}
                    <Card className="flex flex-col shadow-none border-none ring-1 ring-gray-200 bg-white rounded-xl relative">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-serif font-medium text-gray-900">Pro</CardTitle>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-serif font-medium text-gray-900">$39</span>
                                <span className="text-sm font-medium text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 font-sans">For fast-moving teams ready to offload the busywork.</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pt-0">
                            <Button className="w-full bg-primary hover:bg-primary/90 text-white mt-4 mb-8">Get Started</Button>
                            <ul className="space-y-3 text-sm text-gray-600 flex-1">
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Everything in Starter</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> 1,000 tasks / month</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Priority email automation</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-primary" /> Advanced meeting summaries</li>
                            </ul>
                        </CardContent>
                    </Card>

                    {/* Enterprise */}
                    <Card className="flex flex-col shadow-none border border-gray-200 bg-white rounded-xl">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-xl font-serif font-medium text-gray-900">Enterprise</CardTitle>
                            <div className="mt-4 flex items-baseline gap-1">
                                <span className="text-4xl font-serif font-medium text-gray-900">$99</span>
                                <span className="text-sm font-medium text-gray-500">/mo</span>
                            </div>
                            <p className="text-sm text-gray-500 mt-2 font-sans">For large teams and organizations that need scale and security.</p>
                        </CardHeader>
                        <CardContent className="flex-1 flex flex-col pt-0">
                            <Button variant="outline" className="w-full border-gray-200 mt-4 mb-8">Get Started</Button>
                            <ul className="space-y-3 text-sm text-gray-600 flex-1">
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Everything in Pro</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Unlimited tasks / month</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Dedicated account manager</li>
                                <li className="flex gap-2 items-center"><div className="h-1.5 w-1.5 rounded-full bg-gray-400" /> Custom integrations</li>
                            </ul>
                        </CardContent>
                    </Card>

                </div>
            </div>
        </section>
    );
}
