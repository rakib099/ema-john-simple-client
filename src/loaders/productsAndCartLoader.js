import { getStoredCart } from "../utilities/fakedb";

export const productsAndCartLoader = async () => {
    // get products
    const productData = await fetch('http://localhost:5000/products/');
    const {products} = await productData.json();

    // get cart
    const savedCart = getStoredCart();
    const initialCart = [];

    for (const id in savedCart) {
        const addedProduct = products.find(product => product._id === id);

        if (addedProduct) {
            const quantity = savedCart[id];
            addedProduct.quantity = quantity;
            initialCart.push(addedProduct);
        }
    }
    console.log(initialCart);

    return { products, initialCart };
}