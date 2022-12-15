import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './App.css';
import About from './components/About/About';
import Inventory from './components/Inventory/Inventory';
import Login from './components/Login/Login';
import Orders from './components/Orders/Orders';
import PrivateRoute from './components/routes/PrivateRoute';
import Shipping from './components/Shipping/Shipping';
import Shop from './components/Shop/Shop';
import SignUp from './components/SignUp/SignUp';
import Main from './layouts/Main';
import { productsAndCartLoader } from './loaders/productsAndCartLoader';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      children: [
        {
          path: "/",
          element: <Shop />
        },
        {
          path: "/orders", 
          loader: productsAndCartLoader,
          element: <Orders />
        },
        {
          path: "/inventory", 
          element: <PrivateRoute> <Inventory /> </PrivateRoute>
        },
        {
          path: "/shipping", 
          element: <PrivateRoute> <Shipping /> </PrivateRoute>
        },
        {
          path: "/about", 
          element: <About />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/signup",
          element: <SignUp />
        }
      ],
    }
  ]);

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
