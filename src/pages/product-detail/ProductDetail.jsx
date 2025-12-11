import { useParams } from "react-router-dom"
import ProductView from "../../components/product-view/ProductView"
import { useContext } from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import RelatedProducts from "../../components/related-products/RelatedProducts"
import './productDetail.css'

const ProductDetail = () => {
  const products = useContext(ProductsContext)
  const { productId } = useParams()
  const product = products.find(product => product.id === Number(productId))

  return (
    <div className="product-detail">
      <ProductView {...product}/>
      <RelatedProducts subcategory={product.subcategory} title="Similar to this product" />
      <RelatedProducts category={product.category} title="Related to this product"/>

    </div>
  )
}

export default ProductDetail