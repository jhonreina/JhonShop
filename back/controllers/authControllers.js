const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors")


// Registrar nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async(req, res, next)=> {
    const { nombre, email, password } = req.body;
    
    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id:"ANd9GcQnoVvrZEmOjmzb9jLY3n4F-9bvUa4p2745sQ&usqp",
            url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnoVvrZEmOjmzb9jLY3n4F-9bvUa4p2745sQ&usqp=CAU"
        }  
    })

    res.status(201).json({
        success: true,
        user
    })
})