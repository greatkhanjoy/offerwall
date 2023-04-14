import { AnimatePresence, motion } from 'framer-motion'
import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'

const SubItem = ({ item, menuAnimate }) => {
  const { sideMenuOpen } = useSelector((state) => state.ui)
  const location = useLocation()

  let menu = (<Link
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
  </Link>)
  
  return menu
}

export default SubItem
