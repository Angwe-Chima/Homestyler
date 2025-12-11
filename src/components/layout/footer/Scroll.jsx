import { IoIosArrowUp } from "react-icons/io";
import "./Scroll.css"

function Scroll() {
  const scrollUp = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="totop-div" onClick={scrollUp}>
      <section className="toTop" >
        <IoIosArrowUp className="upIcon" />
        <p>Top</p>
      </section>
    </div>
  );
}

export default Scroll;