const Product=require('../models/productModel')
const asyncHandler = require('express-async-handler')

//get all product
const getProducts=async (req, res) => {
    try{
        const products =await Product.find({});
        res.status(200).json(products);

    }catch(error){
        res.status(500).json({message : error.message})
    }
}

//get a single product
const getProduct= asyncHandler( async(req,res)=>{
    try{
        const {id}=req.params;
        const product =await Product.findById(id);
        res.status(200).json(product);

    }catch(error){
        res.status(500);
        throw new error(error.message)
         
    }
})

//create a product

const createProduct =asyncHandler(async (req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product); 
    } catch (error) {
        console.log(error.message);
        res.status(500);
        throw new error(error.message)
    }
})

//update a Product
const updateProduct =asyncHandler(async(req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findByIdAndUpdate(id,req.body);
        if(!product){
            res.status(404);
        throw new error(`cannot find any product with ID`)
        }
        const updateProduct=await Product.findById(id);
        res.status(200).json(product);
    }catch(error){
        res.status(500);
        throw new error(error.message)
    }
})

//delete a product

const deleteProduct = asyncHandler(async (req,res)=>{
    try{
        const{id}=req.params;
        const product=await Product.findByIdAndDelete(id);
        if(!product){
            res.status(404);
        throw new error(`cannot find any product with ID`)
            
         }
         res.status(200).json(product);
    }catch(error){
        res.status(500);
        throw new error(error.message)
    }
})

module.exports={
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}