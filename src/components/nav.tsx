import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"
import { CLASSNAMES } from "../styles/styles"

const Ul = styled.ul`
  padding: 1rem 0;
  display: grid;
  grid-auto-flow: column;
  gap: 1rem;
`

const NavLink = styled(Link)`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`

export const Nav = () => {
  return (
    <nav>
      <Ul>
        <li>
          <NavLink to="/" activeClassName={CLASSNAMES.ACTIVE_LINK}>
            Blog
          </NavLink>
        </li>
        <li>
          <NavLink to="/projects" activeClassName={CLASSNAMES.ACTIVE_LINK}>
            Projects
          </NavLink>
        </li>
      </Ul>
    </nav>
  )
}
