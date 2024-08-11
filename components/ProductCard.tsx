import { formatCurrency } from "@/lib/formatters";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
type ProductCardProps={
    name:string,
    priceInRupees:number,
    description:string,
    id:string,
    imagePath:string
}
export const ProductCard = ({name,priceInRupees,description,id,imagePath}:ProductCardProps) => {
  return <Card className="flex overflow-hidden flex-col"> 
        <div className="relative w-full h-auto aspect-video">
            <Image src={imagePath} fill alt={name} />
        </div>
    <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{formatCurrency(priceInRupees)}</CardDescription>
    </CardHeader>
    <CardContent className="flex-grow">
        <p className="line-clamp-4">{description}</p>
    </CardContent>
    <CardFooter>
        <Button className="w-full bg-rose-500 text-white hover:bg-rose-500/90 hover:text-white duration-300" asChild size='lg'>
        <Link href={`/products/${id}/purchase`} >Purchase</Link>
    </Button>
    </CardFooter>
  </Card>
};
export function ProductCardSkeleton(){
    return <Card className="flex overflow-hidden flex-col animate-pulse"> 
    <div className="relative w-full h-auto aspect-video bg-gray-300">
    </div>
    <CardHeader>
        <CardTitle >
        <div className="w-3/4 h-6 rounded-full bg-gray-300">
        </div>
        </CardTitle>
        <CardDescription>
            <div className="w-1/2 h-4 rounded-full bg-gray-300"></div>
        </CardDescription>
    </CardHeader>
    <CardContent className="space-y-2">
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-full h-4 rounded-full bg-gray-300"></div>
        <div className="w-3/4 h-4 rounded-full bg-gray-300"></div>
    </CardContent>
    <CardFooter>
        <Button className="w-full" disabled size='lg'></Button>
    </CardFooter>
</Card>
}
