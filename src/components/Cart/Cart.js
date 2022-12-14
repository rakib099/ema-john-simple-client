import React from 'react';
import './Cart.css';

const Cart = ({ cart, clearCart, children }) => {
    console.log(children)
/* ------------- Calculate Product Total and Shipping Total ------------- */
    /* method:1 (using for of) */
    // let total = 0;
    // for (const product of cart) {
    //     total = total + product.price;
    // }

    /* method:2 (using forEach) */
    let total = 0;
    let shipping = 0
    let totalQuantity = 0;
    cart.forEach(product => {
        totalQuantity = totalQuantity + product.quantity;
        total = total + (product.price * product.quantity);
        shipping = shipping + product.shipping;
    });

    /* method:3 (using reduce) */
    // array.reduce(accumulatorFunction, initial value)
    // const total = cart.reduce((previous, current) => previous + current.price, 0);

    // console.log(total);

    // const shippingTotal = cart.reduce((previous, current) => {
    //     return previous + current.shipping;
    // }, 0);
    
/* ---------------------------------------------------------------------- */

    // used shortcut method to convert string to number
    const tax = +(total * 0.10).toFixed(2);
    // console.log(tax, typeof tax);
    const grandTotal = total + shipping + tax;

    return (
        <div className='cart'>
            <h4 className='cart-title'>Order Summary</h4>
            <p>Selected Items: {totalQuantity}</p>
            <p>Total Price: ${total}</p>
            <p>Total Shipping Charge: ${shipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
            {/* <button onClick={clearCart} className="btn-clear">Clear Cart</button> */}
            {children}
        </div>
    );
};

export default Cart;