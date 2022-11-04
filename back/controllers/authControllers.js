const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");


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

    
    tokenEnviado(user,201,res)
})


//Iniciar session - lOGIN

exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    //revisar si los campos estan completos
    if (!email||!password) {
        return next(new ErrorHandler("Por favor ingrese Email & Contraseña",400))
    }

    //Buscar al usuario en nuestra base de datos
    const user = await User.findOne({ email }).select("+password")
    
    if (!user) {
        return next(new ErrorHandler("Email o Contraseña invalidos",401))
    }

    //comparar contraseña,verificar si esta bien
    const contrasenaOK = await user.compararPass(password);

    if (!contrasenaOK) {
        return next(new ErrorHandler("Contraseña invalida",401))
    }
    
    tokenEnviado(user, 200, res);
})
