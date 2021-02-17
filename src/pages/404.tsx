import React from "react"
import { Layout } from "../components/layout"
import { styled } from "../styles/themes"

const Main = styled.main`
  margin-top: 20rem;
`

const NotFound = () => {
  return (
    <Layout>
      <Main>
        <span>🍑</span>
        <span>Page Not Found</span>
      </Main>
    </Layout>
  )
}

export default NotFound
