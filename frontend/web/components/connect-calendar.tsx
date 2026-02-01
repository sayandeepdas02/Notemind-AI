"use client";

import { Button } from "@notemind/ui";
import { Calendar, RefreshCw } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function ConnectCalendar({ isConnected }: { isConnected: boolean }) {
    const router = useRouter();
    const [isSyncing, setIsSyncing] = useState(false);

    const handleConnect = () => {
        // Redirect to backend auth
        window.location.href = "http://localhost:5001/auth/google";
    };

    const handleSync = async () => {
        setIsSyncing(true);
        try {
            // In a real app, userId should come from context/session
            // For MVP, we might parse it from URL or hardcode if we redirected with it
            const urlParams = new URLSearchParams(window.location.search);
            const userId = urlParams.get("userId");

            if (!userId) {
                alert("User ID missing from URL. Please re-login.");
                return;
            }

            await fetch("http://localhost:5001/calendar/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId }),
            });

            router.refresh();
            alert("Calendar Synced!");
        } catch (err) {
            console.error(err);
            alert("Sync failed");
        } finally {
            setIsSyncing(false);
        }
    };

    if (isConnected) {
        return (
            <Button variant="outline" onClick={handleSync} disabled={isSyncing}>
                <RefreshCw className={`mr-2 h-4 w-4 ${isSyncing ? "animate-spin" : ""}`} />
                {isSyncing ? "Syncing..." : "Sync Calendar"}
            </Button>
        );
    }

    return (
        <Button onClick={handleConnect}>
            <Calendar className="mr-2 h-4 w-4" />
            Connect Google Calendar
        </Button>
    );
}
