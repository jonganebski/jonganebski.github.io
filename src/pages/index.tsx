import React from "react"
import { styled } from "../styles/themes"
import { Layout } from "../components/layout"
import { NewestPost } from "../components/newest-post"
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
`

const Heading2 = styled.h2`
  margin-bottom: 3rem;
  font-size: 4rem;
`

const BlogPostsList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8rem;
`

const HomePage: React.FC<PageProps<IBlogMarkdownsQuery>> = ({ data }) => {
  return (
    <Layout>
      <Helmet title="Welcome! | JonGanebski" />
      <Main>
        <NewestPost node={data.allMarkdownRemark.edges[0].node} />
        <Heading2>More Articles</Heading2>
        <BlogPostsList>
          {data.allMarkdownRemark.edges.map((edge, index) => {
            if (index === 0) {
              return null
            }
            return <BlogPost node={edge.node} key={edge.node.id} />
          })}
          <li></li>
        </BlogPostsList>
      </Main>
    </Layout>
  )
}

export default HomePage
