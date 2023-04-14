import React from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  return <div>
    <h1>Index</h1>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/login">Login</Link></li>
      <li><Link to="/admin">Admin</Link></li>
    </ul>
  </div>
}

export default Index
