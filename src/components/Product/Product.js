import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import './Product.css';

// destructured in parameter
const Product = ({handleAddToCart, product}) => {
    const { name, img, price, seller, ratings } = product;
    // console.log(props);
    
    return (
        <div className='product'>
            <img src={img} alt="product-img" />
            <div className="product-info">
                <h6 className='product-name'>{name}</h6>
                <h6 className='product-price'>Price: ${price}</h6>
                <p><small>Manufacturer: {seller}</small></p>
                <p><small>Rating: {ratings}</small></p>
            </div>
            <button onClick={() => handleAddToCart(product)} className='btn-cart'>
                <p>Add to Cart</p>
                <FontAwesomeIcon icon={faShoppingCart} />
            </button>
        </div>
    );
};

export default Product;