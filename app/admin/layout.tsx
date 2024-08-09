
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
    <Navbar>
        <NavLink href='/admin'>Dashboard</NavLink>
        <NavLink href='/admin/products'>Products</NavLink>
        <NavLink href='/admin/users'>Customers</NavLink>
        <NavLink href='/admin/orders'>Sales</NavLink>
    </Navbar>
    <div className="container my-6">{children}</div>
    </>
  )
}

export default layout