'use server'

import db from "@/app/db/db"
import { z } from "zod"
import fs from 'fs/promises'
import { notFound, redirect } from "next/navigation"
const fileschema=z.instanceof(File,{message:"Required"})
const imageschema=fileschema.refine(file=>file.size===0||file.type.startsWith('image/'))
const addSchema=z.object({
    name:z.string().min(1),
    description:z.string().min(1),
    priceInRupees:z.coerce.number().int().min(1),
    file:fileschema.refine(file=>file.size>0,'Required'),
    image:imageschema.refine(file=>file.size>0,'Required')
})
export async function addProduct(prevState:unknown,formData:FormData){
        const result=addSchema.safeParse(Object.fromEntries(formData.entries()))
        if(result.success==false)
        {
            return result.error.formErrors.fieldErrors
        }
        const data=result.data
        await fs.mkdir('products',{recursive:true})
        const filePath=`products/${crypto.randomUUID()}-${data.file.name}`
        await fs.writeFile(filePath,Buffer.from(await data.file.arrayBuffer()))
        await fs.mkdir('public/products',{recursive:true})
        const imagePath=`/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))
        await db.product.create({data:{
            isAvailableForPurchase:false,
            name:data.name,
            PriceInRupees:data.priceInRupees,
            decription:data.description,
            filePath,
            imagePath
        }})
        redirect('/admin/products')
} 
const editSchema=addSchema.extend(
    {
        file:fileschema.optional(),
        image:imageschema.optional()
    }
)
export async function updateProduct(id:string,prevState:unknown,formData:FormData){
    const result=editSchema.safeParse(Object.fromEntries(formData.entries()))
    if(result.success==false)
    {
        return result.error.formErrors.fieldErrors
    }
    const data=result.data
    const product= await db.product.findUnique({where:{id}})
    if(product==null)return notFound();

    let filePath=product.filePath
    if(data.file!=null && data.file.size>0 )
    {
        await fs.unlink(product.filePath)
        filePath=`products/${crypto.randomUUID()}-${data.    file.name}`
        await fs.writeFile(filePath,Buffer.from(await data.file.    arrayBuffer()))
    }
    let imagePath=product.imagePath
    if(data.image!=null && data.image.size>0 )
    {
        await fs.unlink(`public${product.imagePath}`)
        imagePath=`/products/${crypto.randomUUID()}-${data.image.name}`
        await fs.writeFile(`public${imagePath}`,Buffer.from(await data.image.arrayBuffer()))
    }
    await db.product.update({
        where:{id},
        data:{
        name:data.name,
        PriceInRupees:data.priceInRupees,
        decription:data.description,
        filePath,
        imagePath
    }})
    redirect('/admin/products')
} 
export async function toggleProductAvailability({id, isAvailableForPurchase}: {id: string, isAvailableForPurchase: boolean}) {
    await db.product.update({where: {id}, data: {isAvailableForPurchase}})
  }
export async function deleteProduct({id}:{id:string})
{
    const product=await db.product.delete({where:{id}})
    if(product==null)
        return notFound()
    await fs.unlink(product.filePath)
    await fs.unlink(`public${product.imagePath}`)
}