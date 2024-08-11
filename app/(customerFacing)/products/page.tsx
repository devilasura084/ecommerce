import db from "@/app/db/db"
import { Product } from "@prisma/client"
import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ProductCard, ProductCardSkeleton } from "@/components/ProductCard"
import { Suspense } from "react"
import { cache } from "@/lib/cache"



export default function Productspage(){
    return <main className="space-y-12">
    <ProductGridSection title="All Products" productsFetcher={getProducts}/>
</main>
}
const getProducts=cache(()=>{
    return db.product.findMany({
        where:{
            isAvailableForPurchase:true
        },
        orderBy:{
            name:'asc'
        }
    },
)
},["/products","getProducts"])
type productGridSectionprops={
    title:string
    productsFetcher:()=>Promise<Product[]>
}
function ProductGridSection({productsFetcher,title}:productGridSectionprops){
    return(
        <div className="space-y-4">
            <div className="flex gap-4">
                <h2 className="text-5xl font-bold  ">{title}</h2>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
                <Suspense fallback={<>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
                    <ProductCardSkeleton/>
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