import React from "react"
import { styled } from "../styles/themes"

const Wrapper = styled.footer`
  margin-top: auto;
  padding: 2rem;
  height: 10rem;
  width: 100%;
  max-width: 1000px;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  color: ${({ theme }) => theme.textColor.rare};
`

export const Footer = () => {
  return (
    <Wrapper>Copyright &copy; Jon Ganebski {new Date().getFullYear()} </Wrapper>
  )
}
