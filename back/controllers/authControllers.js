const User = require("../models/auth")
const ErrorHandler = require("../utils/errorHandler")
const catchAsyncErrors=require("../middleware/catchAsyncErrors");
const tokenEnviado = require("../utils/jwtToken");
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const cloudinary=require("cloudinary")


// Registrar nuevo usuario /api/usuario/registro

exports.registroUsuario = catchAsyncErrors(async(req, res, next)=> {
    const { nombre, email, password } = req.body;
    
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        width: 240,
        crop:"scale"
        
    })

    const user = await User.create({
        nombre,
        email,
        password,
        avatar: {
            public_id:result.public_id,
            url:result.secure_url       
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
    const resetUrl = `${req.protocol}://${req.get('host')}/resetPassword/${resetToken}`;

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

//ver perfil de usuario(usuario que esta logueado)
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user
    })
})

//update contraseña (usuario logueado)
exports.updatePassword = catchAsyncErrors(async (req, res, next) =>{
    const user = await User.findById(req.user.id).select("+password");

    //Revisamos si la contraseña vieja es igual a la nueva
    const sonIguales = await user.compararPass(req.body.oldPassword)

    if (!sonIguales){
        return next (new ErrorHandler("La contraseña actual no es correcta", 401))
    }

    user.password = req.body.newPassword;
    await user.save();

    tokenEnviado(user,200,res)
})
    

//Update perfil de usuario(loqueado)
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
    //Actualizar el email por user a desicion de cada uno
    const newData = {
        nombre: req.body.nombre,
        email:req.body.email
    }

    //update avatar
    if (req.body.avatar!=="") {
        const user = await User.findById(req.user.id)
        const image_id = user.avatar.public_id;
        const res = await cloudinary.v2.upload.destroy(image_id);

        const result = await cloudinary.v2.uploader.upload(req, body.avatar, {
            folder: "avatars",
            width: 240,
            crop:"scale"
        })
        newUserData.avatar = {
            public_id: result.public_id,
            url:result.secure_url
        }
    }

    const user = await User.findByIdAndUpdate(req.user.id, newData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        user
    })
})

//servicios controladores  sobre usuarios por parte de los ADMIN

//VER todos los usuarios
exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users
    })
})

//ver el detalle de un usuario
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);    

    if (!user) {
        return next(new ErrorHandler(`No se ha encontrado ningun usuario con el id: ${req.params.id}`))
    }

    res.status(200).json({
        success: true,
        user
    })
})

//actualizar perfil de usuario (como administrador)
exports.upDateUser = catchAsyncErrors(async (req, res, next) => {
    const nuevaData = {
        nombre:req.body.nombre,
        email: req.body.email,
        role: req.body.rol
    }

    const user = await User.findByIdAndUpdate(req.params.id, nuevaData,{
        new: true,
        runValidators: true,
        useFindAndModify:false
    })

     res.status(200).json({
        success: true,
        user
    })
})


//eliminar usuario
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`Usuario con id: ${req.params.id} no se encuentra en nuestra base de datos`))
    }
    await user.remove();

    res.status(200).json({
        success: true,
        massage:"Usuario eliminado correctamente"
    })
})


