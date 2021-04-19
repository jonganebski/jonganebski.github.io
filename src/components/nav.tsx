import React, { useContext } from "react"
import { IMyTheme, styled } from "../styles/themes"
import { Link } from "gatsby"
import { NAV_HEIGHT } from "../common/constants"
import { useLocation } from "@reach/router"
import { ThemeContext } from "styled-components"

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = styled.nav`
  position: fixed;
  top: 0px;
  z-index: 10;
  height: ${NAV_HEIGHT};
  width: 100%;
  background-color: ${({ theme }) => theme.bgColor.background};
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const Ul = styled.ul`
  margin: 0 auto;
  height: 100%;
  width: full;
  max-width: 1000px;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  gap: 1rem;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: ${({ theme }) => theme.textColor.shade};
`

// ------------------------
//    Main Component
// ------------------------

export const Nav = () => {
  const { pathname } = useLocation()
  const theme = useContext<IMyTheme>(ThemeContext)

  return (
    <Wrapper>
      <Ul>
        <li>
          <StyledLink
            to="/"
            partiallyActive={pathname.includes("/blog")}
            activeStyle={{ color: theme.textColor.base }}
          >
            Blog
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to="/gallery"
            partiallyActive
            activeStyle={{ color: theme.textColor.base }}
          >
            Gallery
          </StyledLink>
        </li>
      </Ul>
    </Wrapper>
  )
}
