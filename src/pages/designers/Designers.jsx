import "./designers.css";
import data from "../../data/db.json";
import { useNavigate } from "react-router-dom"; 


const Designers = () => {
  const navigate = useNavigate(); 

  const handleDesignerClick = (designerId) => {
    navigate(`/designers/${designerId}`);
  };

  return (
    <div className="designers">
      <div className="designers_hero">
        <h1>Designers</h1>
      </div>

      <div className="meet_out_designers">
        <h1>Meet Our Designers</h1>
        <p>Discover the creative minds behind our stunning designs. Our talented team blends expertise, passion, and innovation to bring your vision to life. Explore their portfolios, get inspired, and connect with the designers who turn ideas into reality. Experience the artistry that sets us apart.</p>
      </div>

      <div className="designers_div">
        {data.designers.map((item) => (
          <div
            className="designersBox"
            key={item.id}
            style={{ "--designer-name": `"${item.name}"` }}
            onClick={() => handleDesignerClick(item.id)} 
          >
            <div className="designers_left">
              <img src={item.portfolio} alt={`${item.name}'s portfolio`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Designers;
