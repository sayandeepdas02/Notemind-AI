import ReactMarkdown from "react-markdown";
import { cn } from "@/lib/utils";

interface SummaryViewProps {
    summary: string;
}

export function SummaryView({ summary }: SummaryViewProps) {
    if (!summary) {
        return (
            <div className="flex items-center justify-center h-full text-muted-foreground italic p-8">
                No summary available yet.
            </div>
        );
    }

    return (
        <div className="prose prose-sm md:prose-base max-w-none p-6 bg-white rounded-md border shadow-sm">
            <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
    );
}
