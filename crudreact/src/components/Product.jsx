import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../App";


const Product =({product,getProducts})=>{

    const deleteProduct=async(id)=>{

          const result =await Swal.fire({
            title: 'Are you sure?',
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete it!"
          })
          if(result.isConfirmed){
            try{
              await axios.delete(`${VITE_BACKEND_URL}/api/products/${id}`);
              toast.success("Delete product successfully");
              getProducts();
                  }catch(error){
                toast.error(error.message);
            }
          }
          

      
      

     }

    return(
        <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 m-4 w-60">
        <img src={product.image} className="w-full h-40 object-cover" alt={product.name} />
        <div className="px-6 pt-4 pb-6">
          <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
          <div className="text-gray-700 text-sm mb-1">Quantity: {product.quantity}</div>
          <div className="text-gray-700 text-sm mb-4">Price: ${product.price}</div>
          <div className="mt-4 flex justify-between">
            <Link to={`/edit/${product._id}`} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Edit</Link>
            <button onClick={()=> deleteProduct(product._id)} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
          </div>
        </div>
      </div>

    )
}
export default Product;