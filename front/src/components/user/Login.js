import React, { Fragment, useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import { login, clearError } from '../../actions/userActions';
import { useDispatch, useSelector } from 'react-redux';  

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      dispatch(clearError);
    }
  },[dispatch, isAuthenticated, navigate, error]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <Fragment>
      {loading ? (
        <h5>
          Cargando...<i class="fa fa-cog fa-spin fa-3x fa-fw loading"></i>
        </h5>
      ) : (
        <Fragment>
          <MetaData title={"Inicio de Sesión"}></MetaData>
          <div className="row wrapper">
            <div className="col-10 col-lg-5">
              <form className="shadow-lg" onSubmit={submitHandler}>
                <h1 className="mb-3">Inicio Sesión</h1>
                {/*campo para email*/}
                <div className="form-group">
                  <label htmlFor="email_field">Correo Electrónico</label>
                  <input
                    type="email"
                    id="email_field"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  ></input>
                </div>
                {/*campo para email*/}
                <div className="from-group">
                  <label htmlFor="password_field">Contraseña</label>
                  <input
                    type="password"
                    id="password_field"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></input>
                </div>
                <Link to="/password/forgot" className="float-right mb-3">
                  Olvide mi Contraseña!
                </Link>
                {/*boton*/}
                <button
                  id="login_button"
                  type="submit"
                  className="btn btn-yellow btn-block py-3"
                >
                  LOGIN
                </button>

                <Link to="/register" className="float-right mt-2 mb-3">
                  Registrese aqui
                </Link>
              </form>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login
