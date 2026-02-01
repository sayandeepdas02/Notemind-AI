import { Button, Card, CardContent, CardHeader, CardTitle } from "@notemind/ui";
import { Mic, FileText, Sparkles, Calendar } from "lucide-react";

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col">
            <header className="px-4 lg:px-6 h-14 flex items-center border-b">
                <div className="flex items-center gap-2 font-semibold">
                    <Sparkles className="h-6 w-6 text-primary" />
                    <span className="text-xl">Notemind</span>
                </div>
                <nav className="ml-auto flex gap-4 sm:gap-6">
                    <Button variant="ghost" asChild>
                        <a href="/login">Sign In</a>
                    </Button>
                    <Button asChild>
                        <a href="/login">Get Started</a>
                    </Button>
                </nav>
            </header>
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-muted/40">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    Your AI Meeting Assistant
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    Notemind joins your Google Meets, records audio, and generates perfect summaries instantly. Never take manual notes again.
                                </p>
                            </div>
                            <div className="space-x-4">
                                <Button size="lg" className="h-12 px-8">
                                    Try for Free
                                </Button>
                                <Button size="lg" variant="outline" className="h-12 px-8">
                                    View Demo
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="w-full py-12 md:py-24 lg:py-32">
                    <div className="container px-4 md:px-6">
                        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <Calendar className="h-10 w-10 mb-2 text-primary" />
                                    <CardTitle>Auto-Join</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Connect your Google Calendar. Our bot automatically joins your scheduled meetings as a guest.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <Mic className="h-10 w-10 mb-2 text-primary" />
                                    <CardTitle>High-Fidelity Recording</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Captures crystal clear audio directly from the meeting stream for accurate transcription.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <FileText className="h-10 w-10 mb-2 text-primary" />
                                    <CardTitle>AI Summaries</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">
                                        Get concise bullet points, action items, and a full transcript delivered to your dashboard minutes after the call.
                                    </p>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                    © 2024 Notemind AI. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
