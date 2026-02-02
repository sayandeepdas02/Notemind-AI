import Link from "next/link";
import { LayoutDashboard, Calendar, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen w-full">
            <div className="hidden border-r bg-muted/40 md:block w-[280px]">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-6 font-semibold">
                        Notemind
                    </div>
                    <div className="flex-1 overflow-auto py-2">
                        <nav className="grid items-start px-4 text-sm font-medium">
                            <Link
                                href="/dashboard"
                                className="flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary"
                            >
                                <LayoutDashboard className="h-4 w-4" />
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/meetings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Calendar className="h-4 w-4" />
                                My Meetings
                            </Link>
                            <Link
                                href="/dashboard/settings"
                                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                            >
                                <Settings className="h-4 w-4" />
                                Settings
                            </Link>
                        </nav>
                    </div>
                </div>
            </div>
            <div className="flex flex-col flex-1">
                <header className="flex h-14 lg:h-[60px] items-center gap-4 border-b bg-muted/40 px-6">
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                {/* Search placeholder */}
                            </div>
                        </form>
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">user@example.com</span>
                        <LogOut className="h-4 w-4 text-gray-500 cursor-pointer" />
                    </div>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}
