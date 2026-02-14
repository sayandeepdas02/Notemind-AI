"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { TranscriptView } from "./TranscriptView";
import { SummaryView } from "./SummaryView";
import { Copy, FileText, Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@notemind/ui";

interface MeetingDetailsProps {
    meeting: {
        id: string;
        title: string;
        transcript?: string;
        summary?: string;
        createdAt?: string;
    } | null;
    isOpen: boolean;
    onClose: () => void;
}

type TabType = 'transcript' | 'summary';

export function MeetingDetails({ meeting, isOpen, onClose }: MeetingDetailsProps) {
    const [activeTab, setActiveTab] = useState<TabType>('summary');

    if (!meeting) return null;

    const handleCopy = () => {
        const text = activeTab === 'transcript' ? meeting.transcript : meeting.summary;
        if (text) {
            navigator.clipboard.writeText(text);
        }
    };

    const handleDownload = () => {
        const text = activeTab === 'transcript' ? meeting.transcript : meeting.summary;
        if (!text) return;

        const blob = new Blob([text], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${meeting.title}-${activeTab}.${activeTab === 'transcript' ? 'txt' : 'md'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} className="max-w-4xl h-[85vh] flex flex-col">
            <div className="p-6 border-b flex items-center justify-between bg-white rounded-t-lg">
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">{meeting.title}</h2>
                    <p className="text-sm text-gray-500 mt-1">
                        Meeting Details
                    </p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy}>
                        <Copy className="w-4 h-4 mr-2" />
                        Copy
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownload}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                    </Button>
                </div>
            </div>

            <div className="flex border-b bg-gray-50">
                <button
                    onClick={() => setActiveTab('summary')}
                    className={cn(
                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                        activeTab === 'summary'
                            ? "border-blue-600 text-blue-600 bg-white"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Summary
                    </div>
                </button>
                <button
                    onClick={() => setActiveTab('transcript')}
                    className={cn(
                        "px-6 py-3 text-sm font-medium border-b-2 transition-colors",
                        activeTab === 'transcript'
                            ? "border-blue-600 text-blue-600 bg-white"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    )}
                >
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4" />
                        Transcript
                    </div>
                </button>
            </div>

            <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
                {activeTab === 'summary' ? (
                    <SummaryView summary={meeting.summary || ""} />
                ) : (
                    <TranscriptView transcript={meeting.transcript || ""} />
                )}
            </div>
        </Modal>
    );
}
