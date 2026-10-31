"use client";

import Container from "@/components/Container";
import { getDocs, generateQuiz } from "@/lib/api/documents";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface DocumentItem {
  _id: string;
  title: string;
}

const QuizPage = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([]);
  const [selectedDoc, setSelectedDoc] = useState("");
  const [questionCount, setQuestionCount] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: string }>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const res = await getDocs();
        const documentList = Array.isArray(res)
          ? res
          : res?.getDocs || res?.documents || res?.data || [];
        setDocs(documentList);

        const urlParams = new URLSearchParams(window.location.search);
        const docId = urlParams.get("id");
        if (docId) {
          setSelectedDoc(docId);
        } else if (documentList.length > 0) {
          setSelectedDoc(documentList[0]._id);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchDocuments();
  }, []);

  const handleStartQuiz = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDoc) {
      setError("Please choose a document first.");
      return;
    }

    setLoading(true);
    setError("");
    setSubmitted(false);
    setSelectedAnswers({});
    try {
      const res = await generateQuiz({
        id: selectedDoc,
        questionCount: Number(questionCount) || 5,
      });
      if (res?.newQuiz?.questions) {
        setQuestions(res.newQuiz.questions);
      } else {
        setError("Could not load questions. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to create quiz. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionIndex: number, option: string) => {
    if (submitted) return;
    setSelectedAnswers({
      ...selectedAnswers,
      [questionIndex]: option,
    });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setQuestions([]);
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const score = questions.reduce((acc, q, index) => {
    return selectedAnswers[index] === q.correctAnswer ? acc + 1 : acc;
  }, 0);

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-10 text-[#28251f] sm:px-8 lg:py-16">
      <Container className="max-w-280">
        <div className="mb-8">
          <Link
            href="/documents"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d] transition hover:text-[#3d4938]"
          >
            <span aria-hidden="true">&lt;-</span> Back to library
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[#68725d]">
            Practice & Test
          </p>
          <h1 className="mt-2 font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#28251f] sm:text-6xl">
            Document Quiz
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#756f63]">
            Generate custom multiple-choice quizzes from your study material to test your knowledge.
          </p>
        </div>

        {questions.length === 0 ? (
          <section className="max-w-2xl rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.06)] sm:p-8">
            <form onSubmit={handleStartQuiz} className="space-y-6">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">
                  Select Document
                </label>
                {docs.length > 0 ? (
                  <select
                    value={selectedDoc}
                    onChange={(e) => setSelectedDoc(e.target.value)}
                    className="mt-3 w-full rounded-xl border border-[#d8cfbd] bg-[#f6f1e8] px-4 py-3 text-base text-[#28251f] outline-none transition focus:border-[#68725d]"
                  >
                    {docs.map((doc) => (
                      <option key={doc._id} value={doc._id}>
                        {doc.title}
                      </option>
                    ))}
                  </select>
                ) : (
                  <p className="mt-3 text-sm text-[#756f63]">
                    No documents found.{" "}
                    <Link href="/documents/upload" className="font-semibold text-[#3d4938] underline">
                      Upload one first
                    </Link>
                    .
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">
                  Number of Questions
                </label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                  className="mt-3 w-full rounded-xl border border-[#d8cfbd] bg-[#f6f1e8] px-4 py-3 text-base text-[#28251f] outline-none transition focus:border-[#68725d]"
                />
              </div>

              {error && (
                <div className="rounded-xl border border-[#e2c7bd] bg-[#fbefea] px-4 py-3 text-sm text-[#9b594c]">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading || docs.length === 0}
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#3d4938] px-5 py-3.5 text-sm font-semibold text-[#fbf8f1] shadow-[0_8px_18px_rgba(61,73,56,0.16)] transition hover:bg-[#52614a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Generating Quiz..." : "Generate Quiz"}
                {!loading && <span aria-hidden="true">-&gt;</span>}
              </button>
            </form>
          </section>
        ) : (
          <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">
                  Quiz in progress
                </p>
                <h2 className="mt-1 font-serif text-2xl text-[#28251f]">
                  {questions.length} Questions
                </h2>
              </div>
              {submitted ? (
                <div className="flex items-center gap-4">
                  <div className="rounded-xl bg-[#e6eadf] px-4 py-2 font-serif text-lg font-bold text-[#3d4938]">
                    Score: {score} / {questions.length}
                  </div>
                  <button
                    onClick={handleReset}
                    className="rounded-full bg-[#3d4938] px-5 py-2.5 text-sm font-semibold text-[#fbf8f1] transition hover:bg-[#52614a]"
                  >
                    Take Another Quiz
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="rounded-full bg-[#3d4938] px-6 py-2.5 text-sm font-semibold text-[#fbf8f1] transition hover:bg-[#52614a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Quiz
                </button>
              )}
            </div>

            <div className="space-y-6">
              {questions.map((q, qIndex) => {
                const userAnswer = selectedAnswers[qIndex];
                return (
                  <div
                    key={qIndex}
                    className="rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.05)] sm:p-8"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#68725d]">
                      Question {qIndex + 1}
                    </p>
                    <h3 className="mt-2 font-serif text-xl text-[#28251f]">
                      {q.question}
                    </h3>

                    <div className="mt-6 space-y-3">
                      {q.options.map((option, optIndex) => {
                        const isSelected = userAnswer === option;
                        let optionStyle =
                          "border-[#d8cfbd] bg-[#f6f1e8] text-[#28251f] hover:border-[#68725d]";

                        if (isSelected && !submitted) {
                          optionStyle = "border-[#3d4938] bg-[#e6eadf] text-[#3d4938] font-semibold";
                        }

                        if (submitted) {
                          if (option === q.correctAnswer) {
                            optionStyle = "border-green-600 bg-green-50 text-green-900 font-semibold";
                          } else if (isSelected && option !== q.correctAnswer) {
                            optionStyle = "border-red-500 bg-red-50 text-red-900";
                          } else {
                            optionStyle = "border-[#d8cfbd] bg-[#f6f1e8] text-[#756f63] opacity-60";
                          }
                        }

                        return (
                          <button
                            key={optIndex}
                            type="button"
                            disabled={submitted}
                            onClick={() => handleSelectOption(qIndex, option)}
                            className={`w-full rounded-xl border px-4 py-3.5 text-left text-sm transition ${optionStyle}`}
                          >
                            <span className="mr-3 font-semibold">
                              {String.fromCharCode(65 + optIndex)}.
                            </span>
                            {option}
                          </button>
                        );
                      })}
                    </div>

                    {submitted && (
                      <div className="mt-6 rounded-xl border border-[#d8cfbd] bg-[#f4efe4] p-4 text-sm leading-6">
                        <p className="font-semibold text-[#3d4938]">Explanation:</p>
                        <p className="mt-1 text-[#5c584e]">{q.explanation}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              {submitted ? (
                <button
                  onClick={handleReset}
                  className="rounded-full bg-[#3d4938] px-6 py-3 text-sm font-semibold text-[#fbf8f1] transition hover:bg-[#52614a]"
                >
                  Take Another Quiz
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  className="rounded-full bg-[#3d4938] px-6 py-3 text-sm font-semibold text-[#fbf8f1] transition hover:bg-[#52614a] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Submit Quiz
                </button>
              )}
            </div>
          </div>
        )}
      </Container>
    </main>
  );
};

export default QuizPage;
