const Order = require("../models/order");
const Product = require("../models/productos");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");

//Crear una nueva orden
exports.newOrder = catchAsyncErrors(async (req, res, next) => {
  const {
    items,
    envioInfo,
    precioItems,
    precioImpuesto,
    precioEnvio,
    precioTotal,
    pagoInfo,
  } = req.body;

  const order = await Order.create({
    items,
    envioInfo,
    precioItems,
    precioImpuesto,
    precioEnvio,
    precioTotal,
    pagoInfo,
    fechaPago: Date.now(),
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    order
  });
});


//ver una orden

exports.getOneOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate("user", "nombre email");//retriccion de usuario

  if (!order) {
    return next(new ErrorHandler("No encontramos una orden con ese id",404))
  }
  
  res.status(200).json({
    success: true,
    order
  })
}),

//VER TODAS MIS ORDENES 
exports.myOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find({ user: req.user.id });
  
  res.status(200).json({
    success: true,
    orders
  });
})

//ADMIN
//VER TODAS LAS ORDENES ADMINISTRADOR
exports.allOrders = catchAsyncErrors(async (req, res, next) => {
  const orders = await Order.find()
    
    let cantidadTotal = 0;
    orders.forEach(order => {
    cantidadTotal =+ order.precioTotal      
  })

   res.status(200).json({
     success: true,
     orders,
   });
})

//EDITAR UN PEDIDO ADMIN
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Orden no encontrada", 404));
  }
  if (order.estado === "Enviado") {
    return next(new ErrorHandler("Esta orden ya fue enviada", 404));
  }

  //Restamos del inventario
  if (req.body.estado !== "Procesando") {
    order.items.forEach(async (item) => {
      await updateStock(item.producto, item.cantidad);
    });
  }
  
  order.estado = req.body.estado;
  order.fechaEnvio = Date.now();

  await order.save();

  res.status(200).json({
    success: true,
    order,
  });
})

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.inventario = product.inventario - quantity;
  await product.save({validateBeforeSave: false})
}


//ELIMINAR UNA ORDEN (ADMIN)
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    return next(new ErrorHandler("Esa orden no esta registrada"),400)
  }

  await order.remove()

  
  res.status(200).json({
    success: true,
    message:"Orden eliminada correctamente",
  });

})