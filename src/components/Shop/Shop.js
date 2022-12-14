import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/* 
count
data per page (size) : 10  [up to the user] => useState
pages : count / size
currentPage (page)  [up to the user] => useState
starting data = currentPage * size
*/


const Shop = () => {
    const {products, count} = useLoaderData();
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    // console.log(totalPages)

    const pages = Math.ceil(count / size);

    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    // load cart initially thorough local storage
    useEffect(() => {
        // console.log('local storage first line', products);
        const storedCart = getStoredCart();
        const savedCart = [];
        for (const id in storedCart) {
            const addedProduct = products.find(product => product._id === id);
            if (!!addedProduct) {
                const quantity = storedCart[id];    // value of id property
                addedProduct.quantity = quantity;
                savedCart.push(addedProduct);
            }
        }
        setCart(savedCart);
        // console.log('local storage finished');
    }, [products]);


    // event handler 
    const handleAddToCart = (selectedProduct) => {
        // console.log(product);
        // do no do this: cart.push(product);
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== exists._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        setCart(newCart);
        addToDb(selectedProduct._id);
    }



    return (
        <div className='shop-container'>
            <div className="products-container">
                {
                    products.map(product => <Product
                        key={product._id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    />)
                }
            </div>
            <div className="cart-container">
                <Cart cart={cart} clearCart={clearCart}>
                    <Link to="/orders">
                        <button>Review items</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Current page: {page}</p>
                {
                    [...Array(pages).keys()].map(num => <button
                    key={num}
                    className={page === num ? "selected" : null}
                    onClick={() => setPage(num)}
                    >{num}</button> )
                }
            </div>
        </div>
    );
};

export default Shop;