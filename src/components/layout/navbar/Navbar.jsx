import React, { useState } from "react";
import "./navbar.css";
import data from "../../../data/db.json";
import { FiMenu } from "react-icons/fi";

const Navbar = () => {
  const { products } = data;
  const [dropdown, setDropdown] = useState(false);
  const [subDropdown, setSubDropdown] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const categories = [...new Set(products.map((product) => product.category))];

  const categoryMap = categories.map((category) => {
    const subcategories = [
      ...new Set(
        products
          .filter((product) => product.category === category)
          .map((product) => product.subcategory)
      ),
    ];
    return { name: category, subcategories };
  });

  const handleDropdown = () => setDropdown(!dropdown);
  const handleSubDropdown = (index) => {
    setSubDropdown(index === subDropdown ? null : index);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="logo">
        <img src="assets/images/logo.png" alt="" />
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <ul className={`nav-links ${menuOpen ? "open" : ""}`}>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/designers">Designers</a>
        </li>
        <li>
          <a href="/design">Design Styles</a>
        </li>
        <li
          className="dropdown"
          onMouseEnter={handleDropdown}
          onMouseLeave={handleDropdown}
        >
          <a href="#">Products</a>
          {dropdown && (
            <ul className="dropdown-menu">
              {categoryMap.map((category, index) => (
                <li
                  key={index}
                  onMouseEnter={() => handleSubDropdown(index)}
                  onMouseLeave={() => handleSubDropdown(null)}
                >
                  <a href={`/${category.name}`}>{category.name}</a>
    
                </li>
              ))}
            </ul>
          )}
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/favorite">Favorite</a>
        </li>
      </ul>
     <div className="res_menu">
     <FiMenu onClick={toggleMenu}/>
     </div>
    </nav>
  );
};

export default Navbar;
