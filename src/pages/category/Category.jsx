import { useContext, useState } from "react";
import './category.css';
import { ProductsContext } from "../../contexts/ProductsContext";
import SideBar from "../../components/sidebar/SideBar";
import ProductsDisplay from "../../components/productsDisplay/ProductsDisplay";
import { IoFilter } from "react-icons/io5";
import { IoIosCloseCircleOutline } from "react-icons/io";

const Category = (props) => {
  const products = useContext(ProductsContext);
  const [query, setQuery] = useState("");
  const [selectedRating, setSelectedRating] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [sortOption, setSortOption] = useState(""); 
  const [selectedPriceRange, setSelectedPriceRange] = useState([0, 1000000]);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductPerPage] = useState(10);


  const getProductsToDisplay = () => {
    if (props.products) return props.products;
    if (props.category) return products.filter(product => product.category === props.category);
    if (props.subcategory) return products.filter(product => product.subcategory === props.subcategory);
    return products; 
  };

  const filteredProducts = getProductsToDisplay();

  const handleChange = (e, type) => {
    if (type === "filter") {
      setSelectedFilter(e.target.value);
    }
  };

  const filterData = (products) => {
    let filteredProducts = products;

    if (query) {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }

    if (selectedFilter) {
      if (props.products) {
        filteredProducts = filteredProducts.filter(
          ({ category }) => category === selectedFilter
        );
      } else if (props.category) {
        filteredProducts = filteredProducts.filter(
          ({ subcategory }) => subcategory === selectedFilter
        );
      } else if (props.subcategory) {
        filteredProducts = filteredProducts.filter(
          ({ brand }) => brand === selectedFilter
        );
      }
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      ({ price }) => price >= selectedPriceRange[0] && price <= selectedPriceRange[1]
    );

    // Apply rating filter
    if (selectedRating) {
      filteredProducts = filteredProducts.filter(
        ({ stars }) => Math.floor(stars) === selectedRating
      );
    }

    // Apply sorting based on selected sort option
    if (sortOption) {
      filteredProducts = [...filteredProducts].sort((a, b) => {
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "rating-asc") return a.stars - b.stars;
        if (sortOption === "rating-desc") return b.stars - a.stars;
        if (sortOption === "name-asc") return a.name.localeCompare(b.name);
        if (sortOption === "name-desc") return b.name.localeCompare(a.name);
        return 0;
      });
    }

    return filteredProducts;
  };

  const result = filterData(filteredProducts);

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = result.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(result.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleSideBar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="main-container">
      <div className={`sidebar-container ${isSidebarVisible ? "visible" : ""}`}>
        <SideBar
          products={filteredProducts}
          handleChange={handleChange}
          selectedFilter={selectedFilter}
          setSelectedPriceRange={setSelectedPriceRange}
          selectedPriceRange={selectedPriceRange}
          selectedRating={selectedRating}
          setSelectedRating={setSelectedRating}
          filterType={props.products ? "category" : props.category ? "subcategory" : "brand"}
        />
        <IoIosCloseCircleOutline className="close-sidebar" onClick={toggleSideBar} />
      </div>

      <div className="main-container-right">
        <div className="filter-container">
          <input
            className="search-input"
            type="text"
            value={query}
            placeholder="Search products..."
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* Sorting dropdown */}
          <select
            className="sort-dropdown"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating-asc">Rating: Low to High</option>
            <option value="rating-desc">Rating: High to Low</option>
            <option value="name-asc">Name: A to Z</option>
            <option value="name-desc">Name: Z to A</option>
          </select>
        </div>
        <div className="details">
          <h3>{props.category ? `Category: ${props.category}` : props.subcategory ? `Subcategory: ${props.subcategory}` : "All Products"}</h3>
          <p className="products-per-page">Products per page:
            <select className="products-per-page-filter" value={productsPerPage} onChange={(e) => setProductPerPage(Number(e.target.value))}>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="30">30</option>
            </select>
          </p>
          <button onClick={toggleSideBar}><IoFilter /> Filter/Sort</button>
        </div>
        <ProductsDisplay products={currentProducts} />
        <ul className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <li key={index} className={`page-item ${index + 1 === currentPage ? 'active' : ''}`}>
              <button onClick={() => paginate(index + 1)} className="page-link">
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
