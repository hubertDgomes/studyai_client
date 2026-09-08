"use client"

import Container from '@/components/Container'
import {getDocs} from '@/lib/api/documents'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface DocumentItem {
  _id: string
  title: string
  createdAt: string
}

const DocumentsPage = () => {
  const [docs, setDocs] = useState<DocumentItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await getDocs()
        setDocs(res.getDocs)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDocs()
  }, [])

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-12 text-[#28251f] sm:px-8 lg:py-20">
      <Container className="max-w-280">
        <div className="mb-12 flex flex-col justify-between gap-7 border-b border-[#d8cfbd] pb-10 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.24em] text-[#68725d]">Study library</p>
            <h1 className="font-serif text-5xl leading-[0.98] tracking-[-0.04em] text-[#28251f] sm:text-6xl">Your documents, ready when you are.</h1>
            <p className="mt-5 max-w-lg text-base leading-7 text-[#756f63]">Keep your course material close, then open a document to start studying with StudyAI.</p>
          </div>
          <Link href="/documents/upload" className="inline-flex w-fit items-center gap-3 rounded-full bg-[#3d4938] px-5 py-3 text-sm font-semibold text-[#fbf8f1] shadow-[0_8px_18px_rgba(61,73,56,0.16)] transition hover:bg-[#52614a]">
            Upload a document <span aria-hidden="true">-&gt;</span>
          </Link>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">Your collection</p>
            <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em]">All documents</h2>
          </div>
          {!loading && <p className="text-sm text-[#756f63]">{docs.length} {docs.length === 1 ? 'document' : 'documents'}</p>}
        </div>

        {loading ? (
          <div className="grid gap-4 md:grid-cols-2">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-40 animate-pulse rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1]" />
            ))}
          </div>
        ) : docs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-[#b9b09f] bg-[#fbf8f1] px-6 py-16 text-center shadow-[0_12px_35px_rgba(68,57,39,0.05)]">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[#e6eadf] text-xl text-[#3d4938]" aria-hidden="true">+</div>
            <h2 className="font-serif text-3xl">Your library is still quiet.</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756f63]">Upload your first PDF and turn it into a focused study session.</p>
            <Link href="/documents/upload" className="mt-7 inline-flex rounded-full border border-[#3d4938] px-5 py-2.5 text-sm font-semibold text-[#3d4938] transition hover:bg-[#3d4938] hover:text-[#fbf8f1]">Add your first document</Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {docs.map((doc) => (
              <Link key={doc._id} href={`/documents/${doc._id}`} className="group rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.05)] transition hover:-translate-y-1 hover:border-[#aeb8a4] hover:shadow-[0_16px_40px_rgba(68,57,39,0.1)]">
                <div className="flex items-start justify-between gap-5">
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#e6eadf] text-xs font-bold uppercase tracking-wider text-[#3d4938]">PDF</span>
                    <div className="min-w-0">
                      <h3 className="truncate font-serif text-2xl text-[#28251f] group-hover:text-[#3d4938]">{doc.title}</h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#918879]">Added {new Date(doc.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <span className="text-lg text-[#918879] transition group-hover:translate-x-1 group-hover:text-[#3d4938]" aria-hidden="true">-&gt;</span>
                </div>
                <div className="mt-7 border-t border-[#e5ddce] pt-4 text-sm font-semibold text-[#68725d]">Open document</div>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </main>
  )
}

export default DocumentsPage