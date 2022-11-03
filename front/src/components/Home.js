import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../actions/productsActions';
import { Link } from 'react-router-dom'
import { useAlert } from 'react-alert';
import CarouselsImg from "../components/CarouselsImg";




const Home = () => {

    const {loading, productos, error} = useSelector(state => state.products)
    const alert = useAlert(); 
    const dispatch = useDispatch();
  
    useEffect(() => {
    if (error) {
      return alert.error(error)
    }
    dispatch(getProducts());   
  }, [dispatch]);

  return (
    <Fragment>
      <CarouselsImg />
      {loading ? (
        <h5>
          Cargando...<i class="fa fa-cog fa-spin fa-3x fa-fw loading"></i>
        </h5>
      ) : (
        <Fragment>
          <MetaData title="Todo a tu alcance"></MetaData>

          <h1 id="encabezado_productos" className="mt-1 text-center">
            Ultimos Productos
          </h1>
          <section id="productos" className="container mt-2">
            <div className="row">
              {productos &&
                productos.map((articulo) => (
                  <div
                    key={articulo._id}
                    className="col-12 col-md-6 col-lg-3 my-2"
                  >
                    <div className="card mt-3 mt-md-0 p-3 rounded badge">
                      <img
                        className="card-img-top mx-auto"
                        src={articulo.imagen[0].url}
                        alt="producto"
                      ></img>
                      <div className="card-body d-flex  flex-column p-0 mt-1">
                        <h3 className="card-title" id="titulo_producto">
                          <Link to={`/producto/${articulo._id}`}>
                            {articulo.nombre}
                          </Link>
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
                        <p className="card-text m-0 my-2 text-left">
                          ${articulo.precio}
                        </p>
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
                ))}
            </div>
          </section>
        </Fragment>
      )}
    </Fragment>
  );
}

export default Home
