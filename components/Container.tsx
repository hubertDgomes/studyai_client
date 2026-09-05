import React, { ReactElement, ReactNode } from 'react'

interface ContainerType {
    className? : string,
    children : ReactNode
}

const Container = ({className , children}:ContainerType) => {
  return (
    <div className={`max-w-[1320px] w-full mx-auto ${className}`}>{children}</div>
  )
}

export default Container