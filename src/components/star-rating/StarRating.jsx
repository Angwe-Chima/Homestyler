import { FaStar, FaStarHalfAlt } from 'react-icons/fa'; 

const StarRating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= Math.floor(rating); i++) {
    stars.push(<FaStar key={i} color="gold" />);
  }

  if (rating % 1 !== 0) {
    stars.push(<FaStarHalfAlt key="half" color="gold" />);
  }

  const totalStars = 5;
  while (stars.length < totalStars) {
    stars.push(<FaStar key={stars.length + 1} color="lightgray" />);
  }

  return <div>{stars}</div>;
};

export default StarRating;
