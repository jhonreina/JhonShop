import React, { Fragment, useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MetaData from '../layout/MetaData';
import { useParams } from 'react-router-dom';
import { clearErrors, getProductDetails } from '../../actions/productsActions';
import { useAlert } from "react-alert";
import { Carousel } from 'react-bootstrap'

const ProductDetails = () => {
  const { loading, product, error } = useSelector(
    (state) => state.productDetails
  );
  const { id } = useParams();
  const dispatch = useDispatch();
  const alert = useAlert();
  const [quantity, setQuantity]= useState(1)

  useEffect(() => {
    dispatch(getProductDetails(id));
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [dispatch, alert, error, id]);

  const increaseQty = () => {
    const contador = document.querySelector('.count')
    if (contador.valueAsNumber >= product.inventario) return; 

    const qty = contador.valueAsNumber + 1;
    setQuantity(qty)
      
  }

  const decreaseQty = () => {
    const contador = document.querySelector('.count')
    if (contador.valueAsNumber <= 1) return; 

    const qty = contador.valueAsNumber - 1  ;
    setQuantity(qty)

  }

  return (
    <Fragment>
      {loading ? (
        <h5>
          Cargando...<i class="fa fa-cog fa-spin fa-3x fa-fw loading"></i>
        </h5>
      ) : (
        <Fragment>
          <MetaData title={product.nombre}></MetaData>
          <div className="row d-flex justify-content-around mt-5">
            <div
              className="col-12 col-lg-5 border-warning"
              id="imagen_producto"
            >
              <Carousel pause="hover">
                {product.imagen &&
                  product.imagen.map((img) => (
                    <Carousel.Item key={img.public_id}>
                      <img
                        className="d-block w-100"
                        src={"../" + img.url}
                        alt={product.nombre}
                      ></img>
                    </Carousel.Item>
                  ))}
              </Carousel>
            </div>
            <div className="col-12 col-lg-5">
              <h3>{product.nombre}</h3>
              <p id="product_id">ID del Producto {product._id}</p>
              <hr></hr>

              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(product.calificacion / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_de_opi niones">
                {" "}
                ({product.numCalificacaiones}Reviews)
              </span>
              <hr></hr>
              <p id="precio_producto">${product.precio}</p>
              <div className="stockCounter d-inline">
                <span className="btn btn-danger minus" onClick={decreaseQty}>-</span>
                <input
                  type="number"
                  className="form-control count d-inline"
                  value={quantity}
                  readOnly
                ></input>
                <span className="btn btn-success plus" onClick={increaseQty}>+</span>
              </div>
              <button
                type="button"
                id="carrito_btn"
                className="btn btn-primary bg-warning ml-4"
                disabled={product.inventario === 0}
              >
                Agregar al carrito
              </button>
              <hr />
              <p>
                Estado:{" "}
                <span
                  id="stock_stado"
                  className={product.inventario > 0 ? "greenColor" : "redColor"}
                >
                  {product.inventario > 0 ? "En existencia" : "Agotado"}
                </span>
              </p>
              <hr></hr>
              <h4 className="mt-2">Descripción:</h4>
              <p>{product.descripcion}</p>
              <hr />
              <p id="vendedor">
                Vendido por: <strong>{product.vendedor}</strong>
              </p>
              <button
                id="btn-review"
                type="button"
                className="btn btn-primary mt-4 bg-warning"
                data-toggle="modal"
                data-target="#ratingModal"
              >
                Deja tu opinión
                </button>
                <div className='alert alert-danger mt-5' type='alert'>Inicia Sesión para dejar tu review</div>

              {/*mesaje emergente para dejar opinion y calificacion}*/}
              <div className="row mt-2 mb-5">
                <div className="rating w-50">
                  <div
                    className="modal fade"
                    id="ratingModal"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="ratingModalLabel"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="ratingModalLabel">
                            Enviar Review
                          </h5>
                          <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="close"
                          >
                            <span arial-hidden="true">&times;</span>
                          </button>
                        </div>
                        <div className="modal-body d-flex flex-column">
                          <ul className="stars flex-wrap justify-content-center">
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                            <li className="star">
                              <i className="fa fa-star"></i>
                            </li>
                          </ul>

                          <textarea
                            name="review"
                            id="review"
                            className="form-control mt-5 mt-sm-2"
                          ></textarea>
                        </div>
                        <div className="d-grid gap-2 d-flex justify-content-end">
                          <button className="btn btn-primary bg-warning mx-3 mb-3" type="button">
                            Enviar
                          </button>                          
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails
