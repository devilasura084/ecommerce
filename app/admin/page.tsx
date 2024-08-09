import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import React from 'react'
import db from '../db/db'
import { formatCurrency, formatNumber } from '@/lib/formatters'
async function getSalesData(){
    const data=await db.order.aggregate({
        _sum:{pricePaidinRupees:true},
        _count:true
    })
    return{
        amount:(data._sum.pricePaidinRupees||0),
        numberofSale:data._count
    }
}
async function getUserData(){
    const [userCount,orderData]=await Promise.all([
        db.user.count(),
        db.order.aggregate({
            _sum:{pricePaidinRupees:true}
        })
    ])
    return {
        userCount,
        averageValuePerUser:userCount===0?0:(orderData._sum.pricePaidinRupees||0)/userCount
    }
}
async function getProductData(){
    const [activeCount,inactiveCount]=await Promise.all([
        db.product.count({where:{isAvailableForPurchase:true}}),
        db.product.count({where:    {isAvailableForPurchase:false}})
    ])
    return{
        activeCount,inactiveCount
    }
}
const AdminDashboard = async() => {
    const [salesData,userData,productData]=await Promise.all([
        await getSalesData(),
        await getUserData(),
        await getProductData()
    ])
  return (
    <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
        <DashboardCard title='Sales' subtitle={`${formatNumber(salesData.numberofSale)} Orders`} body={formatCurrency(salesData.amount)}/>
        <DashboardCard title='Customers' subtitle={`${formatNumber(userData.averageValuePerUser)} Average Value`} body={formatCurrency(userData.userCount)}/>
        <DashboardCard title='Active Products' subtitle={`${formatNumber(productData.inactiveCount)} Inactive`} body={formatNumber(productData.activeCount)}/>
        </div>
  )
}
type DashboardCardprops={
    title:string
    subtitle:string
    body:string
}
function DashboardCard({title,subtitle,body}:DashboardCardprops){
    return(
        <Card>
        <CardHeader>
            <CardTitle>
                {title}
            </CardTitle>
            <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent><p>{body}</p></CardContent>
        </Card>
    )
    
}
export default AdminDashboard