import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import './ReviewItem.css';

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    const { id, img, name, price, shipping, quantity } = product;
    return (
        <div className='review-item'>
                <img src={img} alt="" />
            <div className="review-details-container">
                <div className="review-details">
                    <h3>{name}</h3>
                    <p><small>Price: <span>${price}</span></small></p>
                    <p><small>Quantity: <span>{quantity}</span></small></p>
                    <p><small>Shipping Charge: <span>${shipping}</span></small></p>
                </div>
                <div className="delete-container">
                    <button onClick={() => handleRemoveFromCart(id)} className='btn-delete'>
                        <FontAwesomeIcon className='delete-icon' icon={faTrashCan} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;