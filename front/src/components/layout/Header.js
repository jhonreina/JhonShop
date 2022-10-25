import React, { Fragment } from 'react'

const Header = () => {
  return (
    <Fragment>
      <nav className="navbar navbar-expand-lg fixed-top py-3 p-sm-1 ">
        <div className='container'>
          <div className="col-12 col-md-3 text-center ">
            <div className="navbar-brand">
              <img
                src="./images/logo2.png"
                class="rounded mx-auto d-block"
                alt="logo"
              ></img>
            </div>
          </div>

          <div className="col-12 col-md-5 mt-0 p-0">
            <div class="input-group mx-auto">
              <input
                type="text"
                id="search_field"
                class="form-control me-2"
                placeholder="¿Que buscas?"
              ></input>
              <div class="input-group-append">
                <button id="search-btn" class="btn">
                  <i
                    class="fa fa-search-plus text-white fa-2x"
                    aria-hidden="true"
                  ></i>
                </button>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-4 mt-3 mt-md-0 d-flex justify-content-around p-0">
            <button
              className="btn pt-0 text-black"
              id="login_btn"
            >
              Inicie Sesión
            </button>
            <div class="d-flex justify-content-center">
              <i
                class="fa fa-shopping-cart fa-2x text-white me-2"
                aria-hidden="true"
              ></i>
              <span className="ml-1 m-1" id="cart_count">
                2
              </span>
            </div>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Header
