"use client";
import Container from "@/components/Container";
import { getTheAnwer } from "@/lib/api/documents";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";

interface DataType {
  question : string,
  answer : string
}

const QuestionPage = () => {
  const params = useParams();
  const id = params.id as string;
  const [question, setQuestion] = useState<string>("");
  const [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGetAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim() || loading) return;

    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getTheAnwer({ id, question });
        setData(res.newAnswer);
      } catch (err) {
        console.error(err);
        setError("We could not answer that right now. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-10 text-[#28251f] sm:px-8 sm:py-14 lg:py-20">
      <Container className="max-w-280">
        <Link href={`/documents/${id}`} className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d] transition hover:text-[#3d4938]">
          <span aria-hidden="true">&lt;-</span> Back to notes
        </Link>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-start lg:gap-16">
          <section>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#68725d]">Study companion</p>
            <h1 className="mt-4 max-w-xl font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">
              Ask your notes.
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#756f63]">
              Turn a dense document into a conversation. Ask for a definition, a connection, or a simpler explanation.
            </p>

            <div className="mt-10 flex items-center gap-3 border-t border-[#d8cfbd] pt-5 text-xs uppercase tracking-[0.16em] text-[#918879]">
              <span className="h-2 w-2 rounded-full bg-[#aeb8a4]" aria-hidden="true" />
              Notes are ready to explore
            </div>
          </section>

          <section className="rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.06)] sm:p-8">
            <form onSubmit={handleGetAnswer}>
              <label htmlFor="question" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">
                What would you like to understand?
              </label>
              <textarea
                id="question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="For example: How does this idea connect to the main argument?"
                rows={5}
                className="mt-4 w-full resize-y rounded-xl border border-[#d8cfbd] bg-[#f6f1e8] px-4 py-4 text-base leading-7 text-[#28251f] outline-none transition placeholder:text-[#a59c8c] focus:border-[#68725d] focus:ring-4 focus:ring-[#aeb8a4]/30"
              />
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-5 text-[#918879]">Answers are grounded in this document.</p>
                <button
                  type="submit"
                  disabled={loading || !question.trim()}
                  className="inline-flex items-center justify-center gap-3 rounded-full bg-[#3d4938] px-5 py-3 text-sm font-semibold text-[#fbf8f1] shadow-[0_8px_18px_rgba(61,73,56,0.16)] transition hover:bg-[#52614a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Thinking..." : "Get an answer"}
                  <span aria-hidden="true">-&gt;</span>
                </button>
              </div>
            </form>

            {error && (
              <p role="alert" className="mt-6 rounded-xl border border-[#e2c7bd] bg-[#fbefea] px-4 py-3 text-sm leading-6 text-[#9b594c]">
                {error}
              </p>
            )}
          </section>
        </div>

        {data && (
          <article className="mt-10 max-w-4xl rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] px-6 py-8 shadow-[0_12px_35px_rgba(68,57,39,0.05)] sm:px-10 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">Your question</p>
            <h2 className="mt-3 font-serif text-2xl leading-tight text-[#3d4938]">{data.question}</h2>
            <div className="mt-8 border-t border-[#d8cfbd] pt-7">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">Answer</p>
              <p className="mt-4 whitespace-pre-wrap text-base leading-8 text-[#4d493f]">{data.answer}</p>
            </div>
          </article>
        )}
      </Container>
    </main>
  );
};

export default QuestionPage;
