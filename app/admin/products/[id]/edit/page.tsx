import PageHeader from "@/app/admin/_component/PageHeader";
import ProductForm from "../../_components/ProductForm";
import db from "@/app/db/db";


export default async function EditProducetPage(
    {
        params:{id},
    }:
    {
        params:{id:string}
    }){
        const product=await db.product.findUnique({where:{id}})
    return(
        <>
        <PageHeader className="mb-4">
            Edit Product
        </PageHeader>
        <ProductForm
        product={product}
        />
        </>
    )
}