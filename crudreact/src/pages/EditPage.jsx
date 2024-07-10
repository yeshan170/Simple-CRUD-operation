import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";

const EditPage =()=>{
    let{id}=useParams();
    const navigate=useNavigate();
    const [isLoading,setIsLoading]=useState(false);
    const[product,setProduct]=useState({
        name:"",
        quantity:"",
        price:"",
        image:"",
    })

    const getProduct=async()=>{
        setIsLoading(true);
        try{
            const response =await axios.get(`${VITE_BACKEND_URL}/api/products/${id}`);
        setProduct({
            name:response.data.name,
            quantity:response.data.quantity,
            price:response.data.price,
            image:response.data.image,
        })

        }catch(error){
            setIsLoading(false);
            toast.error(error.message);

        }
        
            setIsLoading(false);
    }
        const updateProduct=async(e)=>{
                e.preventDefault();
                setIsLoading(true);
                try{
                   await axios.put(`${VITE_BACKEND_URL}/api/products/${id}`,product);
                   toast.success("Update a Product successfully");
                   navigate('/');
;
                }catch(error){
                    setIsLoading(false);
                    toast.error(error.message);
                }
        }

    useEffect(()=>{
        getProduct();
    },[])
    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Update Product</h2>
            {isLoading ? ("Loading"):(
                <>
                <form onSubmit={updateProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={product.name} onChange={(e) =>setProduct({...product, name:e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input type="number" value={product.quantity}  onChange={(e) =>setProduct({...product,quantity:e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="number" value={product.price} onChange={(e) =>setProduct({...product,price:e.target.value})} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input type="text" value={product.image} onChange={(e) =>setProduct({...product,image:e.target.value})}className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter URL" />
                    </div>
                    {!isLoading && (<button type="submit" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">Update</button>)}
                    

                </div>
            </form>
                </>
            )}
            
        </div>
    )
}

export default EditPage;