import React, { Fragment } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Search from "./Search";
import { logout } from "../../actions/userActions"

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success("LogOut Exitoso")
  }
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg sticky-top py-3 p-sm-1">
        <div className="container">
          <div className="col-12 col-md-6 col-lg-2 text-center ">
            <div className="navbar-brand">
              <Link to="/">
                <img
                  src="../images/logo2.png"
                  class="rounded mx-auto d-block"
                  alt="logo"
                ></img>
              </Link>
            </div>
          </div>

          <div className="col-12 col-md-6 col-lg-6 mt-0 p-0 ">
            {/*AQUI VA BUSCAR*/}
            <Search />
          </div>
          <div className="col-12 col-md-6 col-lg-1 mt-2 d-flex justify-content-center">
            <Link to="/carrito" className="d-flex">
              <i
                class="fa fa-shopping-cart fa-2x text-white"
                aria-hidden="false"
              ></i>
              <span className="ml-1 m-1" id="cart_count">
                2
              </span>
            </Link>
          </div>
          {user ? (
            <div className="col-12 col-md-6 col-lg-3 p-0 mt-0 d-flex justify-content-center">
              <div className="mt-2 dropdown">
                <Link
                  to="#"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  id="dropDownMenu"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>{user && user.nombre}</span>
                  <figure className="avatar avatar-nav">
                    <img
                      src={user.avatar && user.avatar.url}
                      alt={user && user.nombre}
                      className="rounded-circle mx-2"
                    ></img>
                  </figure>
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropDownMenu">
                  {/*preguntamos el rol de quien esta online*/}
                  {user && user.role === "admin" && (
                    <Link className="dropdown-item" to="/dashboard">
                      {" "}
                      Admin. Productos{" "}
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/">
                    Pedidos
                  </Link>
                  <Link className="dropdown-item" to="/userLogin">
                    Mi Perfil
                  </Link>
                  <Link
                    className="dropdown-item"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Cerrar sesion
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            !loading && (
              <Link to="/login" className="btn ml-0" id="login_btn">
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
