import "./design-style.css";
import data from "../../data/db.json";
import formatCurrency from "../../utils/money";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaRegHeart,
  FaHeart,
  FaStar,
  FaRegStar,
  FaTimesCircle,
  FaBars,
} from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { useFavorites } from "../../contexts/FavoritesContext";

const DesignStyles = () => {
  const navigate = useNavigate();
  const { addFavorite, removeFavorite, favorites } = useFavorites();

  const handleDesignClick = (id) => {
    navigate(`/design/${id}`);
  };

  const { designs } = data;

  const [loadingStates, setLoadingStates] = useState(
    Array(designs.length).fill(true)
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [likedStates, setLikedStates] = useState(Array(designs.length).fill(false));

  const handleImageLoad = (idx) => {
    setLoadingStates((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      updatedLoadingStates[idx] = false;
      return updatedLoadingStates;
    });
  };

  const toggleLike = (idx, id) => {
    const isLiked = likedStates[idx];
    setLikedStates((prevLikedStates) => {
      const updatedLikedStates = [...prevLikedStates];
      updatedLikedStates[idx] = !isLiked;

      // Add or remove favorite based on the like status
      if (!isLiked) {
        addFavorite("designs", id);
      } else {
        removeFavorite("designs", id);
      }
      return updatedLikedStates;
    });
  };

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill(<FaStar />)
          .map((star, index) => (
            <FaStar key={index} />
          ))}
        {Array(emptyStars)
          .fill(<FaRegStar />)
          .map((star, index) => (
            <FaRegStar key={index + filledStars} />
          ))}
      </>
    );
  };

  const filteredDesigns = designs.filter((design) => {
    const matchesCategory =
      activeCategory === "All" || design.category === activeCategory;
    const matchesSearch =
      design.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      design.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const clearFilter = () => {
    setActiveCategory("All");
    setSearchTerm("");
  };

  return (
    <div>
      <div className="hero_design_styles">
        <div className="hero_search_field">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search designs..."
          />
          <div className="search_icon">
            <IoSearch />
          </div>
        </div>

        <FaBars className="menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)} />

        {isMenuOpen && (
          <div className="menu">
            {["Living Room", "Kitchen", "Bedroom", "Bathroom", "Contemporary", "Elegant Look", "All"].map(category => (
              <button
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        <div className="hero_buttons">
          {["Living Room", "Kitchen", "Bedroom", "Bathroom", "Contemporary", "Elegant Look", "All"].map(category => (
            <button
              key={category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
          {(activeCategory !== "All" || searchTerm) && (
            <FaTimesCircle
              className="clear-filter-icon"
              onClick={clearFilter}
              title="Clear Filter"
            />
          )}
        </div>
      </div>

      <div className="designs">
        {filteredDesigns.length > 0 ? (
          filteredDesigns.map((item, idx) => {
            const isFavorite = favorites.designs && favorites.designs.includes(item.id);

            return (
              <div
                className="design"
                key={item.id}
                onClick={() => handleDesignClick(item.id)}
              >
                <div className="design_image">
                  {loadingStates[idx] && (
                    <img
                      src="assets/images/lazy-animation.gif"
                      alt="Loading..."
                    />
                  )}
                  <img
                    src={`../${item.images[1]}`}
                    alt={item.name}
                    style={{ display: loadingStates[idx] ? "none" : "block" }}
                    onLoad={() => handleImageLoad(idx)}
                    onError={() => handleImageLoad(idx)}
                  />
                </div>
                <div className="tag">
                  <span>{item.category}</span>
                </div>
                <div
                  className="like"
                  onClick={(e) => {
                    toggleLike(idx, item.id);
                    e.stopPropagation();
                  }}
                >
                  {isFavorite ? <FaHeart /> : <FaRegHeart />}
                </div>
                <div className="desc">
                  <h4>{item.name}</h4>
                  <div>
                    <span>₦{formatCurrency(item.price)}</span>
                    <div className="rating">{renderStars(item.rating)}</div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="nothing_found">
            <img src="../assets/images/person.png" alt="" /> Not Found
          </div>
        )}
      </div>
    </div>
  );
};

export default DesignStyles;
