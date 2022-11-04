//crear y enviar un token guardado en cookie
const tokenEnviado = ( user, statuCode, res )=> {
    
    //creamos token
    const token = user.getJwtToken();

    //opciones  del token
    const Opciones = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRES_TIME*24*60*60*1000
        ),
        httpOnly:true
    }

    res.status(statuCode).cookie("token", token, Opciones).json({
        success: true,
        token,
        user
    })
}

module.exports = tokenEnviado;