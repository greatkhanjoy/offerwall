import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useLoginMutation } from '../../features/auth/authApi'
const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading, isError, error:errorMessage, isSuccess }] = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(false)
  const [error, setError] = useState('')

  const formHandler = (e) => {
    e.preventDefault()
    if(!email || !password){
      setError('Please fill all the fields')
      return
  }
    //Dispatch login action
    login({ email, password })
  }

    useEffect(() => {
        if (isError) {
            setError(errorMessage.data.message)
            
        }
 
        if (isSuccess) {
          console.log('success')
            setError('')
            navigate('/admin')
        } 
    }, [navigate, isError, isSuccess, errorMessage])


  return (
    <div className="container-xxl">
    <div className="authentication-wrapper authentication-basic container-p-y">
      <div className="authentication-inner">
        
        <div className="card">
          <div className="card-body">
            
            <div className="app-brand justify-content-center">
              <Link to={'/'} className="app-brand-link gap-2">
                <span className="app-brand-text demo text-body fw-bolder">Offerwall</span>
              </Link>
            </div>
            
            <h4 className="mb-2">Welcome to Offerwall! 👋</h4>
            <p className="mb-4">Please sign-in to your account and start the adventure</p>
            <p className='text-center red'>{error && `${error}`}</p>

            <form id="formAuthentication" className="mb-3" onSubmit={formHandler}  method="POST">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email or Username</label>
                <input
                  type="text"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email-username"
                  placeholder="Enter your email or username"
                  autoFocus
                />
              </div>
              <div className="mb-3 form-password-toggle">
                <div className="d-flex justify-content-between">
                  <label className="form-label" htmlFor="password">Password</label>
                  <Link to={'/forgot-password'}>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    name="password"
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                  />
                  <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input className="form-check-input" checked={remember} onChange={() => setRemember(!remember)} type="checkbox" id="remember-me" />
                  <label className="form-check-label" htmlFor="remember-me"> Remember Me </label>
                </div>
              </div>
              <div className="mb-3">
                <button typeof='submit' disabled={isLoading} className="btn btn-primary d-grid w-100" type="submit">{isLoading ? 'Signing in...' : 'Sign in'}</button>
              </div>
            </form>

            <p className="text-center">
              <span>New on our platform?</span>
              <Link to={'/register'}>
                <span>Create an account</span>
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default Login