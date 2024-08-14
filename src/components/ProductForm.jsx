import React, { useState } from 'react';
import { db, storage } from '../firebaseConfig'; // Import your Firebase config
import { addDoc, collection } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'; // For generating unique IDs

const ProductUploadForm = () => {
  const [productTitle, setProductTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [supplierName, setSupplierName] = useState('');
  const [productType, setProductType] = useState('Sports Accessory'); // Default value
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 5) {
      alert('You can upload a maximum of 5 images.');
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      alert('Please upload at least one image.');
      return;
    }

    try {
      // Upload images to Firebase Storage
      const imageUrls = await Promise.all(
        images.map((image) => {
          const storageRef = ref(storage, `products/${uuidv4()}-${image.name}`);
          return uploadBytesResumable(storageRef, image).then(() => getDownloadURL(storageRef));
        })
      );

      // Store product details in Firestore
      await addDoc(collection(db, 'products'), {
        productTitle,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        supplierName,
        productType, // Include the product type in the document
        images: imageUrls,
        createdAt: new Date(),
      });

      alert('Product uploaded successfully!');
      // Clear the form
      setProductTitle('');
      setDescription('');
      setPrice('');
      setQuantity('');
      setSupplierName('');
      setProductType('Sports Accessory'); // Reset to default value
      setImages([]);
    } catch (error) {
      console.error('Error uploading product:', error);
      alert('Error uploading product. Please try again.');
    }
  };

  return (
    <div className="form-page">
      <div className="form-container">
        <section>
          <header className="header">
            <h1>Upload Product</h1>
          </header>
          <form onSubmit={handleSubmit} className="product-upload-form">
            <label htmlFor="productTitle" className="form-label">
              Product Title
            </label>
            <input
              type="text"
              id="productTitle"
              name="productTitle"
              className="input-field"
              value={productTitle}
              onChange={(e) => setProductTitle(e.target.value)}
              required
            />

            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              className="input-field textarea-field"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>

            <label htmlFor="price" className="form-label">
              Price Per Unit
            </label>
            <input
              type="number"
              id="price"
              name="price"
              className="input-field"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />

            <label htmlFor="quantity" className="form-label">
              Available Quantity
            </label>
            <input
              type="number"
              id="quantity"
              name="quantity"
              className="input-field"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />

            <label htmlFor="supplierName" className="form-label">
              Supplier Name
            </label>
            <input
              type="text"
              id="supplierName"
              name="supplierName"
              className="input-field"
              value={supplierName}
              onChange={(e) => setSupplierName(e.target.value)}
              required
            />

            <label htmlFor="productType" className="form-label">
              Product Type
            </label>
            <select
              id="productType"
              name="productType"
              className="input-field"
              value={productType}
              onChange={(e) => setProductType(e.target.value)}
              required
            >
              <option value="Sports Accessory">Sports Accessory</option>
              <option value="Household Accessories">Household Accessories</option>
              <option value="Grocery">Grocery</option>
              <option value="School">School</option>
              <option value="Fashion">Fashion</option>
              <option value="Beauty Products">Beauty Products</option>
            </select>

            <label htmlFor="images" className="form-label">
              Upload Images (JPG, PNG, WEBP, JPEG)
            </label>
            <input
              type="file"
              id="images"
              name="images"
              className="input-field"
              onChange={handleImageUpload}
              accept="image/jpg, image/png, image/webp, image/jpeg"
              multiple
              required
            />

            <button type="submit" className="submit-button">
              Upload Product
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ProductUploadForm;
