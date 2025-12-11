import { FaStar } from 'react-icons/fa';
import "./sidebar.css";

const SideBar = ({
  products,
  handleChange,
  selectedFilter,
  selectedPriceRange,
  setSelectedPriceRange,
  selectedRating,
  setSelectedRating,
  filterType
}) => {
  // Get unique categories, subcategories, or brands based on filterType
  const getFilterOptions = () => {
    if (filterType === "category") {
      return [...new Set(products.map(product => product.category))];
    } else if (filterType === "subcategory") {
      return [...new Set(products.map(product => product.subcategory))];
    } else if (filterType === "brand") {
      return [...new Set(products.map(product => product.brand))];
    }
    return [];
  };

  const filterOptions = getFilterOptions();

  // Handle price range changes
  const handlePriceRangeChange = (e) => {
    setSelectedPriceRange([parseInt(e.target.value), selectedPriceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    setSelectedPriceRange([selectedPriceRange[0], parseInt(e.target.value)]);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  // Function to render stars for rating filter
  const renderStars = (rating) => {
    return (
      <>
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={index < rating ? "star" : "star empty"}
            style={{ color: index < rating ? "#ffc107" : "#e4e5e9" }}
          />
        ))}
      </>
    );
  };

  return (
    <aside className="sidebar">
      <h3>Filter By:</h3>

      {/* Dynamic Filter (Category, Subcategory, or Brand) */}
      <div className="filter dynamic-filter">
        <h3>{filterType === "category" ? "Category" : filterType === "subcategory" ? "Subcategory" : "Brand"}:</h3>
        <div className="filter__item">
          <label className="custom-radio">
            <input
              type="radio"
              id="all"
              value=""
              name={filterType}
              checked={!selectedFilter}
              onChange={(e) => handleChange(e, "filter")}
            />
            <span className="custom-radio-mark"></span>
            All
          </label>
        </div>
        {filterOptions.map((option, i) => (
          <div className="filter__item" key={i}>
            <label className="custom-radio">
              <input
                type="radio"
                id={option}
                value={option}
                name={filterType}
                checked={selectedFilter === option}
                onChange={(e) => handleChange(e, "filter")}
              />
              <span className="custom-radio-mark"></span>
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="filter pricefl_range">
        <h3>Price Range:</h3>
        <input
          type="range"
          min="0"
          max="1000000"
          value={selectedPriceRange[0]}
          onChange={handlePriceRangeChange}
        />
        <input
          type="range"
          min="0"
          max="1000000"
          value={selectedPriceRange[1]}
          onChange={handleMaxPriceChange}
        />
        <div>
          <span>${selectedPriceRange[0]}</span> -{" "}
          <span>${selectedPriceRange[1]}</span>
        </div>
      </div>

      {/* Star Rating Filter */}
      <div className="filter filter_rating">
        <h3>Rating:</h3>
        {[5, 4, 3, 2, 1].map((rating) => (
          <div
            key={rating}
            className={`filter__item star-rating ${selectedRating === rating ? 'active' : ''}`}
            onClick={() => handleRatingChange(rating)}
          >
            {renderStars(rating) } {rating  }
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SideBar;
