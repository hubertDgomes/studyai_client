import Footer from '@/components/layout/Footer'
import Header from '@/components/layout/Header'
import React from 'react'

function layout({children}:LayoutProps<"/">) {
  return (
    <>
    <Header/>
    <div>{children}</div>
    <Footer/>
    </>
  )
}

export default layout