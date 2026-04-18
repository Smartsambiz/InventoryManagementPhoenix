const axios = require("axios");

const baseUrl = 'https://fakestoreapi.com';

const apiCleint = axios.create({
    baseURL: baseUrl,
    timeout: 4000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Get all products
exports.getProducts = async (req, res)=>{
    try{
        const response = await apiCleint.get('/products');

        res.json(response.data);

    } catch(error){
        res.status(500).json({message: error.message})
    }
};

// Get specific products
exports.getProduct = async(req, res)=>{
    try{
        const { id} = req.params.id;
        const response = await apiCleint.get(`/products/${id}`);
        res.json(response.data)
    } catch(error){
        res.status(500).json({message: error.message})
    }
}

exports.createProducts = async (req, res)=>{
    try{
        const response = await apiCleint.post('/products');
        res.json(response.data)
    } catch(error){
        console.log('error', error.message)
    }
   
}