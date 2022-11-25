import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productsActions";
import { Link, useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import CarouselsImg from "../components/CarouselsImg";
import Pagination from "react-js-pagination";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const Home = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [precio, setPrecio] = useState([100000, 400000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { loading, products, error, resPerPage, productsCount } = useSelector(
    (state) => state.products
  );
  const alert = useAlert();

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      return alert.error(error);
    }
    dispatch(getProducts(currentPage, keyword, precio));
  }, [dispatch, alert, error, currentPage, keyword, precio]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

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
              {products &&
                products.map((articulo) => (
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
            <br></br>
            <div className="col-5 d-flex mx-auto">
              <Slider
                range
                railStyle={{ backgroundColor: 'yellow'}}
                className="t-slider"
                marks={{
                  100000: `$100000`,
                  400000: `$400000`,
                }}
                min={100000}
                max={400000}
                defaultValue={[100000, 400000]}
                tipFormatter={(value) => `$${value}`}
                tipProps={{
                  placement: "top",
                  prefixCls: "rc-slider-tooltip",
                  visible: true,
                }}
                value={precio}
                onChange={(precio) => setPrecio(precio)}
              ></Slider>
            </div>
          </section>
          <div className="d-flex justify-content-center mt-5 btn-black">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText={"Siguiente"}
              prevPageText={"Anterior"}
              firstPageText={"Primera"}
              lastPageText={"Ultima"}
              itemClass="page-item"
                linkClass="page-link"
                className="paginacion"
            ></Pagination>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
