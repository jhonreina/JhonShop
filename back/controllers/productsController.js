const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const producto = require("../models/productos");
const APIFeatures = require("../utils/apiFeatures");
const ErrorHandler = require("../utils/errorHandler");
const fetch = (url) =>import('node-fetch').then(({default:fetch}) => fetch (url)); //Usurpacion del require
// ver la lista de productos
exports.getProducts = catchAsyncErrors(async (req, res, next) => {
  
  const resPerPage = 4;
  const productsCount = await producto.countDocuments();

  const apiFeatures = new APIFeatures(producto.find(), req.query)
    .search()
    .filter()
  
  let products = await apiFeatures.query;
  let filteredProductsCount = products.length;
  apiFeatures.pagination(resPerPage)
  products = await apiFeatures.query.clone();

  res.status(200).json({
    success: true,
    productsCount,
    resPerPage,
    filteredProductsCount,
    products
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
exports.newProduct = catchAsyncErrors(async (req, res, next) => {

    req.body.user = req.user.id;
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

//crear una review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comentario, idProducto } = req.body;

  const opinion = {
    nombreCliente: req.user.nombre,
    rating: Number(rating),
    comentario
  }

  const product = await producto.findById(idProducto);

  const isReviewed = product.opiniones.find(
    item => item.nombreCliente === req.user.nombre
  )

  if (isReviewed) {
    product.opiniones.forEach((opinion) => {
      if (opinion.nombreCliente === req.user.nombre) {
         opinion.comentario = comentario,
         opinion.rating = rating
      }
    })
  } else {
    product.opiniones.push(opinion)
    product.numCalificacaiones = product.opiniones.length
  }

  product.calificacion = product.opiniones.reduce(
    (acc, opinion) => opinion.rating + acc,
    0 / product.opiniones.length
  )

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    message: "hemos opinado correctamente",
  });
});


//ver las reviews de un producto
exports.getProductReview = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.query.id)

  res.status(200).json({
    success: true,
    opiniones:product.opiniones
  })
})


//eliminar review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  const product = await producto.findById(req.query.idProducto);

  const opi = product.opiniones.filter(
    (opinion) => opinion._id.toString() !== req.query.idReview.toString()
  );

  const numCalificacaiones = opi.length;

  const calificacion =
    opi.reduce((acc, Opinion) => Opinion.rating + acc, 0) /
    opi.length;

  await producto.findByIdAndUpdate(
    req.query.idProducto,
    {
      opi,
      calificacion,
      numCalificacaiones,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
    message: "review eliminada correctamente",
  });
});

// HABLEMOS DE FETCH
// ver todos los productos
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