import React from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"

const Heading = styled.h1`
  color: red;
`

const Home: React.FC = () => {
  return (
    <Layout>
      <Heading>Hello world!</Heading>
    </Layout>
  )
}

export default Home
