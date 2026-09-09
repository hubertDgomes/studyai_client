"use client";

import Container from "@/components/Container";
import { uploadDocs } from "@/lib/api/documents";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
const fileTypes = ["PDF"];

const UploadPage = () => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (uploadedFile: File | File[]) => {
    setError("");
    setFile(Array.isArray(uploadedFile) ? uploadedFile[0] ?? null : uploadedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError("Choose a PDF before continuing.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const data = await uploadDocs(file);
      router.push(`/documents/${data.newDocs._id}`);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Upload failed. Please try again.";
      setError(message);
      console.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-12 text-[#28251f] sm:px-8 lg:py-20">
      <Container className="max-w-280">
        <div className="grid gap-12 lg:grid-cols-[0.82fr_1.18fr] lg:items-center lg:gap-20">
          <section className="max-w-xl">
            <p className="mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-[#68725d]">Grow your library</p>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] sm:text-6xl">Bring a document to life.</h1>
            <p className="mt-6 max-w-md text-base leading-7 text-[#756f63]">Upload a course PDF and StudyAI will turn it into a focused place to read, review, and learn.</p>
            <div className="mt-10 flex items-center gap-4 border-t border-[#d8cfbd] pt-5 text-sm text-[#918879]">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#e6eadf] font-serif text-lg text-[#3d4938]">1</span>
              <span>PDF files only, up to your course material.</span>
            </div>
          </section>

          <section className="rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-5 shadow-[0_18px_50px_rgba(68,57,39,0.08)] sm:p-8">
            <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#e5ddce] pb-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">New document</p>
                <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em]">Choose your PDF</h2>
              </div>
              <span className="rounded-full bg-[#e6eadf] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-[#3d4938]">PDF</span>
            </div>

            <FileUploader
              handleChange={handleChange}
              name="file"
              types={fileTypes}
              classes="!flex !min-h-64 !w-full !cursor-pointer !items-center !justify-center !rounded-xl !border-2 !border-dashed !border-[#aeb8a4] !bg-[#f1f3eb] !p-8 !text-center !text-[#3d4938] transition hover:!border-[#68725d] hover:!bg-[#e9eee3]"
            />

            <div className="mt-5 min-h-12 rounded-xl bg-[#f4efe4] px-4 py-3">
              {file ? (
                <div className="flex items-center gap-3 text-sm">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#3d4938] text-[10px] font-bold uppercase text-[#fbf8f1]">PDF</span>
                  <span className="min-w-0 truncate font-semibold text-[#28251f]">{file.name}</span>
                  <span className="ml-auto shrink-0 text-xs text-[#918879]">Ready</span>
                </div>
              ) : (
                <p className="text-center text-sm text-[#918879]">Your selected file will appear here.</p>
              )}
            </div>

            {error && <p className="mt-4 text-sm font-semibold text-[#9b5146]" role="alert">{error}</p>}

            <button
              className="mt-6 inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#3d4938] px-5 py-3.5 text-sm font-semibold text-[#fbf8f1] shadow-[0_8px_18px_rgba(61,73,56,0.16)] transition hover:bg-[#52614a] disabled:cursor-not-allowed disabled:opacity-60"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Adding to your library..." : "Add to my library"}
              {!loading && <span aria-hidden="true">-&gt;</span>}
            </button>
          </section>
        </div>
      </Container>
    </main>
  );
};

export default UploadPage;
