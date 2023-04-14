import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import AdminOnly from './components/AdminOnly'
import Private from './components/Private'
import Public from './components/Public'
import useAuthCheck from './hook/useAuthCheck'
import Admin from './layouts/Admin'
import Content from './views/admin/Content'
import Page from './views/admin/Page'
import JoinedToday from './views/admin/user/JoinedToday'
import Users from './views/admin/user/Users'
import Login from './views/auth/Login'
import Register from './views/auth/Register'
import Index from './views/frontend/Index'

function App() {
  const authChecked = useAuthCheck()

  return !authChecked ? ('Checking authentication') : (
    <Routes>
      <Route path="/" exact element={<Public><Index /></Public>} />
      <Route path="/login" exact element={<Public><Login /></Public>} />
      <Route path="/register" exact element={<Public><Register /></Public>} />
      <Route path="/admin" exact element={<Private><Admin /></Private>} >
        <Route path="" element={<Content />} />
        <Route path="user" exact element={<AdminOnly><Users /></AdminOnly>} />
        <Route exact path="user/joined-today" element={<AdminOnly><JoinedToday /></AdminOnly>} />
        <Route path="page" element={<Page />} />
        <Route path="*" element={<Navigate  to="/admin" />} />
      </Route>
      <Route path='*' element={<Navigate  to="/" />} />
    </Routes>
  )
}

export default App
