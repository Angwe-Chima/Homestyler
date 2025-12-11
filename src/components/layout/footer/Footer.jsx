import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <section>
        <div>
          <Link>
            <img className="footer__logoo" src="assets/images/logo.png" alt="logo" />
          </Link>
        </div>

        <div className="links">
          <div className="_col">
            <h4>COMPANY</h4>
            <ul>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div className="_col">
            <h4>QUICK LINKS</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/Furniture">Furniture</Link>
              </li>
              <li>
                <Link to="/Bathroom">Bathroom</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
              <li>
                <Link to="/">Site map</Link>
              </li>
            </ul>
          </div>

          <div className="_col">
            <h4>ACCOUNT</h4>
            <ul>
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <Link to="/designers">Designers</Link>
              </li>
              <li>
                <Link to="/design">Design Styles</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="copyright">
        <p>©{year}, HomeStyler. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
