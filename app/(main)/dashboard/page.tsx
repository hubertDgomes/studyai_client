'use client'
import Container from '@/components/Container'
import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import React from 'react'

const DashboardPage = () => {
  const { user, loading } = useAuth()
  const userName = user?.name?.trim() || 'student'

  return (
    <main className="min-h-[calc(100vh-73px)] bg-[#f4efe4] px-5 py-10 text-[#28251f] sm:px-8 lg:py-16">
      <Container className="max-w-280">
        <section className="overflow-hidden rounded-3xl bg-[#3d4938] px-6 py-10 text-[#fbf8f1] shadow-[0_18px_45px_rgba(61,73,56,0.16)] sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#cbd7c2]">Your study space</p>
          <h1 className="mt-5 max-w-3xl font-serif text-5xl leading-[0.95] tracking-[-0.04em] sm:text-7xl">
            {loading ? 'Welcome back' : `Welcome back, ${userName}`}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-[#dbe4d5]">
            Keep your material close, ask better questions, and make your next study session count.
          </p>
        </section>

        <section className="mt-12">
          <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#d8cfbd] pb-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#68725d]">Start here</p>
              <h2 className="mt-2 font-serif text-3xl tracking-[-0.02em]">What would you like to do?</h2>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/documents" className="group rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.05)] transition hover:-translate-y-1 hover:border-[#aeb8a4] hover:shadow-[0_16px_40px_rgba(68,57,39,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d]">01</span>
              <h3 className="mt-10 font-serif text-3xl group-hover:text-[#3d4938]">Open documents</h3>
              <p className="mt-3 text-sm leading-6 text-[#756f63]">Review your uploaded study material.</p>
              <span className="mt-8 block text-sm font-semibold text-[#3d4938]">View library -&gt;</span>
            </Link>

            <Link href="/documents/upload" className="group rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.05)] transition hover:-translate-y-1 hover:border-[#aeb8a4] hover:shadow-[0_16px_40px_rgba(68,57,39,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d]">02</span>
              <h3 className="mt-10 font-serif text-3xl group-hover:text-[#3d4938]">Add material</h3>
              <p className="mt-3 text-sm leading-6 text-[#756f63]">Upload a PDF to begin a new session.</p>
              <span className="mt-8 block text-sm font-semibold text-[#3d4938]">Upload a file -&gt;</span>
            </Link>

            <Link href="/quiz" className="group rounded-2xl border border-[#ddd4c3] bg-[#fbf8f1] p-6 shadow-[0_12px_35px_rgba(68,57,39,0.05)] transition hover:-translate-y-1 hover:border-[#aeb8a4] hover:shadow-[0_16px_40px_rgba(68,57,39,0.1)]">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-[#68725d]">03</span>
              <h3 className="mt-10 font-serif text-3xl group-hover:text-[#3d4938]">Take a quiz</h3>
              <p className="mt-3 text-sm leading-6 text-[#756f63]">Test your knowledge when quizzes are ready.</p>
              <span className="mt-8 block text-sm font-semibold text-[#3d4938]">Coming soon -&gt;</span>
            </Link>
          </div>
        </section>
      </Container>
    </main>
  )
}

export default DashboardPage
