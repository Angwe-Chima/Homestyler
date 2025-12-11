import StarRating from "../star-rating/StarRating";
import { IoHeartOutline, IoHeart } from "react-icons/io5";
import formatCurrency from "../../utils/money";
import "./item.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFavorites } from "../../contexts/FavoritesContext";

const Item = (props) => {
  const [loading, setLoading] = useState(true);
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  // Ensure props.id is correctly defined and matches the type in favorites
  const isFavorite = favorites.products && favorites.products.includes(props.id);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const toggleFavorite = (e) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFavorite("products", props.id);
    } else {
      addFavorite("products", props.id);
    }
  };

  return (
    <div className="product">
      <button className="wishlist" onClick={toggleFavorite}>
        {isFavorite ? <IoHeart /> : <IoHeartOutline />}
      </button>
      <div className="product__img-container">
        <Link to={`/product/${props.id}`}>
          {loading && (
            <img
              src="../../../assets/images/lazy-animation.gif"
              alt="Loading..."
              className="loading_animation"
            />
          )}
          <img
            className="product__img"
            src={`../../../${props.url}`}
            alt={props.name}
            onLoad={handleImageLoad}
            style={{ display: loading ? "none" : "block" }}
          />
        </Link>
      </div>
      <div className="product__details">
        <h4 className="product__name">{props.name}</h4>
        <p className="product__price">${formatCurrency(props.price)}</p>
        <div className="product__reviews">
          <StarRating rating={props.stars} />
          <span>({props.reviews.length})</span>
        </div>
      </div>
    </div>
  );
};

export default Item;
