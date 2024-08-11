
import { Navbar, NavLink } from '@/components/Navbar';
import React from 'react'
export const dynamic='force-dynamic'
const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <>
    <Navbar className='bg-rose-500'>
        <NavLink href='/'>Home</NavLink>
        <NavLink href='/products'>Products</NavLink>
        <NavLink href='/orders'>My Orders</NavLink>
    </Navbar>
    <div className="container my-6">{children}</div>
    </>
  )
}

export default layout