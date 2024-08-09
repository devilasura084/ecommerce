'use client'

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { formatCurrency } from "@/lib/formatters"
import { useState } from "react"
import { addProduct, updateProduct } from "../../_actions/products"
import { useFormState, useFormStatus } from "react-dom"
import { Product } from "@prisma/client"
import Image from "next/image"

const ProductForm = ({product}:{product?:Product|null}) => {
    const [priceInRupees,setPriceInRupees]=useState<number|undefined>(product?.PriceInRupees)
    const [error,action]=useFormState(product==null?addProduct:updateProduct.bind(null,product.id),{})
  return (
    <form action={action} className="space-y-8">
        <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input defaultValue={product?.name||""} type="text" id="name" name="name" required/>
            {error.name && <div className="text-destructive">{error.name}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="priceInRupees">Price In Rupees</Label>
            <Input type="number" id="priceInRupees" name="priceInRupees" value={priceInRupees} onChange={e=>setPriceInRupees(Number(e.target.value)||undefined)} required/>
            <div className="text-muted-foreground">{formatCurrency((priceInRupees||0))}</div>
            {error.priceInRupees && <div className="text-destructive">{error.priceInRupees}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" required defaultValue={product?.decription||""}/>
            {error.description && <div className="text-destructive">{error.description}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="file">File</Label>
            <Input type="file" id="file" name="file" required={product==null}/>
            {product!=null && (
                <div className="text-muted-foreground text-sm">{product.filePath}</div>
            )}
            {error.file && <div className="text-destructive">{error.file}</div>}
        </div>
        <div className="space-y-2">
            <Label htmlFor="image">Image</Label>
            <Input type='file' id="image" name="image" required={product==null}/>
            {product!=null && (
                <Image src={product.imagePath} height={'200'} width={'200'} alt="product image"/>
            )}
            {error.image && <div className="text-destructive">{error.image}</div>}
        </div>
        <SubmitButton/ >
    </form>
  )
}
function SubmitButton(){
    const {pending} =useFormStatus();
    return(
        <Button type="submit" disabled={pending}>{pending?'Saving...':'Save'}</Button>
    )
}
export default ProductForm