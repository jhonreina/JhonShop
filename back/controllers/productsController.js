const productos = require("../models/productos");
const producto = require("../models/productos");
// ver la lista de productos
exports.getProducts = async (req, res, next) => {
    const productos = await producto.find();
    res.status(200).json({
        success: true,
        cantidad: productos.length,
        productos
    })
}

// ver producto por ID
exports.getProductById = async (req, res, next) => {
    const product = await producto.findById(req.params.id);
    if (!product) {
        return res.status(404).json({
               success: false,
               message:"No encontramos el producto"
        })
    }
     res.status(200).json({
       success: true,
       message:"Aqui debajo encuentras informacion sobre tu producto:",
       product
     });
}
// update un produsto
exports.updateProduct = async (req, res, next) => {
    let product = await producto.findById(req.params.id);//variable de tipo modificable
    if (!product) { //verifica que el objeto no existe
      return res.status(404).json({
        success: false,
        message: "No encontramos el producto",
      });
    }
    // si el objeto si existe ejecuto la actulizacion
    product = await producto.findByIdAndUpdate(req.params.id, req.body, {
        new: true, //valida solo los atributos nuevos o actualizados
        runValidators: true,        
    });
    // responde ok si el objeto se actualizo
    res.status(200).json({
        success: true,
        massage: "Producto actualizado correctamente",
        product
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