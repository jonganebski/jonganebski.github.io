import { useLocation } from "@reach/router"
import { Link } from "gatsby"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { ThemeProvider } from "styled-components"
import { NAV_HEIGHT } from "../common/constants"
import { GlobalStyle } from "../styles/globalStyle"
import { darkTheme, lightTheme, styled } from "../styles/themes"
import { Footer } from "./footer"

// ------------------------
//    Interfaces & Types
// ------------------------

interface IPathname {
  pathname: string
}

interface ISwitchProps {
  colorMode: ColorMode
}

interface ILayoutProps {
  children: ReactNode
}

type ColorMode = "light" | "dark"

// ------------------------
//    Styled Components
// ------------------------

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor.background};
`

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  max-width: 1400px;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Heading = styled.h1<IPathname>`
  font-size: ${({ pathname, theme }) =>
    pathname === "/" ? `${theme.fontSize.xxl}` : "2rem"};
  font-size: ${({ pathname, theme }) =>
    pathname === "/" ? `${theme.fontSizeClamp.xxl}` : "2rem"};
  margin-top: 4rem;
  margin-bottom: 3rem;
  margin-right: auto;
`

const Switch = styled.label<ISwitchProps>`
  position: absolute;
  z-index: 1;
  top: calc(${NAV_HEIGHT} + 1rem);
  right: calc(${NAV_HEIGHT} / 2);
  width: 2.5rem;
  height: 1.3rem;
  cursor: pointer;
  border-radius: 1rem;
  border: 2px solid;
  border-color: ${({ theme }) => theme.borderColor.switch};
  fill-opacity: 0.5;
  input {
    opacity: 0;
    height: 0;
    width: 0;
  }
  span {
    position: absolute;
    display: block;
    top: 50%;
    left: ${({ colorMode }) => (colorMode === "light" ? "10%" : "90%")};
    transition: left 0.2s ease-in-out;
    transform: translate(-50%, -50%);
    background-color: ${({ theme }) => theme.bgColor.switch};
    border: 2px solid;
    border-radius: 999px;
    border-color: ${({ theme }) => theme.borderColor.switch};
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @media only screen and (min-width: 700px) {
    position: fixed;
    top: 2rem;
    z-index: 10;
  }
`

// ------------------------
//    Main Component
// ------------------------

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const location = useLocation()
  const [colorMode, setColorMode] = useState<ColorMode | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const getInitialTheme = (): ColorMode => {
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme
      }

      return "light"
    }
    setColorMode(getInitialTheme())
  })

  const onToggleDarkModeSwitch = () =>
    setColorMode(prev => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark")
        return "dark"
      }
      localStorage.setItem("theme", "light")
      return "light"
    })

  return colorMode ? (
    <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper className="wrapper" data-theme={colorMode}>
        <Container ref={containerRef}>
          <Heading pathname={location.pathname}>
            <Link to="/">Blog.</Link>
          </Heading>
          {children}
          <Footer />
        </Container>
        <Switch colorMode={colorMode}>
          <input
            type="checkbox"
            defaultChecked={colorMode === "dark"}
            onChange={onToggleDarkModeSwitch}
          />
          <span>{colorMode === "light" ? "🌞" : "🌜"}</span>
        </Switch>
      </Wrapper>
    </ThemeProvider>
  ) : null
}
