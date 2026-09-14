'use client'

import useAuth from '@/hooks/useAuth'
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

  if (loading || !user) {
    return null
  }

  return children
}

export default AuthGuard