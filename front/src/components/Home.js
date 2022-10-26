import React, { Fragment, useEffect } from 'react'
import MetaData from './layout/MetaData';
import { useDispatch } from 'react-redux';
import { getProducts } from '../actions/productsActions';

const Home = () => {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducts());
    }, [dispatch])

  return (
    <Fragment>
      <MetaData title="Todo a tu alcance"></MetaData>
      <h1 id="encabezado_productos" className="encabezado text-center">
        Ultimos Productos
      </h1>
      <section id="productos" className="container mt-2">
        <div className="row">
          {/* producto 1 */}
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <div className="card mt-3 mt-md-0 p-3 rounded badge text-center">
              <img
                className="card-img-top mx-auto"
                src="./images/5.jpg"
                alt="producto"
              ></img>
              <div className="card-body d-flex  flex-column p-0 mt-1">
                <h3 className="card-title" id="titulo_producto">
                  <a href="http://localhost:3000">Adidas</a>
                </h3>
                <div className="rating mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_de_opiniones" className="text-left">
                    {" "}
                    5 reviews
                  </span>
                </div>
                <p className="card-text m-0 my-2 text-left">$210.000</p>
                <a
                  href="http:/3000/home"
                  id="view_btn"
                  className="btn btn-block"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
          {/* producto 2        */}
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <div className="card p-3 mt-3 mt-md-0 rounded badge text-center">
              <img
                className="card-img-top mx-auto"
                src="./images/2.jpg"
                alt="producto"
              ></img>
              <div className="card-body d-flex  flex-column p-0 mt-1   ">
                <h3 className="card-title" id="titulo_producto">
                  <a href="http:/3000/home">Adidas</a>
                </h3>
                <div className="rating mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_de_opiniones"> 5 reviews</span>
                </div>
                <p className="card-text m-0 my-2 text-left">$180.000</p>
                <a
                  href="http:/3000/home"
                  id="view_btn"
                  className="btn btn-block"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
          {/* producto 3       */}
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <div className="card p-3 mt-3 mt-md-0 rounded badge text-center">
              <img
                className="card-img-top mx-auto"
                src="./images/3.jpg"
                alt="producto"
              ></img>
              <div className="card-body d-flex  flex-column p-0 mt-1   ">
                <h3 className="card-title" id="titulo_producto">
                  <a href="http:/3000/home">Sudaderas</a>
                </h3>
                <div className="rating mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_de_opiniones"> 5 reviews</span>
                </div>
                <p className="card-text m-0 my-2 text-left">$150.000</p>
                <a
                  href="https:/3000/home"
                  id="view_btn"
                  className="btn btn-block"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
          {/* producto 4      */}
          <div className="col-12 col-md-6 col-lg-3 my-2">
            <div className="card p-3 mt-3 mt-md-0 rounded badge text-center">
              <img
                className="card-img-top mx-auto"
                src="./images/4.jpg"
                alt="producto"
              ></img>
              <div className="card-body d-flex  flex-column p-0 mt-1   ">
                <h3 className="card-title" id="titulo_producto">
                  <a href="https:/3000/home">Chaquetas</a>
                </h3>
                <div className="rating mt-auto">
                  <div className="rating-outer">
                    <div className="rating-inner"></div>
                  </div>
                  <span id="no_de_opiniones"> 5 reviews</span>
                </div>
                <p className="card-text m-0 my-2 text-left">$160.000</p>
                <a
                  href="https:/3000/home"
                  id="view_btn"
                  className="btn btn-block"
                >
                  Ver detalle
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default Home
