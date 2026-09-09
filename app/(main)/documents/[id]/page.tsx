"use client";
import Container from "@/components/Container";
import { getDocsById } from "@/lib/api/documents";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DOMPurify from "dompurify";

interface DocsTypes {
  summary: string;
  title: string;
  createdAt: string;
}

const DocumentPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [docs, setDocs] = useState<DocsTypes | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await getDocsById({ id });
        setDocs(res.getDocs);
      } catch (err) {
        console.error(err);
        setError("We could not open this document.");
      } finally {
        setLoading(false);
      }
    };
    fetchDocs();

  }, [id]);

  const cleanHTML = docs ? DOMPurify.sanitize(docs.summary) : "";

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-10 text-[#28251f] sm:px-8 sm:py-14 lg:py-20">
      <Container className="max-w-280">
        <Link href="/documents" className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d] transition hover:text-[#3d4938]">
          <span aria-hidden="true">&lt;-</span> Back to library
        </Link>

        {loading ? (
          <div className="mt-10 max-w-4xl animate-pulse">
            <div className="h-3 w-28 rounded bg-[#ddd4c3]" />
            <div className="mt-5 h-14 max-w-2xl rounded bg-[#ddd4c3]" />
            <div className="mt-12 h-96 rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1]" />
          </div>
        ) : error ? (
          <div className="mt-10 max-w-2xl rounded-2xl border border-[#d8cfbd] bg-[#fbf8f1] px-6 py-12 shadow-[0_12px_35px_rgba(68,57,39,0.05)]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#9b594c]">Document unavailable</p>
            <h1 className="mt-3 font-serif text-4xl tracking-[-0.03em]">Something went wrong.</h1>
            <p className="mt-3 text-sm leading-6 text-[#756f63]">{error}</p>
          </div>
        ) : docs ? (
          <>
            <header className="mt-10 max-w-4xl border-b border-[#d8cfbd] pb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#68725d]">Study notes</p>
              <h1 className="mt-4 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#28251f] sm:text-6xl">{docs.title}</h1>
              <p className="mt-5 text-xs uppercase tracking-[0.14em] text-[#918879]">
                Added {new Date(docs.createdAt).toLocaleDateString()}
              </p>
            </header>

            <article
              className="mt-8 max-w-4xl rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] px-6 py-8 shadow-[0_12px_35px_rgba(68,57,39,0.05)] sm:px-10 sm:py-12 [&_a]:font-semibold [&_a]:text-[#3d4938] [&_blockquote]:my-6 [&_blockquote]:border-l-2 [&_blockquote]:border-[#aeb8a4] [&_blockquote]:pl-5 [&_blockquote]:italic [&_code]:rounded [&_code]:bg-[#e6eadf] [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:text-sm [&_h1]:font-serif [&_h1]:text-4xl [&_h1]:leading-tight [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-3xl [&_h2]:leading-tight [&_h3]:mt-8 [&_h3]:font-serif [&_h3]:text-2xl [&_li]:my-2 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:my-5 [&_p]:leading-8 [&_strong]:font-semibold [&_strong]:text-[#3d4938] [&_ul]:my-5 [&_ul]:list-disc [&_ul]:pl-6"
              dangerouslySetInnerHTML={{ __html: cleanHTML }}
            />
          </>
        ) : null}

        <Link href={`/documents/question/${id}`} className="mt-6 inline-flex w-fit items-center gap-3 rounded-full bg-[#3d4938] px-5 py-3 text-sm font-semibold text-[#fbf8f1] shadow-[0_8px_18px_rgba(61,73,56,0.16)] transition hover:bg-[#52614a]">
           Ask Question<span aria-hidden="true">-&gt;</span>
          </Link>
      </Container>
    </main>
  );
};

export default DocumentPage;
