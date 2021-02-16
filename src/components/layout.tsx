import React, { ReactNode, useEffect, useRef } from "react"
import styled from "styled-components"
import { GlobalStyle } from "../styles/styles"
import { Footer } from "./footer"
import { Header } from "./header"
import { Nav } from "./nav"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const Container = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  margin-top: calc(100vh - 5rem);
  padding: 0 1rem;
  background-color: white;
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
  &:hover {
    background-color: rgb(240, 240, 240);
  }
`

interface ILayoutProps {
  children: ReactNode
}

export const Layout: React.FC<ILayoutProps> = ({ children }) => {
  const headerRef = useRef<HTMLDivElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const callBack = () => {
      console.log(containerRef.current?.offsetTop, window.pageYOffset)
      if (window.pageYOffset < 500) {
        if (headerRef.current) {
          headerRef.current.style.opacity = 1 - window.pageYOffset / 500 + ""
        }
      }
    }
    document.addEventListener("scroll", callBack)
    return () => document.removeEventListener("scroll", callBack)
  }, [])

  const autoScroll = () => {
    if (containerRef.current) {
      window.scroll({
        top: containerRef.current.offsetTop,
        behavior: "smooth",
      })
    }
  }

  return (
    <Wrapper>
      <GlobalStyle />
      <Nav />
      <Header headerRef={headerRef} />
      <Container ref={containerRef}>
        <ArrowDown onClick={autoScroll}>&darr;</ArrowDown>
        {children}
        <Footer />
      </Container>
    </Wrapper>
  )
}
