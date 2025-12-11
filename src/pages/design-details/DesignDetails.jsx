// DesignDetails.js
import "./design-details.css";
import { useParams, useNavigate } from "react-router-dom";
import data from "../../data/db.json";
import formatCurrency from "../../utils/money";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

const DesignDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const design = data.designs.find((item) => item.id === parseInt(id));

  const [currentImage, setCurrentImage] = useState(design?.images[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  if (!design) {
    return <p>Design not found!</p>;
  }

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = Math.floor(rating);
    const emptyStars = totalStars - filledStars;

    return (
      <>
        {Array(filledStars)
          .fill(<FaStar />)
          .map((_, index) => (
            <FaStar key={`filled-${index}`} />
          ))}
        {Array(emptyStars)
          .fill(<FaRegStar />)
          .map((_, index) => (
            <FaRegStar key={`empty-${index}`} />
          ))}
      </>
    );
  };

  const handleImageClick = (image, index) => {
    setCurrentImage(image);
    setActiveIndex(index);
  };

  const designer = data.designers.find(
    (designer) => designer.id === design.designers
  );

  const handleDesignerClick = (designerId) => {
    navigate(`/designers/${designerId}`);
  };

  const matchedProducts = data.products.filter(
    (product) => design.products.includes(product.id)
  );

  return (
    <div className="design_detail">
      <div className="details_left">
        <div className="design_back">
          <button onClick={() => navigate(-1)}>
            <IoMdArrowRoundBack />
          </button>
        </div>
        <div className="design_name">
          <h2>{design.name}</h2>
        </div>
        <div className="details_image">
          <img
            src={`../${currentImage}`}
            alt={design.name}
            className="main-image"
          />
        </div>

        <div className="design_images">
          {design.images.map((dImg, idx) => (
            <img
              src={`../${dImg}`}
              alt={dImg}
              key={idx}
              onClick={() => handleImageClick(dImg, idx)}
              className={`thumbnail ${activeIndex === idx ? "active" : ""}`}
            />
          ))}
        </div>

        <div className="design_products">
          <h2>Design Products</h2>
          <ul>
            {matchedProducts.map((product, idx) => (
              <li key={idx}>
                <img
                  src={`../${product.url}`}
                  alt={product.name}
                  className="product-image"
                />
                <div className="product-details">
                  <h4>{product.name}</h4>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <span className="line"></span>
      <div className="details_right">
        <div className="category">
          <p>{design.category}</p>
        </div>
        <div className="design_detail_tag">
          {design.tags.map((tag, idx) => (
            <button key={idx}>{tag}</button>
          ))}
        </div>
        <div className="descript">
          <p>{design.description}</p>
          <p>{design.floor_plan}</p>
          <div>
            <p>{`$${formatCurrency(design.price)}`}</p>
            <div className="rating">{renderStars(design.rating)}</div>
          </div>
        </div>

        {designer && (
          <div
            className="designer_details"
            onClick={() => handleDesignerClick(designer.id)}
          >
            <h3>Designer</h3>
            <div>
              <img src={designer.portfolio} alt="" />
              <div className="desgners_details">
                <h5>{designer.name}</h5>
                <p>Rating: {designer.rating}</p>
              </div>
              <div className="background_port_img">
                <img
                  src="../assets/images/design-styles/background-protfolio.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        )}

        <ul className="reviews">
          <h3>Featured Reviews</h3>
          {design.reviews.map((item, idx) => (
            <li key={idx}>
              <div className="line2"></div>
              <h4>{item.reviewer}</h4>
              <p>{item.comment}</p>
              <span>{item.rating}</span>
              <div className="line2"></div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DesignDetails;
