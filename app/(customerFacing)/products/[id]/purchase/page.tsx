import db from "@/app/db/db"
import { formatCurrency } from "@/lib/formatters";
import { Product } from "@prisma/client";
import Image from "next/image";
import { notFound } from "next/navigation";
export  default async function PurchasePage({params:{id}}:{params:{id:string}}){
    const product=await getProduct(id);
    if(product==null)
    {
        return notFound()
    }
    return (<div className="lg:flex">
        <div className=" lg:w-[50%] h-screen">
        <Image className="aspect-video lg:w-[90%] " src={product.imagePath} width={1000} height={1000} alt={product.name}/>
        <h1 className=" text-4xl font-semibold text-rose-600 mt-10">{product.name}</h1>
        <p className="text-muted-foreground">{product.decription}</p>
        </div>
        <div className=" flex flex-1 flex-col space-y-10">
            <h2 className="text-4xl font-bold mx-10 mt-10">Amount to Pay</h2>
            <h3 className="mx-12 text-3xl ">{formatCurrency(product.PriceInRupees)}</h3>
            <div>Checkout</div>
        </div>
    </div>)
}
const getProduct=(id:string):Promise<Product|null>=>{
    return db.product.findUnique({where:{id}})
}