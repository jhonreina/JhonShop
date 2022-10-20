const producto = require("../models/productos");
// ver la lista de productos
exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message:"En esta ruta ud va poder ver todos los productos"
    })
}

// crear nuevo producto /api/prodcutos
exports.newProduct = async (req, res, next) => {
    const product = await producto.create(req.body);

    res.status(201).json({
        success: true,
        product
    })    
}