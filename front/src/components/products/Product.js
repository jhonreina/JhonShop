import React from 'react'
import { Link } from 'react-router-dom';

const Product = ({articulo}) => {
  return (
    <div>
      <div className="col-12 col-md-6 col-lg-3 my-2">
        <div className="card mt-3 mt-md-0 p-3 rounded badge">
          <img
            className="card-img-top mx-auto"
            src={articulo.imagen[0].url}
            alt="producto"
          ></img>
          <div className="card-body d-flex  flex-column p-0 mt-1">
            <h3 className="card-title" id="titulo_producto">
              <Link to={`/producto/${articulo._id}`}>{articulo.nombre}</Link>
            </h3>
            <div className="rating mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{
                    width: `${(articulo.calificacion / 5) * 100}%`,
                  }}
                ></div>
              </div>
              <span id="no_de_opiniones" className="text-left me-2">
                {" "}
                {articulo.numCalificacaiones} Reviews
              </span>
            </div>
            <p className="card-text m-0 my-2 text-left">${articulo.precio}</p>
            <Link
              to={`producto/${articulo._id}`}
              id="view_btn"
              className="btn btn-block "
            >
              Ver detalle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product
