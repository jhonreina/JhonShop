import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import { useAlert } from "react-alert";
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { MDBDataTable } from 'mdbreact';
import { Link } from 'react-router-dom';

function ProductList() {

        const {loading, productos, error} = useSelector(state => state.products)
        const alert = useAlert(); 
        const dispatch = useDispatch();
    
        useEffect(() => {
        if (error) {
        return alert.error(error)
        }
        dispatch(getProducts());       
        }, [dispatch]);
    
    const setProducts = () => {
        const data = {
          columns: [
            {
              label: "ID",
              field: "id",
              sort: "asc",
            },
            {
              label: "Nombre",
              field: "nombre",
              sort: "asc",
            },
            {
              label: "Precio",
              field: "precio",
              sort: "asc",
            },
            {
              label: "Inventario",
              field: "inventario",
              sort: "asc",
            },
            {
              label: "Acciones",
              field: "actions",
            },
          ],
          rows: [],
        };
        productos.forEach(producto => {
            data.rows.push({
              id: producto._id,
              nombre: producto.nombre,
              precio: `$${producto.precio}`,
              inventario: producto.inventario,
              actions: (
                <Fragment>
                  <Link
                    to={`/producto/${producto._id}`}
                    className="btn btn-primary py-1 px-2"
                  >
                    <i className="fa fa-eye"></i>
                  </Link>
                  <Link to="/" className="btn btn-warning py-1 px-2">
                    <i class="fa fa-pencil"></i>
                  </Link>

                  <Link to="/" className="btn btn-danger py-1 px-2">
                    <i className="fa fa-trash"></i>
                  </Link>
                </Fragment>
              ),
            });
        });
        return data;
    }
    
  return (
    <Fragment>
      <MetaData title={"Todos los productos"}></MetaData>
      <div className="row">
        <div className="col-12 col-md-3">
          <Sidebar />
        </div>
        <div className="col-12 col-md-9">
          <Fragment>
            <h2 className="my-5">Productos Registrados</h2>
            {loading ? (
              <h5>
                Cargando...<i class="fa fa-cog fa-spin fa-3x fa-fw loading"></i>
              </h5>
            ) : (
              <MDBDataTable
                data={setProducts()}
                className="px-3 table-responsive"
                bordered
                striped
                hover
              ></MDBDataTable>
            )}
          </Fragment>
        </div>
      </div>
    </Fragment>
  );
}

export default ProductList

