import Navbar from "../../components/Navbar";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Toaster, toast } from 'sonner'


export default function PartsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/vehiclePart/getAll');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);
  


  const handleAddToCart = (product) => {
    // Retrieve existing cart items from local storage
    const existingCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const isProductInCart = existingCartItems.some((item) => item._id === product._id);

    if (!isProductInCart) {
      // If the product is not in the cart, add it
      const updatedCart = [...existingCartItems, product];

      // Update local storage with the updated cart
      localStorage.setItem('cart', JSON.stringify(updatedCart));
      toast.success('Product added to cart!');
    } else {
      // If the product is already in the cart, show a message
      toast.error('Product is already in the cart!');
    }
  };

  return (
    <>
    
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900"></h2>

          <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <div key={product._id} className="group relative">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img
                    src={`http://localhost:3000/${product.photoUrl}`}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                        {product.name}
                     
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Category: {product.category}</p>
                    <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                    <p className="text-sm font-medium text-gray-900">Remaining: {product.amount}</p>
                  </div>
                  <div>
                    <button className="flex flex-col items-center cursor-pointer" onClick={() => handleAddToCart(product)}>
                      <p className="text-sm font-medium text-gray-900 pb-8">{product.price}</p>
                      
                      <FontAwesomeIcon icon={faShoppingCart} size="2x" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Toaster/>
    </>
  );
}
