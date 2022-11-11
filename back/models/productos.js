const mongoose = require("mongoose");

const productsSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: [true, "Por favor registra el nombre del producto."],
        trim: true,
        maxLength:[100,"El nombre del producto no debe exder los 100 catacteres"]
    },
    precio: {
        type: Number,
        required: [true, "Por favor registre el precio del producto."],
        maxLength: [7, "El precio del producto no puede estar por encima de 9.999.999"],
        default:0.0        
    },
    descripcion: {
        type: String,
        required: [true, "Por favor registre una descripcion del producto."],
    },
    calificacion: {
        type: Number,
        default: 0
    },
    imagen: [
        {
            public_id: {
                type: String,
                required: true,                
            },
            url: {
                type: String,
                required: true  
            }
        }
    ],
    categoria: {
        type: String,
        required:[true,"Por favor seleccione la categoria del producto."],
        enum: {
            values: [
                "Tenis",
                "Sudaderas",
                "Camisetas",
                "Chaquetas",
                "Bolsos",
                "Accesorios"
            ]
        }
    },
    vendedor: {
        type: String,
        required:[true,"Por favor registre el vendedor del producto"]
    },
    inventario: {
        type: Number,
        required: [true, "por favor registre el stock del producto"],
        maxLength:[2,"Cantidada maxima no puede sobre pasar 99"],
        default:0
    },
    numCalificacaiones: {
        type: Number,
        default:0
    },
    opiniones: [
        {
            nombreCliente: {
                type: String,
                require:true,
            },
            rating: {
                type: Number,
                required:true
            },
            comentario: {
                type: String,
                required:true
            }
        }
    ],
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    fechaCreacion: {
        type: Date,
        default:Date.now
    }
})

module.exports = mongoose.model("productos", productsSchema);