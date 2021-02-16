import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Wrapper = styled.nav`
  position: fixed;
  top: 0px;
  z-index: 10;
  height: 5rem;
  width: 100%;
  max-width: 750px;
  background-color: white;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
`

const Ul = styled.ul`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  justify-items: center;
  align-items: center;
  gap: 1rem;
`

const StyledLink = styled(Link)`
  font-weight: 600;
  color: rgba(0, 0, 0, 0.5);
`

export const Nav = () => {
  return (
    <Wrapper>
      <Ul>
        <li>
          <StyledLink to="/" activeStyle={{ color: "rgba(0, 0, 0, 0.9)" }}>
            Blog
          </StyledLink>
        </li>
        <li>
          <StyledLink
            to="/projects"
            activeStyle={{ color: "rgba(0, 0, 0, 0.9)" }}
          >
            Projects
          </StyledLink>
        </li>
      </Ul>
    </Wrapper>
  )
}
