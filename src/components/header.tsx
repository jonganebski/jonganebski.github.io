import React from "react"
import { styled } from "../styles/themes"

const Wrapper = styled.header`
  position: fixed;
  height: calc(100vh - 5rem);
  width: 100%;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bgColor.background};
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

const Anchor = styled.a`
  color: ${({ theme }) => theme.textColor.rare};
  text-underline-offset: 0.5rem;
  &:hover {
    text-decoration: underline;
  }
`

interface IHeaderProps {
  headerRef: React.MutableRefObject<HTMLDivElement | null>
}

export const Header: React.FC<IHeaderProps> = ({ headerRef }) => {
  return (
    <Wrapper>
      <Intro ref={headerRef}>
        <Hello>
          안녕하세요! <span>👋</span>
        </Hello>
        <h2>웹 개발자 방진석입니다.</h2>
        <span>이메일: </span>
        <Anchor href="mailto: jon.ganebski@gamil.com">
          jon.ganebski@gmail.com
        </Anchor>
      </Intro>
    </Wrapper>
  )
}
