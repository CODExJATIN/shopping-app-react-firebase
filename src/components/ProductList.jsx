import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebaseConfig'; 
import ProductCard from './Card';

const ProductList = ({ selectedProductType }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const productsCollection = collection(db, 'products');

      // Create a query to filter products by productType
      const productQuery = query(
        productsCollection,
        where('productType', '==', selectedProductType)
      );

      const productSnapshot = await getDocs(productQuery);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productList);
    };

    fetchProducts();
  }, [selectedProductType]);

  return (
    <div className="product-list">
      {products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          image={product.images[0]} 
          title={product.productTitle}
          description={product.description}
          price={product.price}
        />
      ))}
    </div>
  );
};

export default ProductList;
