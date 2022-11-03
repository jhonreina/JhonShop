import { Carousel } from "react-bootstrap";

function CarouselsImg() {
  return (
    <Carousel fade className="shadow-lg bg-black">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5 className="bg-warning p-0">Tenis de las mejores marcas</h5>
          <p className="text-warning">Nike, Adidas, Puma, New Balance, Le Coq Sportif y más.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis2.jpg"
          alt="Second slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis4.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis5.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/tenis6.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/sudaderas1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 className="bg-warning p-0">Sudaderas Deportivas</h5>
          <p className="text-warning">De los mejores clubes y paises de futbol.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/sudaderas2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/chaquetas1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 className="bg-warning p-0">Chaquetas</h5>
          <p className="text-text-warning">
            Masculinas y Femeninas, con los mejores materiales y las marcas.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/chaquetas2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/chaquetas3.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/chaquetas4.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/bolsos1.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5 className="bg-warning p-0">Bolsos de las mejores marcas</h5>
          <p className="text-warning">
            Chanel, Hermès, Dior, Louis Vuitton, Gucci, Carolina Herrera y más.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/images/carousel/bolsos2.jpg"
          alt="Third slide"
        />
        <Carousel.Caption></Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselsImg;
