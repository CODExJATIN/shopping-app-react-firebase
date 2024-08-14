import React from 'react';


const ProductCard = ({ image, title, description, price }) => {

  const truncatedDescription = description.length > 25 ? description.substring(0, 25) + '...' : description;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={image} alt={title} />
        <button className="add-to-cart-image">+ Add</button>
      </div>

      <div className="product-details">
        <h2 className="product-title">{title}</h2>
        <p className="product-description">{truncatedDescription}</p>
        <p className="product-price"> ₹{price}</p>
        <div className="product-buttons">
          <button className="buy-now">Buy Now</button>
          <button className="add-to-cart-bottom">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
