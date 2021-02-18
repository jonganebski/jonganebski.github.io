import { graphql, PageProps } from "gatsby"
import hljs from "highlight.js"
// import "highlight.js/styles/monokai-sublime.css"
import React, { useEffect } from "react"
import { Layout } from "../components/layout"
import { IContext } from "../dtos/context.dto"
import { styled } from "../styles/themes"
import { BlogNav } from "../components/blog-nav"
import { Helmet } from "react-helmet"

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
  line-height: 3rem;
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
    code {
      padding: 0.2rem 0.5rem;
      background-color: ${({ theme }) => theme.bgColor.code};
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
`

const BlogTemplate: React.FC<PageProps<IBlogMarkdownQuery, IContext>> = ({
  data,
  pageContext,
}) => {
  useEffect(() => {
    document.querySelectorAll("pre > code").forEach(element => {
      hljs.highlightBlock(element as HTMLElement)
    })
  }, [])

  return (
    <Layout>
      <Helmet title={`${data.markdownRemark.frontmatter.title} | JonGanebski`}>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/10.5.0/styles/monokai-sublime.min.css"
        ></link>
      </Helmet>
      <Main>
        <Title>{data.markdownRemark.frontmatter.title}</Title>
        <Article
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
        <BlogNav pageContext={pageContext} />
      </Main>
    </Layout>
  )
}

export default BlogTemplate
