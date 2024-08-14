import React from 'react';
import {useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';

 
const ProductCard = ({ id, image, title, description, price }) => {

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/${id}`);
  };

  const cartHandler = () => {
    toast.success("Product added to cart");
  }

  const truncatedDescription = description.length > 25 ? description.substring(0, 25) + '...' : description;

  return (
    <div className="product-card" onClick={handleCardClick}>
      <div className="product-image">
        <img src={image} alt={title} />
        <button className="add-to-cart-image" onClick={cartHandler}>+ Add</button>
      </div>

      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{truncatedDescription}</p>
        <p className="product-price"> ₹{price}</p>
        <div className="product-buttons">
          <button className="buy-now">Buy Now</button>
          <button className="add-to-cart-bottom" onClick={cartHandler}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
