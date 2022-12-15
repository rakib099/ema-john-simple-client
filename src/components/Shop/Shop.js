import React, { useEffect, useState } from 'react';
import { Link, useLoaderData } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

/* 
count
data per page (size) : 10  [up to the user] => useState
pages : Math.ceil(count / size)
currentPage (page)  [up to the user] => useState
skip data = page * size
*/


const Shop = () => {
    // const {products, count} = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);

    useEffect(() => {
        fetch(`http://localhost:5000/products?page=${page}&size=${size}`)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCount(data.count);
                setProducts(data.products);
            })
            .catch(err => console.error(err));
    }, [page, size]);

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
        const ids = Object.keys(storedCart);
        console.log(ids);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (!!addedProduct) {
                        const quantity = storedCart[id];    // value of id property
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })
            .catch(err => console.error(err));

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
                <p>Current page: {page}, size: {size}</p>
                {
                    [...Array(pages).keys()].map(num => <button
                        key={num}
                        className={page === num ? "selected" : ""}
                        onClick={() => setPage(num)}
                    >{num + 1}</button>)
                }
                <select onChange={(e) => {
                    setSize(e.target.value)
                    setPage(0);
                }} defaultValue="10">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;