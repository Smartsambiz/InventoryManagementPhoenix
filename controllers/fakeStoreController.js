const fakeStoreAdapter = require("../configs/fakeStoreAdapter");

exports.getProducts = async(req, res)=>{

    await fakeStoreAdapter.createProducts(req.params.id);
};

exports.getProduct = async(req, res)=>{
    
    await fakeStoreAdapter.getProduct();
    
}

exports.createProduct = async(req, res)=>{
    const { title , price} = req.body
    await fakeStoreAdapter.createProducts(req, res)
    
}

