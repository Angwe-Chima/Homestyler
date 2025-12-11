import React from "react";
import { IoPeopleOutline } from "react-icons/io5";
import { FaRegCopy } from "react-icons/fa";
import { GoSmiley } from "react-icons/go";
import { FaLinkedinIn, FaTwitter, FaFacebookF } from "react-icons/fa";
import './About.css'
export default function About() {
  const stats = [
    { icon: <GoSmiley />, label: "Satisfied Customers", value: "30+" },
    { icon: <FaRegCopy />, label: "Completed Projects", value: "600+" },
    { icon: <IoPeopleOutline />, label: "Expert Designers", value: "20+" }
  ];

  const styles = [
    { img: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=500&fit=crop", category: "Living Room" },
    { img: "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400&h=500&fit=crop", category: "Kitchen" },
    { img: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=500&fit=crop", category: "Bedroom" },
    { img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=500&fit=crop", category: "Office" },
    { img: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=500&fit=crop", category: "Contemporary" },
    { img: "https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=400&h=500&fit=crop", category: "Bathroom" }
  ];

  const team = [
    { name: "Angwe Destiny", role: "Web Developer & Co-Founder", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop" },
    { name: "Itama Nsikak", role: "UI/UX Designer & Co-Founder", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
    { name: "Ekene Ezelibe", role: "Web Developer & Co-Founder", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
    { name: "Abbas Abubakar", role: "Web Developer & Co-Founder", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop" },
    { name: "Habeeb", role: "UI/UX Designer & Co-Founder", img: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop" }
  ];

  const heroImages = [
    "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1616137466211-f939a420be84?w=400&h=400&fit=crop"
  ];

  return (
    <div className="about-page">
      <style>{`
        
      `}</style>

      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-content">
          <h1>About HomeStyler</h1>
          <p>
            HomeStyler is a premier online platform designed for interior design and home decoration. 
            We offer a vast library of real-world furniture and decor from well-known brands, allowing 
            you to visualize and create your dream spaces with precision and elegance.
          </p>
        </div>
        <div className="hero-grid">
          {heroImages.map((img, i) => (
            <img key={i} src={img} alt={`Interior ${i + 1}`} className="hero-grid-img" />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <h2>Why Choose Us?</h2>
        <p>
          Your ultimate destination for personalized, professional interior design solutions. 
          We employ top designers and give you the opportunity to select whatever choice of designs suits your style.
        </p>
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card">
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Design Styles Section */}
      <section className="styles-section">
        <h2>Design Styles</h2>
        <div className="styles-grid">
          {styles.map((style, i) => (
            <div key={i} className="style-card">
              <img src={style.img} alt={style.category} />
              <div className="style-category">{style.category}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2>Our Team</h2>
        <p>Meet our wonderful team who make this work</p>
        <div className="team-grid">
          {team.map((member, i) => (
            <div key={i} className="team-card">
              <div className="team-card-img">
                <img src={member.img} alt={member.name} />
              </div>
              <div className="team-name">{member.name}</div>
              <div className="team-role">{member.role}</div>
              <div className="team-socials">
                <span className="social-icon"><FaLinkedinIn /></span>
                <span className="social-icon"><FaTwitter /></span>
                <span className="social-icon"><FaFacebookF /></span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}