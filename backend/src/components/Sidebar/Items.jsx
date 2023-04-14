import { AnimatePresence, motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { toggleSideMenu } from '../../features/utils/uiSlice'
import SubItem from './SubItem'

const Items = ({ item, menuAnimate }) => {
    const dispatch = useDispatch()
  const { sideMenuOpen } = useSelector((state) => state.ui)
  const location = useLocation()
  const [subMenuOpen, setSubMenuOpen] = useState(false)
  const toggleMenu = () => {
    setSubMenuOpen(!subMenuOpen)
    !sideMenuOpen && dispatch(toggleSideMenu())
  }

  useEffect(() => {
    if (!sideMenuOpen) {
      setSubMenuOpen(false)
    }
  }, [sideMenuOpen])

  let menu = null
  if (item.subMenu.length > 0) {
    menu = (
        <div className={`with_sub_menu ${location.pathname === item.link && 'active'}`}>
      <span
      onClick={toggleMenu}
        title={item.name}
        className={`menu_link cursor-pointer ${location.pathname === item.link && 'active'}`}
      >
        <i className={`icon ${item.icon}`}></i>
        <AnimatePresence>
          {sideMenuOpen && (
            <motion.div
              variants={menuAnimate}
              initial="close"
              animate="open"
              exit="close"
              className="link_text"
            >
              {item.name}
            </motion.div>
          )}
        </AnimatePresence>
      </span>
      <i className={`arrow-icon bx bx-${subMenuOpen ? 'chevron-down' : 'chevron-right'}`}></i>
        {subMenuOpen && (<div className='sub_menu'>{item.subMenu.map((subItem) => (<SubItem key={subItem.id} item={subItem} menuAnimate={menuAnimate} />))}</div>)}
      </div>
    )
  } else {
    menu = (
      <Link
        title={item.name}
        className={`menu_link ${location.pathname === item.link && 'active'}`}
        to={item.link}
        key={item.id}
      >
        <i className={`icon ${item.icon}`}></i>
        <AnimatePresence>
          {sideMenuOpen && (
            <motion.div
              variants={menuAnimate}
              initial="close"
              animate="open"
              exit="close"
              className="link_text"
            >
              {item.name}
            </motion.div>
          )}
        </AnimatePresence>
      </Link>
    )
  }
  return menu
}

export default Items
