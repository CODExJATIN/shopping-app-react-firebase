import React from 'react'
import Navbar from './Navbar';
import ProductCarousel from './Cards';
import ProductList from './ProductList';


const HomePage = () => {
    return (
        <div>
            <Navbar />

            <div className='content'>
                <h1>Shop Now</h1>
                <ProductCarousel />

                <h2 className='category-title'>Grocery</h2>
                <div>
                    <ProductList selectedProductType='Grocery' />
                </div>

                {/*<h2 className='category-title'>Household Accessories</h2>
      <div>
        <ProductList selectedProductType='Household Accessories'/>
      </div>*/}

                <h2 className='category-title'>Sports Accessories</h2>
                <div>
                    <ProductList selectedProductType='Sports Accessory' />
                </div>

                <h2 className='category-title'>School</h2>
                <div>
                    <ProductList selectedProductType='School' />
                </div>

            </div>

        </div>
    )
}

export default HomePage
