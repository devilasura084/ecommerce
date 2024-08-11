import { Product } from "@prisma/client"
import db from "../db/db"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import {ProductCard, ProductCardSkeleton} from "@/components/ProductCard"
import { Suspense } from "react"
// function wait(duration:number){
//     return new Promise(resolve=>setTimeout(resolve,duration))
// }
function getMostPopularProducts(){
    return db.product.findMany({
        where:{
            isAvailableForPurchase:true
        },
        orderBy:{
            orders:{
                _count:'desc'
                }
            },
        take:6
    },
)
}
 function getNewestProducts(){
    return db.product.findMany({
        where:{
            isAvailableForPurchase:true
        },
        orderBy:{
            createdAt:'desc'
            },
        take:6
    },
)
}
export default function Homepage(){
    return <main className="space-y-12">
        <ProductGridSection title="Most Popular" productsFetcher={getMostPopularProducts}/>
        <ProductGridSection title="Newest" productsFetcher={getNewestProducts}/>
    </main>
}

type productGridSectionprops={
    title:string
    productsFetcher:()=>Promise<Product[]>
}

function ProductGridSection({productsFetcher,title}:productGridSectionprops){
    return(
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-3xl font-bold">{title}</h2>
                <Button variant='outline' className="bg-rose-500 text-white hover:bg-rose-500/90 hover:text-white duration-300" asChild>
                    <Link href='/products' className="space-x-2">
                    <span>View All</span>
                    <ArrowRight className="size-4-"/>
                    </Link>
                </Button>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
                <Suspense fallback={<>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    </>}>
                    <ProductSuspense productsFetcher={productsFetcher}/>
                </Suspense>
            </div>
        </div>
    )
}
async function ProductSuspense({ productsFetcher}:{ productsFetcher:()=>Promise<Product[]>}){
    return (await productsFetcher()).map(product=>(
        <ProductCard key={product.id} priceInRupees={product.PriceInRupees} id={product.id} name={product.name} description={product.decription} imagePath={product.imagePath}/>
    ))
}