import { graphql, PageProps } from "gatsby"
import React from "react"
import { styled } from "../styles/themes"
import { Layout } from "../components/layout"

interface IBlogMarkdownQuery {
  markdownRemark: {
    frontmatter: {
      title: string
      data: string
    }
    html: string
    timeToRead: number
  }
}

export const BLOG_MARKDOWN = graphql`
  query BlogMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
      }
      timeToRead
      html
    }
  }
`

const Main = styled.main`
  width: 100%;
  max-width: 750px;
`

const Title = styled.h1`
  padding: 4rem 0;
  font-size: 2.3rem;
  font-weight: 600;
`

const Article = styled.article`
  img {
    width: 100%;
    max-width: 750px;
    margin-bottom: 1rem;
  }
  .photo-reference {
    display: block;
    text-align: center;
    font-weight: 300;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }
  h2 {
    margin-bottom: 2rem;
    font-weight: 600;
    font-size: 1.8rem;
  }
  h3 {
    margin-bottom: 0.5rem;
    font-weight: 600;
    font-size: 1.1rem;
  }
  p,
  ol {
    margin-bottom: 2rem;
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.8rem;
  }
  code {
    font-family: "Inconsolata", monospace;
    background-color: ${({ theme }) => theme.bgColor.code};
    padding: 0.3rem 0.5rem 0.2rem 0.5rem;
  }
  ol {
    padding-left: 2rem;
    list-style: decimal;
  }
  pre {
    margin-bottom: 2rem;
    padding: 1rem;
    width: 100%;
    font-family: "Inconsolata", monospace;
    background-color: ${({ theme }) => theme.bgColor.pre};
    font-size: 0.9rem;
    line-height: 1.5rem;
    font-weight: 300;
    code {
      padding: none;
    }
  }
`

const BlogTemplate: React.FC<PageProps<IBlogMarkdownQuery>> = ({ data }) => {
  console.log(data)
  return (
    <Layout>
      <Main>
        <Title>{data.markdownRemark.frontmatter.title}</Title>
        <Article
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
      </Main>
    </Layout>
  )
}

export default BlogTemplate
