'use client'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { ComponentProps, ReactNode } from 'react'

export const Navbar = ({children}:{children:ReactNode}) => {
  return (
    <nav className='bg-primary text-primary-foreground flex justify-center px-4'>{children}</nav>
  )
}

export const NavLink = (props:Omit<ComponentProps<typeof Link>,"className">) => {
    const pathname=usePathname()
  return<Link {...props} className={cn('px-4 py-6 rou hover:bg-secondary hover:text-primary focus-visible:bg-secondary focus-visible:text-primary transition-all duration-175 ease-in',pathname===props.href && 'bg-background text-foreground')}/>
}