import React from "react"
import { styled } from "../styles/themes"
import { Layout } from "../components/layout"
import { graphql, Link, useStaticQuery } from "gatsby"

interface IBlogMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        id: string
        timeToRead: number
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
          timeToRead
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
  height: 10rem;
  padding: 1rem;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderColor.base};
  transition: border-color 0.15s ease-in-out;
  color: ${({ theme }) => theme.textColor.base};
  &:hover {
    border-color: ${({ theme }) => theme.borderColor.hover};
  }
`

const PostTitle = styled.h2``

const PostInfo = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PostDate = styled.span`
  font-size: 0.9rem;
`

const TimeToRead = styled.span`
  font-size: 0.9rem;
`

const Home = () => {
  const data = useStaticQuery<IBlogMarkdownsQuery>(BLOG_MARKDOWNS)
  console.log(data)
  return (
    <Layout>
      <Main>
        <PostsList>
          {data.allMarkdownRemark.edges.map(edge => {
            return (
              <Link to={`blog/${edge.node.fields.slug}`} key={edge.node.id}>
                <Post>
                  <PostInfo>
                    <PostTitle>{edge.node.frontmatter.title}</PostTitle>
                    <div>
                      <PostDate>{edge.node.frontmatter.date}</PostDate>
                      <TimeToRead>{edge.node.timeToRead} min read</TimeToRead>
                    </div>
                  </PostInfo>
                </Post>
              </Link>
            )
          })}
        </PostsList>
      </Main>
    </Layout>
  )
}

export default Home
