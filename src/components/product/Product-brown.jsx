import React from "react";
import { Link, useNavigate } from "react-router-dom";
import formatCurrency from "../../utils/money";
const Product = (props) => {
  const navigate = useNavigate();

  return (
    <div className="maintains">
      <Link to={`/product/${props.id}`} className="maintain-img">
        <div className="product">
          <div className="new">
            <h4> New </h4>
          </div>
          <div className="discount">
            <h4> -{props.discount}%</h4>
          </div>

          <div className="discount-line"></div>

          <div className="product-image">
            <img src={`../../${props.url}`} />
          </div>
        </div>

          <div className="descript">
            <h4>{props.title}</h4>
            <h5 className="prices"> ${formatCurrency(props.priceCents)}</h5>
          </div>
      </Link>
    </div>
  );
};

export default Product;
