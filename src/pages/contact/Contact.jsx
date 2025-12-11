import "./contact.css";
import { MdLocationOn } from "react-icons/md";
import { IoMdCall } from "react-icons/io";
import { IoMail } from "react-icons/io5";

const GoogleMap = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d20535764.09708417!2d-33.50135145!3d71.69045985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4ea20dbbe3c07715%3A0x34cf9d830114e218!2sGreenland!5e0!3m2!1sen!2sng!4v1726514624593!5m2!1sen!2sng"
      width="90%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  );
};

const Contact = () => {

  return (
    <div className="contact">
      <div className="contact_hero">
        <img
          src="../assets/images/design-styles/ElegantModernOffice-1.jpg"
          alt=""
        />
      </div>

      <div className="contact_us_txt">
        <h2>Contact us</h2>
        <p>
          Reach out to us with any questions by filling out the form or through
          our contact information below.
        </p>
      </div>

      <div className="box_container">
        <div className="box_div">
          <div className="box">
            <MdLocationOn className="box_icon" />
            Our location
            <p>
              No 12 Lake Avenue Lekki,
              <br />
              Lagos Nigeria
            </p>
          </div>
          <span></span>
          <div className="box">
            <IoMdCall className="box_icon" />
            Call us
            <p>
              +2346790834457 <br />
              +234023466739
            </p>
          </div>
          <span></span>
          <div className="box">
            <IoMail className="box_icon" />
            Mail us <p>plantpalace@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="from_you">
        <h2>We want to hear from you</h2>
        <p>
          Reach out to us with any questions or concerns you may have, and we’ll
          be happy to help
        </p>
      </div>

      <div className="form_div">
        <div>
          <h2>Get In Touch</h2>

          <form className="contact_form">
            <div className="input_container">
              <div className="input_div">
                <label htmlFor="">Name</label>
                <input type="text" />
              </div>
              <div className="input_div">
                <label htmlFor="">Phone</label>
                <input type="text" />
              </div>
            </div>
            <div className="input_container">
              <div className="input_div">
                <label htmlFor="">Email</label>
                <input type="email" />
              </div>
            </div>
            <div className="input_container">
              <div className="input_div">
                <label htmlFor="">Subject</label>
                <input type="text" />
              </div>
            </div>
            <div className="input_container">
              <div className="input_div">
                <label htmlFor="">Message</label>
                <textarea name="" id="" rows={12}></textarea>
              </div>
            </div>
            <button>Submit</button>
          </form>
        </div>
      </div>

      <div className="find_us">
        <h2>Where to find us</h2>

        <div className="contact_map">
          <GoogleMap />
        </div>
      </div>
    </div>
  );
};

export default Contact;
