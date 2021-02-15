import React from "react"
import styled from "styled-components"

const Wrapper = styled.header`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Container = styled.div`
  width: 100%;
`

export const Header = () => {
  return (
    <Wrapper>
      <Container>
        <h2>
          안녕하세요! <span>👋</span>
        </h2>
        <h2>웹 개발자 방진석입니다.</h2>
        <span>이메일:</span>
        <a href="mailto: jon.ganebski@gamil.com">jon.ganebski@gmail.com</a>
      </Container>
    </Wrapper>
  )
}
