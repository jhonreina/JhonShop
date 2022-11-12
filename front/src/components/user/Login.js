import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import MetaData from '../layout/MetaData'

const Login = () => {
  return (
      <Fragment>
          <MetaData title={"Inicio de Sesión"}></MetaData>
          <div className='row wrapper'>
              <div className='col-10 col-lg-5'>
                  <form className='shadow-lg'>
                    <h1 className='mb-3'>Inicio Sesión</h1>
                     {/*campo para email*/} 
                      <div className='form-group'>
                        <label htmlFor='email_field'>Correo Electrónico</label>
                        <input type='email' id='email_field' className='form-control'></input>                          
                      </div>
                     {/*campo para email*/} 
                      <div className='from-group'>
                          <label htmlFor='password_field'>Contraseña</label>
                          <input type='password' id='password_field' className='form-control'></input>
                      </div>
                      <Link to='/password/forgot' className='float-right mb-3'>Olvide mi Contraseña!
                      </Link>
                      {/*boton*/}
                      <button id='login_button' type='submit' className='btn btn-block py-3'>LOGIN</button>

                      <Link to='/register' className='float-right mt-2 mb-3'>Registrese aqui</Link>
                  </form>
            </div>              
          </div>
    </Fragment>
  )
}

export default Login
