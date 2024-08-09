import PageHeader from "../../_component/PageHeader";
import ProductForm from "../_components/ProductForm";

export default function NewProducetPage(){
    return(
        <>
        <PageHeader className="mb-4">
            Add Product
        </PageHeader>
        <ProductForm/>
        </>
    )
}