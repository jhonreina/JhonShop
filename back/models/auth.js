const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const crypto = require("crypto")


const usuarioSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor ingrese nombre"],
        maxlength: [120, "Nombre no puede exceder los 120 caracteres"]
    },
    
    email: {
        type: String,
        required: [true, "Por favor ingrese correo electronico"],
        unique: true,
        validate: [validator.isEmail, "Por favor ingrese un email valido"]
    },
    password: {
        type: String,
        required: [true, "Por favor ingrese una comtraseña"],
        minlength: [8, "Password no puede tener menos de 8 caracteres"],
        select: false
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    fechaRegistro: {
        type: Date,
        default: Date.now
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,
    
})
//   Encriptamos contraseña antes de guardarla
  usuarioSchema.pre("save", async function(next){
      if (!this.isModified("password")) {
            next()
      }
      this.password = await bcrypt.hash(this.password, 10)
  })

  //Decodificamos contraseñas y comparamos
    usuarioSchema.methods.compararPass = async function (passData) {
        return await bcrypt.compare(passData, this.password)
    } 

  //retornar un JWT token

    usuarioSchema.methods.getJwtToken = function () {
         return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
          expiresIn:process.env.JWT_TIEMPO_EXPIRACION
      })
}   
  
 //Generar un token para resetiar la contraseña
   usuarioSchema.methods.genResetPasswordToken =  function(){
      const resetToken = crypto.randomBytes(20).toString('hex');  

    //hashear y setear resetToken
       this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest('hex');
    //setear fecha de expiracion del token
       this.resetPasswordExpire = Date.now() + 30 * 60 * 1000 //el token dura 30 minitos
       
       return resetToken
 }

module.exports=mongoose.model("auth",usuarioSchema)