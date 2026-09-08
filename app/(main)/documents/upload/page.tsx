'use client'

import getDocs from '@/lib/api/documents'
import React, { useEffect, useState } from 'react'

const UploadPage = () => {
  const [docs, setDocs] = useState<unknown[]>([])

  useEffect(() => {
    const fetchDocs = async () => {
      try {
        const res = await getDocs()
        setDocs(res)
      } catch (err) {
        console.error(err)
      }
    }
    fetchDocs()
  }, [])

  console.log(docs)


  return (
    <div>page</div>
  )
}

export default UploadPage