import { Link } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { Layout } from "../components/layout"
import { styled } from "../styles/themes"

const Main = styled.main`
  margin-top: 12rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Imoji = styled.span`
  font-size: 7rem;
  margin-bottom: 5rem;
`

const Text = styled.span`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 3rem;
`

const StyledLink = styled(Link)``

const NotFound = () => {
  return (
    <Layout>
      <Helmet title="Page Not Found | JonGanebski" />
      <Main>
        <Imoji>🌌</Imoji>
        <Text>Page Not Found</Text>
        <StyledLink to="/">Go Home</StyledLink>
      </Main>
    </Layout>
  )
}

export default NotFound
