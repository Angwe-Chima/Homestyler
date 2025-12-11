import React, { useState } from "react";
import "./favorites.css";
import { useFavorites } from "../../contexts/FavoritesContext";
import data from "../../data/db.json";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const FavoritesPage = () => {
  const { favorites, removeFavorite } = useFavorites();
  const { designs, products } = data;
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("designs");

  const handleItemClick = (id, type) => {
    navigate(`/${type}/${id}`);
  };

  const getItemById = (id, type) => {
    return type === "designs"
      ? designs.find((design) => design.id === id)
      : products.find((product) => product.id === id);
  };

  return (
    <div className="favorite-body">
      <div className="fave-hero">
        <h1>Favorites</h1>
      </div>
      <div className="tab_buttons">
        <button
          onClick={() => setActiveTab("designs")}
          className={activeTab === "designs" ? "active" : ""}
        >
          Designs
        </button>
        <button
          onClick={() => setActiveTab("products")}
          className={activeTab === "products" ? "active" : ""}
        >
          Products
        </button>
      </div>

      {activeTab === "designs" ? (
        <div className="all_fav_div">
          {favorites.designs && favorites.designs.length > 0 ? (
            favorites.designs.map((id) => {
              const design = getItemById(id, "designs");
              if (!design) return null;

              return (
                <div key={id} className="favDiv">
                  <div
                    className="fav_image"
                    onClick={() => handleItemClick(design.id, "design")}
                  >
                    <div className="favtag">{design.category}</div>
                    <img
                      src={`../${design.images[0]}`}
                      alt={design.name}
                      onError={(e) => {
                        e.target.src = "../assets/images/default-image.png";
                      }}
                    />
                  </div>
                  <div className="fav_details">
                    <p>{design.name}</p>
                    <button onClick={() => removeFavorite("designs", id)}>
                      Remove <FaTrashCan />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="nothing_found">
              <img src="../assets/images/person.png" alt="" /> No Favorites
            </div>
          )}
        </div>
      ) : (
        <div className="all_fav_div">
          {favorites.products && favorites.products.length > 0 ? (
            favorites.products.map((id) => {
              const product = getItemById(id, "products");
              if (!product) return null;

              return (
                <div key={id} className="favDiv">
                  <div
                    className="fav_image"
                    onClick={() => handleItemClick(product.id, "product")}
                  >
                    <div className="favtag">{product.category}</div>
                    <img
                      src={`../${product.url}`}
                      alt={product.name}
                      onError={(e) => {
                        e.target.src = "../assets/images/default-image.png";
                      }}
                    />
                  </div>
                  <div className="fav_details">
                    <p>{product.name}</p>
                    <button onClick={() => removeFavorite("products", id)}>
                      Remove <FaTrashCan />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="nothing_found">
              <img src="../assets/images/person.png" alt="" /> No Favorites
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;
