const ErrorHandler = require('../utils/errorHandler')

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal server Error"

    res.status(err.statusCode).json({
        success: false,
        message: err.stack
    })

    //Error de clave duplicada en mongoose
    if (err.code===11000) {
        const message=`Clave duplicada${Object.keys(err.keyValue)}`
        error=new ErrorHandler(message,400)
    }
    
    //error en JWT
    if (err.name==="JsonWebTokenError") {
        const message="Token de Json web es inavlido, intentelo de nuevo!"
        error=new ErrorHandler(message,400)
        
    }
    //JWT TOKEN EXPIRADO
    if (err.name==="TokenExpiredError") {
        const message="El token de JTW esta vencido, ya expiró. Intentelo de nuevo!"
        error=new ErrorHandler(message,400)        
    }
}