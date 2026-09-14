import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import AuthGuard from '@/components/AuthGuard'
import React from 'react'

function layout({children}:LayoutProps<"/">) {
  return (
    <AuthGuard>
      <Header/>
      <div>{children}</div>
      <Footer/>
    </AuthGuard>
  )
}

export default layout