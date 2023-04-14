import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer/Footer'
import Nav from '../components/Nav/Nav'
import SidebarMotion from '../components/Sidebar/SidebarMotion'
import { toggleSideMenu } from '../features/utils/uiSlice'

const Admin = () => {
  const dispatch = useDispatch()
  const { sideMenuOpen } = useSelector((state) => state.ui)
  const toggleMenu = () => {
    dispatch(toggleSideMenu())
  }

  return (
    <>
      <div className="layout-wrapper layout-content-navbar">
        <div className="layout-container">
          <SidebarMotion />

          <div className="layout-page">
            <Nav />

            <div className="content-wrapper">
              <Outlet />

              <Footer />

              <div className="content-backdrop fade"></div>
            </div>
          </div>
        </div>

        <div
          onClick={toggleMenu}
          className="layout-overlay layout-menu-toggle"
        ></div>
      </div>
    </>
  )
}

export default Admin
