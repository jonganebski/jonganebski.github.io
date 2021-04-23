import { Link } from "gatsby"
import React from "react"
import { IBlogPostNode } from "../dtos/blog.dto"
import { styled } from "../styles/themes"
import { formatDate } from "../common/helpers"

// ------------------------
//    Interfaces
// ------------------------

interface IBlogPostProps {
  node: IBlogPostNode
}

// ------------------------
//    Styled Components
// ------------------------

const Post = styled.li`
  color: ${({ theme }) => theme.textColor.base};
  font-family: "Nanum Gothic", sans-serif;
  display: grid;
  gap: 1.5em;
  img {
    width: 100%;
    aspect-ratio: 2 / 1;
    object-fit: cover;
  }
  h3 {
    font-size: ${({ theme }) => theme.fontSize.lg};
    font-size: ${({ theme }) => theme.fontSizeClamp.lg};
    line-height: 1.5em;
    word-break: break-all;
    a {
      text-underline-position: under;
      &:hover {
        text-decoration: underline solid 2px;
      }
    }
  }
  p {
    line-height: 1.8em;
    font-size: ${({ theme }) => theme.fontSize.sm};
    font-size: ${({ theme }) => theme.fontSizeClamp.sm};
  }
  span {
    font-size: ${({ theme }) => theme.fontSize.xs};
    font-size: ${({ theme }) => theme.fontSizeClamp.xs};
  }
`

// -----------------------
//    Main Component
// -----------------------

export const BlogPost: React.FC<IBlogPostProps> = ({ node }) => {
  return (
    <Post>
      {node.frontmatter.coverUrl && (
        <Link to={`blog/${node.fields.slug}`}>
          <img src={node.frontmatter.coverUrl} />
        </Link>
      )}
      <h3>
        <Link to={`blog/${node.fields.slug}`}>{node.frontmatter.title}</Link>
      </h3>
      <span>{formatDate(node.frontmatter.date)}</span>
      <p>{node.excerpt}</p>
      <span>{node.timeToRead} min read</span>
    </Post>
  )
}
