import { cn } from "@/lib/utils";
import { User, Bot } from "lucide-react";

interface TranscriptViewProps {
    transcript: string;
}

interface TranscriptSegment {
    speaker: string;
    text: string;
    timestamp?: string;
}

export function TranscriptView({ transcript }: TranscriptViewProps) {
    if (!transcript) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground italic p-8">
                No transcript available yet.
            </div>
        );
    }

    const segments: TranscriptSegment[] = transcript.split('\n').map((line, index) => {
        // Simple parsing logic based on mock format "Speaker 1: Text"
        const parts = line.split(':');
        if (parts.length > 1) {
            const speaker = parts[0].trim();
            const text = parts.slice(1).join(':').trim();
            return { speaker, text };
        }
        return { speaker: "Unknown", text: line };
    }).filter(s => s.text.trim().length > 0);

    return (
        <div className="flex flex-col gap-4 p-4 h-[60vh] overflow-y-auto rounded-md border bg-slate-50/50">
            {segments.map((segment, index) => (
                <div key={index} className="flex gap-3">
                    <div className="flex-shrink-0 mt-1">
                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center",
                            segment.speaker.toLowerCase().includes("speaker 1") ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                        )}>
                            {segment.speaker.toLowerCase().includes("bot") ? <Bot size={16} /> : <User size={16} />}
                        </div>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-muted-foreground mb-1">
                            {segment.speaker}
                        </span>
                        <div className="bg-white p-3 rounded-lg shadow-sm border text-sm text-gray-800 leading-relaxed">
                            {segment.text}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
