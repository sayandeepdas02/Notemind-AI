import Link from 'next/link';
import { Sparkles, Twitter, Github, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from '@notemind/ui';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100" aria-labelledby="footer-heading">
            <h2 id="footer-heading" className="sr-only">Footer</h2>
            <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">Notemind</span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-600 max-w-sm font-sans">
                            Notemind AI — AI-powered meeting notes, done right.
                        </p>
                        <div className="flex space-x-6">
                            <SocialLink href="#" icon={Twitter} label="Twitter" />
                            <SocialLink href="#" icon={Github} label="GitHub" />
                            <SocialLink href="#" icon={Linkedin} label="LinkedIn" />
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Product</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <FooterLink href="#features">Features</FooterLink>
                                    <FooterLink href="#pricing">Pricing</FooterLink>
                                    <FooterLink href="#">Integrations</FooterLink>
                                    <FooterLink href="#">Changelog</FooterLink>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Resources</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <FooterLink href="#">Documentation</FooterLink>
                                    <FooterLink href="#">API Reference</FooterLink>
                                    <FooterLink href="#">Blog</FooterLink>
                                    <FooterLink href="#">Community</FooterLink>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <FooterLink href="#">About</FooterLink>
                                    <FooterLink href="#">Careers</FooterLink>
                                    <FooterLink href="#">Legal</FooterLink>
                                    <FooterLink href="#">Contact</FooterLink>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Subscribe</h3>
                                <p className="mt-2 text-sm leading-6 text-gray-600">
                                    The latest news, articles, and resources, sent to your inbox weekly.
                                </p>
                                <div className="mt-6 flex max-w-md gap-x-4">
                                    <label htmlFor="email-address" className="sr-only">Email address</label>
                                    <input
                                        id="email-address"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        className="min-w-0 flex-auto rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm sm:leading-6"
                                        placeholder="Enter your email"
                                    />
                                    <button
                                        type="submit"
                                        className="flex-none rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
                                    >
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Notemind AI Inc. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="#" className="text-xs text-gray-500 hover:text-gray-900">Privacy Policy</Link>
                        <Link href="#" className="text-xs text-gray-500 hover:text-gray-900">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: any; label: string }) {
    return (
        <Link href={href} className="text-gray-400 hover:text-primary transition-colors duration-200">
            <span className="sr-only">{label}</span>
            <Icon className="h-5 w-5" />
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="text-sm leading-6 text-gray-600 hover:text-primary transition-colors duration-200 block">
                {children}
            </Link>
        </li>
    );
}
