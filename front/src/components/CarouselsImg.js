import React, { Fragment } from 'react'
import { Carousel } from 'react-bootstrap'
 

function CarouselsImg() {
  return (
    <Fragment>
      <Carousel>
        <div className="row">
          <div className="col-12 h-100">
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-bs-ride="carousel"
            >
              <div className="carousel-indicators">
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="0"
                  className="active"
                  aria-current="true"
                  aria-label="Slide 1"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="1"
                  aria-label="Slide 2"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="2"
                  aria-label="Slide 3"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="3"
                  aria-label="Slide 4"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="4"
                  aria-label="Slide 5"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="5"
                  aria-label="Slide 6"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="6"
                  aria-label="Slide 7"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="7"
                  aria-label="Slide 8"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="8"
                  aria-label="Slide 9"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="9"
                  aria-label="Slide 10"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="10"
                  aria-label="Slide 11"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="11"
                  aria-label="Slide 12"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="12"
                  aria-label="Slide 13"
                ></button>
                <button
                  type="button"
                  data-bs-target="#carouselExampleIndicators"
                  data-bs-slide-to="13"
                  aria-label="Slide 14"
                ></button>
              </div>
              <div className="carousel-inner mt-4 mt-sm-0 h-100">
                <div className="carousel-item active">
                  <img
                    src="/images/carousel/tenis1.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="text-bg-warning p-0">
                      Tenis de las mejores marcas
                    </h5>
                    <p>
                      Nike, Adidas, Puma, New Balance, Le Coq Sportif y más.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/tenis2.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/tenis3.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/tenis4.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/tenis5.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/tenis6.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/sudaderas1.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="text-bg-warning p-0">
                      Sudaderas deportivas
                    </h5>
                    <p>Los mejores clubes y paises de futbol.</p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/sudaderas2.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/chaquetas1.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="text-bg-warning p-0">Chaquetas</h5>
                    <p>
                      Masculinas y Femeninas, con los mejores materiales y
                      marcas.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/chaquetas2.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/chaquetas3.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/chaquetas4.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/bolsos1.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                  <div className="carousel-caption d-none d-md-block">
                    <h5 className="text-bg-warning p-0">
                      Bolsos de las mejores marcas
                    </h5>
                    <p>
                      Chanel, Hermès, Dior, Louis Vuitton, Gucci, Carolina
                      Herrera y más.
                    </p>
                  </div>
                </div>
                <div className="carousel-item">
                  <img
                    src="/images/carousel/bolsos2.jpg"
                    className="d-block w-100"
                    alt="..."
                  ></img>
                </div>
              </div>

              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </Carousel>
    </Fragment>
  );
}

export default CarouselsImg
