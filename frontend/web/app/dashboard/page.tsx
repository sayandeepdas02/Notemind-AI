import { Button, Card, CardContent, CardHeader, CardTitle } from "@notemind/ui";
import { Plus } from "lucide-react";
import { ConnectCalendar } from "../../components/connect-calendar";

export default function DashboardPage({
    searchParams,
}: {
    searchParams: { userId?: string };
}) {
    const isConnected = !!searchParams?.userId; // Mock check for MVP
    return (
        <>
            <div className="flex items-center">
                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
                <div className="ml-auto flex gap-2">
                    <ConnectCalendar isConnected={isConnected} />
                    <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Join Meeting
                    </Button>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Meetings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">12</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Processed Hours</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">8.5</div>
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <h2 className="text-lg font-semibold mb-4">Recent Meetings</h2>
                <Card>
                    <CardContent className="p-0">
                        <div className="p-4 text-sm text-muted-foreground text-center">
                            No meetings recorded yet.
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
