'use client'

import useAuth from '@/hooks/useAuth'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { user, loading } = useAuth()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login')
    }
  }, [loading, pathname, router, user])

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4efe4] px-6 text-[#756d60]">
        <p className="text-sm">Checking your study session...</p>
      </main>
    )
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f4efe4] px-6 text-center text-[#28251f]">
        <div>
          <h1 className="font-serif text-4xl">Your session has ended.</h1>
          <p className="mt-3 text-sm text-[#756d60]">Sign in again to open your documents.</p>
          <Link href="/login" className="mt-6 inline-flex rounded-full bg-[#3d4938] px-5 py-3 text-sm font-semibold text-[#fbf8f1]">
            Sign in
          </Link>
        </div>
      </main>
    )
  }

  return children
}

export default AuthGuard