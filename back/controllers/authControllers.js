const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto')


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

//cerrar sesion (loyout)
exports.logOut = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly:true
    })

    res.status(200).json({
        success: true,
        message: "Cerró sesión"
    })
})

//olvide mi contraseña,recuperar contraseañ
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
        return next(new ErrorHandler("Usuario no se encuentra registrado",404))
    }
    const resetToken = user.genResetPasswordToken();

    await user.save({ validateBeforeSave: false })
    
    //crear una url para hacer el reset de la contraseña
    const resetUrl = `${req.protocol}://${req.get('host')}/api/resetPassword/${resetToken}`;

    const mensaje = `Hola!\n\nTu link para ajustar una nueva contraseña es: \n\n${resetUrl}\n\n si no lo solicitaste este link, por favor comunicate con soporte.\n\n att:\nJhonShop Store`
    
    try {
        await sendEmail({
            email: user.email,
            subject: "JhonShop Recuperacion de la contraseña",
            mensaje
        })
        res.status(200).json({
            success: true,
            message:`correo enviado a:${user.email}` 
        })
    } catch (error) {
        user.resetPasswordToken=undefined;
        user.resetPasswordExpire = undefined;
        
        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message,500))
    }
})

//Resetear la contraseña
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    //Hash el token que llego con el URL
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    //buscamos usuario al que vamos a resetear la contraseña
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    //el usuario si esta en la base de datos
    if (!user) {
        return next(new ErrorHandler("El token es invalido o ya expiró",400))
    }
    //diligensiamos bien los campos
    if (req.body.password!==req.body.confirmPassword) {
        return next(new ErrorHandler("Contraseñas no coinciden", 400));        
    }

    //setear la nueva contraseña
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    tokenEnviado(user, 200, res);

})
