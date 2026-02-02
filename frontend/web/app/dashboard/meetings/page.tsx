"use client";

import { useState, useEffect } from "react";
import { Button, Card, CardContent, CardHeader, CardTitle } from "@notemind/ui";
import { Plus, Calendar, Video, FileText, Clock, ExternalLink } from "lucide-react";

interface Meeting {
    id: string;
    title: string;
    joinUrl: string;
    startTime: string;
    status: string;
    transcript?: { id: string };
    summary?: { id: string };
}

export default function MyMeetingsPage() {
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [meetingUrl, setMeetingUrl] = useState("");
    const [meetingTitle, setMeetingTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchMeetings();
    }, []);

    const fetchMeetings = async () => {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/meetings", {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setMeetings(data.meetings || []);
            }
        } catch (err) {
            console.error("Failed to fetch meetings:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNotetaker = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            const token = localStorage.getItem("token");
            const res = await fetch("http://localhost:5001/meetings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ meetingUrl, title: meetingTitle })
            });

            const data = await res.json();
            if (!res.ok) {
                setError(data.error || "Failed to add notetaker");
                return;
            }

            setMeetings([data.meeting, ...meetings]);
            setShowAddModal(false);
            setMeetingUrl("");
            setMeetingTitle("");
        } catch (err) {
            setError("Network error. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <>
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">My Meetings</h1>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="mr-2 h-4 w-4" />
                        Connect Google Calendar
                    </Button>
                    <Button size="sm" onClick={() => setShowAddModal(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Notetaker
                    </Button>
                </div>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center h-64">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
            ) : meetings.length === 0 ? (
                <Card className="mt-6">
                    <CardContent className="flex flex-col items-center justify-center py-16">
                        <Video className="h-16 w-16 text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">No meetings yet</h3>
                        <p className="text-muted-foreground text-center max-w-md mb-6">
                            Add your first meeting by clicking "Add Notetaker" and pasting a Google Meet link.
                            The notetaker will join automatically when you admit it.
                        </p>
                        <Button onClick={() => setShowAddModal(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Add Your First Meeting
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 mt-6">
                    {meetings.map((meeting) => (
                        <Card key={meeting.id} className="hover:shadow-md transition-shadow">
                            <CardHeader className="pb-2">
                                <div className="flex items-center justify-between">
                                    <CardTitle className="text-base">{meeting.title}</CardTitle>
                                    <span className={`text-xs px-2 py-1 rounded-full ${meeting.status === "COMPLETED"
                                            ? "bg-green-100 text-green-700"
                                            : meeting.status === "RECORDING"
                                                ? "bg-red-100 text-red-700"
                                                : "bg-yellow-100 text-yellow-700"
                                        }`}>
                                        {meeting.status}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Clock className="h-4 w-4" />
                                        {formatDate(meeting.startTime)}
                                    </span>
                                    <a
                                        href={meeting.joinUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1 text-primary hover:underline"
                                    >
                                        <ExternalLink className="h-4 w-4" />
                                        Join Link
                                    </a>
                                </div>
                                <div className="flex gap-2 mt-4">
                                    {meeting.transcript && (
                                        <Button variant="outline" size="sm">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Transcript
                                        </Button>
                                    )}
                                    {meeting.summary && (
                                        <Button variant="outline" size="sm">
                                            <FileText className="mr-2 h-4 w-4" />
                                            View Summary
                                        </Button>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Add Notetaker Modal */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                    <Card className="w-full max-w-md mx-4">
                        <CardHeader>
                            <CardTitle>Add Notetaker to Meeting</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleAddNotetaker} className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Meeting Title (optional)
                                    </label>
                                    <input
                                        type="text"
                                        value={meetingTitle}
                                        onChange={(e) => setMeetingTitle(e.target.value)}
                                        placeholder="Weekly standup"
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm font-medium mb-1 block">
                                        Google Meet Link *
                                    </label>
                                    <input
                                        type="url"
                                        value={meetingUrl}
                                        onChange={(e) => setMeetingUrl(e.target.value)}
                                        placeholder="https://meet.google.com/abc-defg-hij"
                                        required
                                        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                                    />
                                </div>
                                {error && (
                                    <p className="text-sm text-red-600">{error}</p>
                                )}
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button type="submit" disabled={isSubmitting}>
                                        {isSubmitting ? "Adding..." : "Add Notetaker"}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            )}
        </>
    );
}
