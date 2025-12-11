import Item from "../item/Item";


const ProductsDisplay = ({products}) => {

  return (
    <div className="products">
        {products.map((product, i) => <Item key={i} {...product} />)}
    </div>
  );
};

export default ProductsDisplay;