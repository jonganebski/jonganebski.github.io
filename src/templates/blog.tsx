import { graphql, PageProps } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { BlogNav } from "../components/blog-nav"
import { Layout } from "../components/layout"
import { IBlogMarkdownQuery } from "../dtos/blog.dto"
import { IContext } from "../dtos/context.dto"
import { styled } from "../styles/themes"

// ------------------------
//    GraphQL
// ------------------------

export const BLOG_MARKDOWN = graphql`
  query BlogMarkdown($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        date
        coverUrl
      }
      timeToRead
      html
    }
  }
`

// ------------------------
//    Styled Components
// ------------------------

const Main = styled.main`
  width: 100%;
  h1 {
    margin-bottom: 0.5em;
    font-size: 4rem;
    font-weight: 600;
    line-height: 1.5em;
    word-break: keep-all;
  }
  img {
    width: 100%;
  }
`

const Article = styled.article`
  max-width: 750px;
  margin: 0 auto;
  img {
    width: 100%;
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
    padding: 2rem 0;
    font-weight: 600;
    font-size: 1.8rem;
  }
  h3 {
    padding: 0.5rem 0;
    font-weight: 600;
    font-size: 1.1rem;
  }
  p,
  ol {
    margin-bottom: 2rem;
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.8rem;
    code {
      padding: 0.2rem 0.5rem;
      background-color: ${({ theme }) => theme.bgColor.code};
      border-radius: 5px;
    }
  }
  code {
    font-family: "Inconsolata", monospace;
  }
  ol {
    padding-left: 2rem;
    list-style: decimal;
  }
  pre {
    margin-bottom: 2rem;
    line-height: 1.5rem;
    .hljs-function {
      color: white;
    }
  }
  sup {
    font-size: 0.7rem;
    vertical-align: super;
  }
`

// -----------------------
//    Main Component
// -----------------------

const BlogTemplate: React.FC<PageProps<IBlogMarkdownQuery, IContext>> = ({
  data,
  pageContext,
}) => {
  return (
    <Layout>
      <Helmet
        title={`${data.markdownRemark.frontmatter.title} | JonGanebski`}
      />
      <Main>
        <h1>{data.markdownRemark.frontmatter.title}</h1>
        <img src={data.markdownRemark.frontmatter.coverUrl} />
        <Article
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
          className="light-theme"
        />
        <BlogNav pageContext={pageContext} />
      </Main>
    </Layout>
  )
}

export default BlogTemplate
