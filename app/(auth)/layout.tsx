import { ReactNode } from "react"


const layout = ({children} : LayoutProps<"/">) => {
  return (
    <div>{children}</div>
  )
}

export default layout