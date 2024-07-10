import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../App";


const CreatePage =()=>{

    const[name,setName]= useState("");
    const[quantity,setQuantity]=useState("");
    const[price,setPrice]=useState("");
    const[image,setImage]=useState("");
    const[isLoading,setIsLoading]=useState(false);
    const navigate=useNavigate();

    const saveProduct=async(e)=>{ 
        e.preventDefault();
       if(name=== "" || quantity === "" || price ==="" || image===""){
        alert('Please fill all input completely');
        return;
       }
       try{

            setIsLoading(true);
            const response= await axios.post(`${VITE_BACKEND_URL}/api/products`,{name:name,quantity:quantity,price:price,image:image});
        
            toast.success(`Save ${response.data.name} sucessfully!`);
            setIsLoading(false);
            navigate("/");


       }catch(error){
        toast.error(error.message);
        setIsLoading(false);
       }
    }

    return(
        <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
            <h2 className="font-semibold text-2xl mb-4 block text-center">Add Product</h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label>Name</label>
                        <input type="text" value={name} onChange={(e)=> setName(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Name" />
                    </div>

                    <div>
                        <label>Quantity</label>
                        <input type="number" value={quantity} onChange={(e)=> setQuantity(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Quantity" />
                    </div>

                    <div>
                        <label>Price</label>
                        <input type="number" value={price} onChange={(e)=>setPrice(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter Price" />
                    </div>

                    <div>
                        <label>Image URL</label>
                        <input type="text" value={image} onChange={(e)=>setImage(e.target.value)} className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400" placeholder="Enter URL" />
                    </div>
                    {!isLoading && (<button type="submit" className="text-white bg-[#2557D6] hover:bg-[#2557D6]/90 focus:ring-4 focus:ring-[#2557D6]/50 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#2557D6]/50 me-2 mb-2">Save</button>)}
                    

                </div>
            </form>
        </div>
    )
}

export default CreatePage;