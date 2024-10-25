import { FC } from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

interface RatingProps {
  value: number; // Current rating value (e.g., 4.5)
  max?: number; // Maximum number of stars (default is 5)
  size?: number; // Size of stars
  readOnly?: boolean; // Whether the rating is clickable
  onRate?: (rating: number) => void; // Optional callback when rating changes
}

const Rating: FC<RatingProps> = ({ value, max = 5, size = 24, readOnly = true, onRate }) => {
  const handleClick = (index: number) => {
    if (!readOnly && onRate) {
      onRate(index + 1);
    }
  };

  // Render each star depending on the rating value
  const renderStars = () => {
    const stars = [];
    for (let i = 0; i < max; i++) {
      if (value >= i + 1) {
        // Full Star
        stars.push(
          <FaStar
            key={i}
            className="text-yellow-500 cursor-pointer"
            size={size}
            onClick={() => handleClick(i)}
          />
        );
      } else if (value > i && value < i + 1) {
        // Half Star
        stars.push(
          <FaStarHalfAlt
            key={i}
            className="text-yellow-500 cursor-pointer"
            size={size}
            onClick={() => handleClick(i)}
          />
        );
      } else {
        // Empty Star
        stars.push(
          <FaRegStar
            key={i}
            className="text-yellow-500 cursor-pointer"
            size={size}
            onClick={() => handleClick(i)}
          />
        );
      }
    }
    return stars;
  };

  return <div className="flex">{renderStars()}</div>;
};

export default Rating;
