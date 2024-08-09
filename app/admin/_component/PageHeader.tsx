import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

const PageHeader = ({children,className}:{children:ReactNode,className?:string}) => {
  return (
    <h1 className={cn('text-4xl',className)}>{children}</h1>
  )
}

export default PageHeader