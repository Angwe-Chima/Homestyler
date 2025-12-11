import { useParams, useNavigate } from "react-router-dom";
import data from "../../data/db.json";
import "./designers-details.css";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { RiInstagramFill } from "react-icons/ri";
import { FaLinkedin, FaStar, FaRegStar, FaPhone } from "react-icons/fa";
import { useState } from "react"; 

const DesignersDetails = () => {
  const { id } = useParams();
  const designerId = parseInt(id);
  const navigate = useNavigate();

  const [loadingStates, setLoadingStates] = useState([]);

  const designer = data.designers.find(
    (designer) => designer.id === designerId
  );

  if (!designer) {
    return <p>Designer not found!</p>;
  }
  const matchingDesigns = data.designs.filter(
    (design) => design.designers === designerId
  );

  if (loadingStates.length === 0 && matchingDesigns.length > 0) {
    setLoadingStates(Array(matchingDesigns.length).fill(true));
  }

  const handleImageLoad = (idx) => {
    setLoadingStates((prevLoadingStates) => {
      const updatedLoadingStates = [...prevLoadingStates];
      updatedLoadingStates[idx] = false;
      return updatedLoadingStates;
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

  const handleDesignClick = (designId) => {
    navigate(`/design/${designId}`);
  };

  return (
    <div className="designer_page">
      <div className="designer_page_hero">
        <div className="top_design">
          <div className="designers_hero_img_div">
            <img src={designer.portfolio} alt={designer.name} />
          </div>
          <div className="designer_hero_desc">
            <h2>{designer.name}</h2>
            <div className="designer_email designer_media">
              <MdEmail />
              <p>{designer.email}</p>
            </div>
            <div className="designer_phone designer_media">
              <FaPhone />
              <p>{designer.phone}</p>
            </div>
            <div className="designer_location designer_media">
              <FaLocationDot />
              <p>{designer.location}</p>
            </div>
          </div>
        </div>
        <div className="bottom_design">
          <p className="ratings">{renderStars(designer.rating)}</p>
          <div className="designer_socials">
            <a href={designer.socialMedia.instagram}>
              <RiInstagramFill />
            </a>
            <a href={designer.socialMedia.linkedin}>
              <FaLinkedin />
            </a>
          </div>
          <p>Availability: {designer.availability}</p>
        </div>
      </div>

      <div className="designers_designs">
        <h1>Designs</h1>
        <div className="all_designers_designs">
          {matchingDesigns.map((design, idx) => (
            <div
              key={design.id}
              className="design_style_box"
              onClick={() => handleDesignClick(design.id)}
            >
              <div className="all_design_img_div">
                {loadingStates[idx] && (
                  <img src="../assets/images/lazy-animation.gif" alt="Loading..." className="lazy_loading_img" />
                )}
                <img
                  src={`../${design.images[0]}`}
                  alt={design.name}
                  style={{ display: loadingStates[idx] ? "none" : "block" }}
                  onLoad={() => handleImageLoad(idx)}
                  onError={() => handleImageLoad(idx)}
                />
              </div>
              <div className="all_design_h3_div">
                <h3>{design.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesignersDetails;
