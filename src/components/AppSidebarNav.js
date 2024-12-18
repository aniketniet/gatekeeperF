import React from 'react'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'

import { CBadge, CNavLink, CNavGroup, CSidebarNav } from '@coreui/react'

export const AppSidebarNav = ({ items }) => {
  const navLink = (name, icon, badge, indent = false) => {
    return (
      <>
        {icon
          ? icon
          : indent && (
              <span className="nav-icon">
                <span className="nav-icon-bullet" style={{color: '#0077ff'}}></span>
              </span>
            )}
        {name && name}
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
        )}
      </>
    )
  }

  const navItem = (item, index, indent = false) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component as="div" key={index}>
      {rest.to || rest.href ? (
        <CNavLink {...(rest.to && { as: NavLink })} {...rest}>
        {navLink(<b style={{fontSize:"16px"}}>{name}</b>, icon, badge, indent)}
        </CNavLink>
      ) : (
        navLink(<b>{name}</b>, icon, badge, indent)
      )}
      </Component>
    )
  }

  const navGroup = (item, index) => {
    const { component, name, icon, items, ...rest } = item
    const Component = component
    return (
      <Component key={index} toggler={navLink(<b style={{fontSize:"24px",fontWeight:"bold"}}>{name}</b>, icon)} {...rest}>
        {items?.map((subItem, idx) =>
          subItem.items ? navGroup(subItem, idx) : navItem(subItem, idx, true),
        )}
      </Component>
    )
  }

  return (
    <CSidebarNav as={SimpleBar}>
      {items &&
        items.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
    </CSidebarNav>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
