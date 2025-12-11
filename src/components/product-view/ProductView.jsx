import { FaStar } from "react-icons/fa"
import StarRating from "../star-rating/StarRating"
import formatCurrency from "../../utils/money"
import './productView.css'

const ProductView = (product) => {
  return (
    <div className="product-view">
      <div className="product-view__left">
        <img src={`../../../${product.url}`} alt={product.name} />
      </div>
      <div className="product-view__right">
        <h2>{product.name}</h2>
        <div className="product-view__rating">
        <StarRating rating={product.stars}/>
        <span>{product.reviews.length} {product.reviews.length > 1 ? "Ratings" : "Rating"}</span>
        </div>
        <hr />
        <div className="product-view__price">
          ${formatCurrency(product.price)}
        </div>
        <div className="product-view__details">
          <p><span>Brand:</span>  {product.brand}</p>
          {product.material && <p><span>Material:</span>  {product.material}</p>}
          <p><span>Product dimension:</span>  w{product.dimensions.width} h{product.dimensions.height} {product.dimensions.depth && <span>d{product.dimensions.depth}</span>}</p>
          <p><span>Item weight:</span>  {product.weight}</p>
          <p><span>Type:</span>  {product.type}</p>
          <p><span>Category:</span>  {product.category}</p>
          {product.tags && product.tags.length > 0 && (
            <p>
              <span>Tags:</span> {product.tags.map((tag, i) => <span key={i} className="tags">{tag}</span>)}
            </p>
          )}
        </div>
        <hr />

        <div className="about-product">
          <p><span>Description:</span> {product.description}</p>
          {product.care_instructions && 
            <div>
              <span>Care instructions</span>
              <ul>
                {product.care_instructions.map((ins,i) => <li key={i}>{ins}</li>)}  
              </ul>
            </div>
          }
          <h3>Featured Reviews</h3>
          {product.reviews.map((review, i) => (
            <div className="review" key={i}>
                <p>{review.name}</p>
                <p><StarRating rating={review.rating}/></p>
                <p>{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductView