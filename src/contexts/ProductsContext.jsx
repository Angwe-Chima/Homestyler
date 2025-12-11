import { createContext } from 'react'
import PropTypes from 'prop-types'
import data from '../data/db.json'

export const ProductsContext = createContext(null)

const ProductsContextProvider = (props) => {
  const { products } = data  
  return (
    <ProductsContext.Provider value={products}>
      {props.children}
    </ProductsContext.Provider>
  )
}

ProductsContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProductsContextProvider