"use client";
import ReactMarkdown from "react-markdown";

interface ReadmeProps {
    content: string;
}

export function Readme({ content }: ReadmeProps) {
    return (
        <div
            className="prose prose-invert max-w-none 
            prose-headings:text-white prose-headings:font-bold prose-headings:mb-3 prose-headings:mt-6
            prose-h1:text-3xl prose-h1:border-b prose-h1:border-[#30363d] prose-h1:pb-2 prose-h1:mt-0
            prose-h2:text-2xl prose-h2:border-b prose-h2:border-[#30363d] prose-h2:pb-2
            prose-h3:text-xl
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:my-3
            prose-a:text-orange-500 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white prose-strong:font-semibold
            prose-code:text-orange-400 prose-code:bg-[#161b22] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
            prose-pre:bg-[#161b22] prose-pre:border prose-pre:border-[#30363d] prose-pre:rounded-lg
            prose-blockquote:border-l-4 prose-blockquote:border-orange-500 prose-blockquote:bg-[#161b22] prose-blockquote:pl-4 prose-blockquote:py-0 prose-blockquote:my-1 prose-blockquote:not-italic prose-blockquote:text-gray-400
            prose-ul:my-3 prose-ul:text-gray-300
            prose-ol:my-3 prose-ol:text-gray-300
            prose-li:my-1
            prose-img:rounded-lg prose-img:border prose-img:border-[#30363d]
            prose-hr:border-[#30363d] prose-hr:my-6
            prose-table:border prose-table:border-[#30363d]
            prose-th:bg-[#161b22] prose-th:text-white prose-th:font-semibold prose-th:border prose-th:border-[#30363d] prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-[#30363d] prose-td:px-4 prose-td:py-2"
        >
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
