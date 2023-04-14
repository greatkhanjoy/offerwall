import React from 'react'
import { useDispatch } from 'react-redux'
import { userLoggOut } from '../../features/auth/authSlice'
import { toggleSideMenu } from '../../features/utils/uiSlice'


const Nav = () => {
  const dispatch = useDispatch()
  const togglemenu = () => {
    dispatch(toggleSideMenu())
  }

  const logout = () => {
    dispatch(userLoggOut())
  }
  return (
    <nav
    className="layout-navbar container-fluid navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
    id="layout-navbar"
  >


    <div
      className="navbar-nav-right d-flex align-items-center"
      id="navbar-collapse"
    >
      <div className="navbar-nav align-items-center">
        <div className="nav-item d-flex align-items-center">
          <i className="bx bx-search fs-4 lh-0"></i>
          <input
            type="text"
            className="form-control border-0 shadow-none"
            placeholder="Search..."
            aria-label="Search..."
          />
        </div>
      </div>

      <ul className="navbar-nav flex-row align-items-center ms-auto">
        <li className="nav-item lh-1 me-3">
          <a
            className="github-button"
            href="https://github.com/themeselection/sneat-html-admin-template-free"
            data-icon="octicon-star"
            data-size="large"
            data-show-count="true"
            aria-label="Star themeselection/sneat-html-admin-template-free on GitHub"
          >
            Star
          </a>
        </li>

        <li className="nav-item navbar-dropdown dropdown-user dropdown">
          <a
            className="nav-link dropdown-toggle hide-arrow"
            href="/"
            data-bs-toggle="dropdown"
          >
            <div className="avatar avatar-online">
              <img
                src="../assets/img/avatars/1.png"
                alt="avatar"
                className="w-px-40 h-auto rounded-circle"
              />
            </div>
          </a>
          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <a className="dropdown-item" href="#">
                <div className="d-flex">
                  <div className="flex-shrink-0 me-3">
                    <div className="avatar avatar-online">
                      <img
                        src="../assets/img/avatars/1.png"
                        alt="avatar"
                        className="w-px-40 h-auto rounded-circle"
                      />
                    </div>
                  </div>
                  <div className="flex-grow-1">
                    <span className="fw-semibold d-block">John Doe</span>
                    <small className="text-muted">Admin</small>
                  </div>
                </div>
              </a>
            </li>
            <li>
              <div className="dropdown-divider"></div>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bx bx-user me-2"></i>
                <span className="align-middle">My Profile</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <i className="bx bx-cog me-2"></i>
                <span className="align-middle">Settings</span>
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="#">
                <span className="d-flex align-items-center align-middle">
                  <i className="flex-shrink-0 bx bx-credit-card me-2"></i>
                  <span className="flex-grow-1 align-middle">
                    Billing
                  </span>
                  <span className="flex-shrink-0 badge badge-center rounded-pill bg-danger w-px-20 h-px-20">
                    4
                  </span>
                </span>
              </a>
            </li>
            <li>
              <div className="dropdown-divider"></div>
            </li>
            <li>
              <span onClick={logout} className="dropdown-item cursor-pointer">
                <i className="bx bx-power-off me-2"></i>
                <span className="align-middle">Log Out</span>
              </span>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
  )
}

export default Nav