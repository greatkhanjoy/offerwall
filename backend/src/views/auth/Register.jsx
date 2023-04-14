import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useRegisterMutation } from '../../features/auth/authApi'

const Register = () => {
    const navigate = useNavigate()
    const [register, { isLoading, isError, isSuccess, error:errorMessage }] = useRegisterMutation()
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [agree, setAgree] = useState(false)
    const [error, setError] = useState('')

    const formHandler = (e) => {
        e.preventDefault()
        if(!name || !email || !password || !agree){
            setError('Please fill all the fields')
            return
        }
        //Dispatch register action 
        register({name, email, password})
    }

    useEffect(() => {
      if(isError){
        setError(errorMessage.data.message)
      }

      if(isSuccess){
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
            
            <h4 className="mb-2">Adventure starts here 🚀</h4>
            <p className="mb-4">Make your app management easy and fun!</p>

            <p className='text-center red'>{error && (`${error}`)}</p>

            <form id="formAuthentication" className="mb-3" onSubmit={formHandler} method="POST">
              <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                  type="text"
                  value={name}
                    onChange={(e) => setName(e.target.value)}
                  className="form-control"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="email" name="email" placeholder="Enter your email" required autoFocus/>
              </div>
              <div className="mb-3 form-password-toggle">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="input-group input-group-merge">
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    name="password"
                    required
                    placeholder="&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;&#xb7;"
                    aria-describedby="password"
                  />
                  <span className="input-group-text cursor-pointer"><i className="bx bx-hide"></i></span>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input 
                    className="form-check-input" 
                    type="checkbox" 
                    checked={agree}
                    onChange={(e) => setAgree(!agree)}
                    id="terms-conditions" 
                    required
                    name="terms" />
                  <label className="form-check-label" htmlFor="terms-conditions">
                    I agree to
                    <Link to={'/'}>privacy policy & terms</Link>
                  </label>
                </div>
              </div>
              <button disabled={isLoading} type='submit' className="btn btn-primary d-grid w-100">{isLoading ? 'Signing up...' : 'Sign up'}</button>
            </form>

            <p className="text-center">
              <span>Already have an account?</span>
              <Link to={'/login'}>
                <span>Sign in instead</span>
              </Link>
            </p>
          </div>
        </div>
        
      </div>
    </div>
  </div>
  )
}

export default Register