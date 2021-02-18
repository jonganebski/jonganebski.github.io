import { useLocation } from "@reach/router"
import React, { ReactNode, useEffect, useRef, useState } from "react"
import { ThemeProvider } from "styled-components"
import { NAV_HEIGHT, ROUTES_WITH_FIXED_HEADER } from "../common/constants"
import { GlobalStyle } from "../styles/globalStyle"
import { darkTheme, lightTheme, styled } from "../styles/themes"
import { Footer } from "./footer"
import { Header } from "./header"
import { Nav } from "./nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

interface IContainerProps {
  pathname: string
}

const Container = styled.div<IContainerProps>`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-height: 100vh;
  margin-top: ${({ pathname }) => {
    if (ROUTES_WITH_FIXED_HEADER.includes(pathname)) {
      return `calc(100vh - ${NAV_HEIGHT})`
    } else {
      return NAV_HEIGHT
    }
  }};
  padding: 0 1rem;
  background-color: ${({ theme }) => theme.bgColor.background};
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ArrowDown = styled.button`
  all: unset;
  position: absolute;
  top: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: 3rem;
  height: 3rem;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  cursor: pointer;
  background-color: white;
  color: black;
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`

interface ISwitchProps {
  colorMode: ColorMode
}

const Switch = styled.label<ISwitchProps>`
  position: fixed;
  z-index: 10;
  top: 2rem;
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
    border-radius: 999px;
    width: 28px;
    height: 28px;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

interface ILayoutProps {
  children: ReactNode
}

type ColorMode = "light" | "dark"

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const getInitialTheme = (): ColorMode => {
    if (localStorage) {
      const storedTheme = localStorage.getItem("theme")
      if (storedTheme === "light" || storedTheme === "dark") {
        return storedTheme
      }
    }
    return "light"
  }

  const location = useLocation()
  const [colorMode, setColorMode] = useState<ColorMode>(getInitialTheme())
  const headerRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset < 500) {
        if (headerRef.current) {
          headerRef.current.style.opacity = 1 - window.pageYOffset / 500 + ""
        }
      }
    }
    document.addEventListener("scroll", onScroll)
    return () => document.removeEventListener("scroll", onScroll)
  }, [])

  const autoScroll = () => {
    if (containerRef.current) {
      window.scroll({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  const onToggleDarkModeSwitch = () =>
    setColorMode(prev => {
      if (prev === "light") {
        localStorage.setItem("theme", "dark")
        return "dark"
      }
      localStorage.setItem("theme", "light")
      return "light"
    })

  return (
    <ThemeProvider theme={colorMode === "dark" ? darkTheme : lightTheme}>
      <GlobalStyle />
      <Wrapper>
        <Nav />
        {ROUTES_WITH_FIXED_HEADER.includes(location.pathname) && (
          <Header headerRef={headerRef} />
        )}
        <Container ref={containerRef} pathname={location.pathname}>
          {ROUTES_WITH_FIXED_HEADER.includes(location.pathname) && (
            <ArrowDown onClick={autoScroll}>&darr;</ArrowDown>
          )}
          {children}
          <Footer />
        </Container>
        <Switch colorMode={colorMode}>
          <input
            type="checkbox"
            defaultChecked={colorMode === "dark"}
            onChange={onToggleDarkModeSwitch}
          />
          <span>{colorMode === "light" ? "🌜" : "🌞"}</span>
        </Switch>
      </Wrapper>
    </ThemeProvider>
  )
}
