'use client'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {

    const params = useParams()
    const id:String = params.id as String

  return (
    <>
    <h1>{id}</h1>
    </>
  )
}

export default page