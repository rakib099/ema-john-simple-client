import React, { useState } from 'react';
import './Orders.css';
import { Link, useLoaderData } from 'react-router-dom';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Orders = () => {
    const {initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveFromCart = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
        console.log(remaining);
    }

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <div className='shop-container'>
            <div className="orders-container">
                {
                    cart.map(product => <ReviewItem 
                        key={product._id} 
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}
                        />)
                }
                {
                    cart.length === 0 && <h2 className='text-center'>No items for review. Please <Link to="/">Shop</Link></h2>
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/shipping">
                        <button>Proceed Shipping</button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;