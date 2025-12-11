import React from "react";
import "./dashboard.css";
import data from "../../data/db.json";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDesignerClick = (url) => {
    navigate(`/${url}`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard_hero">
        <div onClick={() => handleDesignerClick("designers")}>
          <h1>{data.designers.length}</h1>
          <h2>Designers</h2>
        </div>
        <div onClick={() => handleDesignerClick("design")}>
          <h1>{data.designs.length}</h1>
          <h2>Designes</h2>
        </div>
        <div onClick={() => handleDesignerClick("products")}>
          <h1>{data.products.length + 4}</h1>
          <h2>Products</h2>
        </div>
      </div>
      <div className="dashboard_details">
        <div className="dashboard_header dash_desc">
          <h1>Explore. Manage. Discover.</h1>
          <h3>
            Access a complete overview of your curated collection of products,
            innovative design concepts, and talented designers. Easily navigate
            through your dashboard, explore in-depth insights, and keep track of
            the latest trends and updates, all in one convenient place.
          </h3>
        </div>

        <div className="dashboard_designers dash_desc">
          <h1>Designers</h1>
          <h3>
            Meet the creative minds behind your favorite designs. Get to know
            the designers through their profiles, view their portfolios, learn
            about their unique styles, and see their ratings. Connect with the
            visionaries who bring your products and designs to life and stay
            inspired by their work.
          </h3>
        </div>

        <div className="dashboard_designs dash_desc">
          <h1>Designs</h1>
          <h3>
            Explore an array of captivating design concepts that blend style and
            functionality. From contemporary living spaces to timeless classics,
            browse detailed floor plans, visual inspirations, and design
            narratives that bring each concept to life. Discover new ways to
            enhance your creative vision.
          </h3>
        </div>
        
        <div className="dashboard_product dash_desc">
          <h1>Products</h1>
          <h3>
            Dive into your extensive range of products, from luxurious furniture
            to stylish decor pieces. Explore comprehensive details including
            high-quality images, thorough descriptions, pricing, availability,
            and customer reviews to help you manage and showcase your inventory
            effectively.
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
