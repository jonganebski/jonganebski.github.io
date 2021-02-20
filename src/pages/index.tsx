import React from "react"
import { styled } from "../styles/themes"
import { Layout } from "../components/layout"
import { graphql, PageProps } from "gatsby"
import { IBlogMarkdownsQuery } from "../dtos/blog.dto"
import { BlogPost } from "../components/blog-post"
import { Helmet } from "react-helmet"

// ------------------------
//    GrapgQL
// ------------------------

export const BLOG_MARKDOWNS = graphql`
  query BlogMarkdowns {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "blog" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          timeToRead
          excerpt
          frontmatter {
            title
            date
            coverUrl
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

// ------------------------
//    Styled Components
// ------------------------

const Main = styled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`

const BlogPostsList = styled.ul`
  display: grid;
  gap: 1rem;
`

const HomePage: React.FC<PageProps<IBlogMarkdownsQuery>> = ({ data }) => {
  return (
    <Layout>
      <Helmet title="Welcome! | JonGanebski" />
      <Main>
        <BlogPostsList>
          {data.allMarkdownRemark.edges.map(edge => {
            return <BlogPost node={edge.node} key={edge.node.id} />
          })}
        </BlogPostsList>
      </Main>
    </Layout>
  )
}

export default HomePage
