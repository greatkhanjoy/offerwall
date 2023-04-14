import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { toggleSideMenu } from '../../features/utils/uiSlice'
import Items from './Items'

const SidebarMotion = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { sideMenuOpen } = useSelector((state) => state.ui)
    const menuToggle = () => dispatch(toggleSideMenu())
    const menuAnimate = {
        open: {
            width:'auto',
            opacity : 1,
            transition: {
                duration: 0.3,
            }
        },
        close: {
            width:0,
            opacity : 0,
            transition: {
                duration: 0.3,
            }
        }
    }
    const [menuItems, setMenuItems] = useState([
        {
          id: 1,
          name: 'Dashboard',
          icon: 'bx bx-tachometer',
          link: '/admin',
          subMenu: [],
        },
        {
          id: 2,
          name: 'Pages',
          icon: 'bx bx-dock-top',
          link: '/admin/page',
          subMenu: [
            {
              id: 1,
              name: 'Login',
              link: '/login',
              icon: 'bx bx-log-in',
            },
            {
              id: 2,
              name: 'Register',
              link: '/register',
             icon: 'bx bx-user-plus',
            },
          ],
        },
        {
          id: 3,
          name: 'User',
          icon: 'bx bx-user',
          link: '/admin/user',
          subMenu: [
            {
              id: 1,
              name: 'Users',
              link: '/admin/user',
              icon: 'bx bx-user-circle',
            },
            {
              id: 2,
              name: 'Joined Today',
              link: '/admin/user/joined-today',
              icon: 'bx bx-user-plus',
            }
          ],
        }
      ])



  return (
    <aside className='sidebar'>
        <motion.div animate={{width:sideMenuOpen ? "16.23rem" : "4rem",  transition:{duration: 0.3, type: "spring", damping:12}}} className='sidebar_content'>
            <div className='top_section'>
                {sideMenuOpen && <motion.h1 variants={menuAnimate} initial="close" animate="open" exit="close" className='logo'>Offerwall</motion.h1>}
                <i onClick={menuToggle} className='bars bx bx-menu'></i>
            </div>
            <section className='menu_items'>
                {menuItems.map((item) => <Items key={item.id} item={item} menuAnimate={menuAnimate} />)}
                
            </section>
        </motion.div>
    </aside>
  )
}

export default SidebarMotion