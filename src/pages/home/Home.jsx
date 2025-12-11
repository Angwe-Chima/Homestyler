import React, { useState } from 'react';
import { ChevronRight, Star, TrendingUp, Sparkles } from 'lucide-react';
import { useContext } from 'react';
import { ProductsContext } from '../../contexts/ProductsContext';
import './Home.css'
import home1 from "../../images/black-1.jpg";
import home2 from "../../images/black-2.jpg";
import home3 from "../../images/black-3.jpg";
import home4 from "../../images/black-4.jpg";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  const products = useContext(ProductsContext);

  // Sample data
  const heroImages = [
    home1, home2, home3, home4
  ];

  const testimonials = [
    { name: 'Sarah Johnson', text: 'Transformed my apartment into a luxury haven. Absolutely stunning work!', rating: 5 },
    { name: 'Michael Chen', text: 'Professional team, exceptional taste, and flawless execution.', rating: 5 },
    { name: 'Emma Davis', text: 'Every detail was perfect. Highly recommend their services!', rating: 5 }
  ];

  const categories = ['All', 'Furniture', 'Lighting', 'Decor'];

  const getRandomProducts = (products) => {
  const shuffled = [...products].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
};

const randomProducts = getRandomProducts(products);


  const filteredProducts = selectedCategory === 'All' 
    ? randomProducts 
    : randomProducts.filter(p => p.category === selectedCategory);

  return (
    <div className="luxury-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-gallery">
          {heroImages.map((img, i) => (
            <div key={i} className="hero-img">
              <img src={img} alt={`Interior ${i + 1}`} />
            </div>
          ))}
        </div>
        
        <div className="hero-content">
          <div className="hero-badge">
            <Sparkles size={16} />
            Award-Winning Design Studio
          </div>
          <h1 className="hero-title">
            Design Your <strong>Dream Space</strong> with Timeless Elegance
          </h1>
          <p className="hero-desc">
            Transform your living spaces into extraordinary sanctuaries. Our expert designers craft bespoke interiors that blend luxury, functionality, and your unique style into harmonious perfection.
          </p>
          <div className="hero-cta">
            <button className="btn btn-primary">
              Explore Collection <ChevronRight size={20} />
            </button>
            <button className="btn btn-secondary">
              Book Consultation
            </button>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats">
        <div className="stat-item">
          <span className="stat-number">500+</span>
          <span className="stat-label">Projects Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">98%</span>
          <span className="stat-label">Client Satisfaction</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">50+</span>
          <span className="stat-label">Design Awards</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">15</span>
          <span className="stat-label">Years Experience</span>
        </div>
      </section>

      {/* Products */}
      <section className="section">
        <div className="section-header">
          <h2 className="section-title">Featured Collection</h2>
          <p className="section-subtitle">Curated pieces for discerning tastes</p>
        </div>

        <div className="categories">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <img src={product.url} alt={product.name} className="product-img" />
              <div className="product-info">
                <div className="product-name">{product.name}</div>
                <div className="product-price">₦{product.price.toFixed(2)}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-header">
          <h2 className="section-title">Client Experiences</h2>
        </div>
        <div className="testimonial-content">
          <p className="testimonial-text">"{testimonials[activeTestimonial].text}"</p>
          <div className="testimonial-author">— {testimonials[activeTestimonial].name}</div>
          <div className="rating">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={20} fill="currentColor" />
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, i) => (
              <div
                key={i}
                className={`dot ${activeTestimonial === i ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(i)}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;