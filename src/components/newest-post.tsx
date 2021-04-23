import React from "react"
import { Link } from "gatsby"
import { styled } from "../styles/themes"
import { formatDate } from "../common/helpers"
import { IBlogPostNode } from "../dtos/blog.dto"

interface INewestPostProps {
  node: IBlogPostNode
}

const Container = styled.div`
  @media screen and (min-width: 1024px) {
    margin-bottom: 6rem;
  }
  margin-bottom: 3rem;
  img {
    @media screen and (min-width: 1024px) {
      margin-bottom: 3rem;
    }
    margin-bottom: 1rem;
    width: 100%;
    aspect-ratio: 1.7 / 1;
    object-fit: cover;
  }
`

const Desc = styled.div`
  @media screen and (min-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
  display: grid;
  gap: 1rem;
  h3 {
    margin-bottom: 1rem;
    line-height: 1.5em;
    font-size: ${({ theme }) => theme.fontSize.xl};
    font-size: ${({ theme }) => theme.fontSizeClamp.xl};
    a {
      text-underline-position: under;
      &:hover {
        text-decoration: underline solid 2px;
      }
    }
  }
  span {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-size: ${({ theme }) => theme.fontSizeClamp.xs};
  }
  p {
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-size: ${({ theme }) => theme.fontSizeClamp.sm};
    line-height: 1.8em;
  }
`

export const NewestPost: React.FC<INewestPostProps> = ({ node }) => {
  return (
    <Container>
      <Link to={`blog/${node.fields.slug}`}>
        <img src={node.frontmatter.coverUrl} />
      </Link>
      <Desc>
        <div>
          <h3>
            <Link to={`blog/${node.fields.slug}`}>
              {node.frontmatter.title}
            </Link>
          </h3>
          <span>{formatDate(node.frontmatter.date)}</span>
        </div>
        <div>
          <p>{node.excerpt}</p>
          <span>{node.timeToRead} min read</span>
        </div>
      </Desc>
    </Container>
  )
}
