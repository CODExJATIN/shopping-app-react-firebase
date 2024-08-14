import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import './ProductPage.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { useParams } from 'react-router-dom';
import { db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from './Navbar';
import ProductList from './ProductList';
import ProductCarousel from './Cards';

const ProductPage = () => {

  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      const docRef = doc(db, 'products', productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.log("No such document!");
      }
    };

    fetchProduct();
    window.scrollTo({
      top:0,
      behavior:'smooth'
    });
  }, [productId]);

  if (!product) return <div>Loading...</div>;

  const sliderSettings = {
    dots: true,
    infinite: product.images.length > 1, // Disable infinite loop if only one image
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: product.images.length > 1, // Show arrows only if more than one image
  };

  return (
    <>
      <Navbar/>
      <div className="product-page">
      <div className="product-pics">
        {product.images.length > 1 ? (
          <Slider {...sliderSettings}>
            {product.images.map((img, index) => (
              <div key={index}>
                <img src={img} alt={`product-${index}`} className="carousel-pic" />
              </div>
            ))}
          </Slider>
        ) : (
          <div>
            <img src={product.images[0]} alt="product" className="carousel-pic" />
          </div>
        )}
      </div>
      <div className="product-information">
        <h1 className="product-name">{product.productTitle}</h1>
        <p className="product-detail">{product.description}</p>
        <p className="product-amount">₹{product.price}</p>
        <p className="product-quantity">Available Quantity: {product.quantity}</p>
        <p className="product-supplier">Supplied by: {product.supplierName}</p>
        <div className="product-actions">
          <button className="buy-now-button">Buy Now</button>
          <button className="add-to-cart-button">
            <ShoppingCartIcon /> Add to Cart
          </button>
        </div>
      </div>
    </div>
    <h2>Related Products</h2>
    <ProductList selectedProductType={product.productType} />

    <h2>Our Top Products</h2>
    <ProductCarousel />

    
    <div className='footer-part'><strong>© 2024 BallCart. All Rights Reserved.</strong></div>
    

    </>
    
  );
};

export default ProductPage;
