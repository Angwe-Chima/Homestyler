import { useContext } from 'react'
import Item from '../item/Item'
import './relatedProducts.css'
import { ProductsContext } from '../../contexts/ProductsContext'

// Function to shuffle array (Fisher-Yates shuffle)
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const RelatedProducts = ({category, subcategory, title}) => {
  const products = useContext(ProductsContext);

  // Filter products by category and then shuffle
  const filteredProducts = products.filter(product => {
    if (category && product.category === category) return true;
    if (subcategory && product.subcategory === subcategory) return true;
    return false;
  });

  const shuffledProducts = shuffleArray(filteredProducts);

  return (
    <div className="relatedProducts">
      <h2>{title}</h2>
      <div className="relatedProducts__items">
        {shuffledProducts.slice(0, 5).map((item, itemIndex) => {
          return <Item key={itemIndex} {...item}/>
        })}
      </div>
    </div>
  )
}

export default RelatedProducts;
