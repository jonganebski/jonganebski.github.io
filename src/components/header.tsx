import React from "react"
import styled from "styled-components"

const Wrapper = styled.header`
  position: fixed;
  height: calc(100vh - 5rem);
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Intro = styled.div`
  max-width: 1000px;
  width: 100%;
  height: 30%;
  line-height: 4rem;
  font-size: 2rem;
  font-family: "Nanum Gothic", sans-serif;
`

const Hello = styled.h2``

interface IHeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>
}

export const Header: React.FC<IHeaderProps> = ({ headerRef }) => {
  return (
    <Wrapper ref={headerRef}>
      <Intro>
        <Hello>
          안녕하세요! <span>👋</span>
        </Hello>
        <h2>웹 개발자 방진석입니다.</h2>
        <span>이메일: </span>
        <a href="mailto: jon.ganebski@gamil.com">jon.ganebski@gmail.com</a>
      </Intro>
    </Wrapper>
  )
}
