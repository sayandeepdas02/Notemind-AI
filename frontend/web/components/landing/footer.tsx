import Link from 'next/link';
import { Sparkles, Twitter, Github, Linkedin } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
                <div className="xl:grid xl:grid-cols-3 xl:gap-8">
                    <div className="space-y-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" />
                            <span className="font-serif text-xl font-bold text-gray-900 tracking-tight">Notemind</span>
                        </Link>
                        <p className="text-sm leading-6 text-gray-600 max-w-sm">
                            Automate your meeting notes and summaries with AI. Focus on the conversation, not the typing.
                        </p>
                        <div className="flex space-x-6">
                            <Link href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">Twitter</span>
                                <Twitter className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">GitHub</span>
                                <Github className="h-5 w-5" />
                            </Link>
                            <Link href="#" className="text-gray-400 hover:text-gray-500">
                                <span className="sr-only">LinkedIn</span>
                                <Linkedin className="h-5 w-5" />
                            </Link>
                        </div>
                    </div>
                    <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Product</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="#features" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Features</Link></li>
                                    <li><Link href="#pricing" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Pricing</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Integrations</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">FAQ</Link></li>
                                </ul>
                            </div>
                            <div className="mt-10 md:mt-0">
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Company</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">About</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Blog</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Careers</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Contact</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-8">
                            <div>
                                <h3 className="text-sm font-semibold leading-6 text-gray-900">Legal</h3>
                                <ul role="list" className="mt-6 space-y-4">
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Privacy</Link></li>
                                    <li><Link href="#" className="text-sm leading-6 text-gray-600 hover:text-gray-900">Terms</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-16 border-t border-gray-900/10 pt-8 sm:mt-20 lg:mt-24">
                    <p className="text-xs leading-5 text-gray-500">&copy; {new Date().getFullYear()} Notemind AI Inc. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
