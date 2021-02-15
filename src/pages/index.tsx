import React from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"
import { graphql, PageProps } from "gatsby"

const Heading = styled.h1`
  color: red;
`

interface IMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string
        frontmatter: {
          title: string
        }
      }
    }[]
  }
}

export const MARKDOWNS = graphql`
  query Markdowns {
    allMarkdownRemark {
      edges {
        node {
          id
          frontmatter {
            title
          }
        }
      }
    }
  }
`

const Home: React.FC<PageProps<IMarkdownsQuery>> = ({ data }) => {
  console.log(data.allMarkdownRemark.edges[0].node)
  return (
    <Layout>
      <Heading>Hello world!</Heading>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </Layout>
  )
}

export default Home
