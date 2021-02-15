import { WindowLocation } from "@reach/router"
import React, { ReactNode } from "react"
import styled from "styled-components"
import { Reset } from "styled-reset"
import "../styles/fonts.css"
import { GlobalStyle } from "../styles/styles"
import { Footer } from "./footer"
import { Header } from "./header"
import { Nav } from "./nav"

const Wrapper = styled.div`
  min-height: 100vh;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

interface ILayoutProps {
  children: ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <Wrapper>
      <GlobalStyle />
      <Reset />
      <div>
        <Header />
        <Nav />
        {children}
      </div>
      <Footer />
    </Wrapper>
  )
}
