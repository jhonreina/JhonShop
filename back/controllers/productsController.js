const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) =>import('node-fetch').then(({default:fetch}) => fetch (url)); //Usurpacion del require
// ver la lista de productos
exports.getProducts =catchAsyncErrors(async (req, res, next) => {
    const productos = await producto.find();
     if (!productos) {
       return next(new ErrorHandler("Información no encontrada", 404));
     }


    res.status(200).json({
        success: true,
        cantidad: productos.length,
        productos
    })
})

// ver producto por ID
exports.getProductById = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.params.id);
  if (!product) {
    return next(new ErrorHandler("Producto no encontrado", 404));
  }

  res.status(200).json({
    success: true,
    message: "Aqui abajo encontraras información sobre el producto: ",
    product,
  });
});
// update un producto
exports.updateProduct = catchAsyncErrors(async (req, res, next) => {
    let product = await producto.findById(req.params.id);//variable de tipo modificable
     if (!product) {
       return next(new ErrorHandler("Producto no encontrado", 404));
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
})

// crear nuevo producto /api/prodcutos
exports.newProduct =catchAsyncErrors(async (req, res, next) => {
    const product = await producto.create(req.body);

    res.status(201).json({
        success: true,
        product
    })    
})


//ELliminar producto

exports.deleteProduct =catchAsyncErrors( async (req, res, next) => {
    const product = await producto.findById(req.params.id);
    if (!product) {
      return next(new ErrorHandler("Producto no encontrado", 404));
    }

    await product.remove();//eliminamos el objeto
    res.status(200).json({
        success: true,
        message:"Producto eliminado correctamente"
    })
})


// HABLEMOS DE FETCH
// ver todos los priductos
function verProductos(params) {
    fetch('http://localhost:4000/api/productos')
    .then(res=>res.json())
    .then(res=>console.log (res))
     .catch(err=>console.log(err))
}

// verProductos(); llamamos el metodo creado para probar consulta


// ver por id

function idProductos(id) {
  fetch("http://localhost:4000/api/producto/"+id)
    .then((res) => res.json())
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// idProductos("6351d035c0195484a7e91453"); probamos el metodo con id