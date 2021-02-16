import React, { useEffect, useRef } from "react"
import styled from "styled-components"
import { Layout } from "../components/layout"
import { graphql, Link, useStaticQuery } from "gatsby"

interface IBlogMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string
        frontmatter: {
          title: string
          date: string
        }
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const BLOG_MARKDOWNS = graphql`
  query BlogMarkdowns {
    allMarkdownRemark(filter: { fields: { type: { eq: "blog" } } }) {
      edges {
        node {
          id
          frontmatter {
            title
            date
          }
          fields {
            slug
          }
        }
      }
    }
  }
`
const Main = styled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`

const PostsList = styled.ul`
  display: grid;
  gap: 1rem;
`

const Post = styled.li`
  min-height: 6rem;
  padding: 1rem;
  border: 1px solid;
  border-color: rgba(0, 0, 0, 0.1);
  transition: border-color 0.15s ease-in-out;
  &:hover {
    border-color: rgba(0, 0, 0, 0.4);
  }
`

const Home = () => {
  const data = useStaticQuery<IBlogMarkdownsQuery>(BLOG_MARKDOWNS)

  return (
    <Layout>
      <Main>
        <PostsList>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <Link to={`blog/${edge.node.fields.slug}`} key={edge.node.id}>
                <Post>{edge.node.frontmatter.title}</Post>
              </Link>
            )
          })}
        </PostsList>
      </Main>
    </Layout>
  )
}

export default Home
