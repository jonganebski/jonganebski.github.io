import React from "react"
import { Link } from "gatsby"
import { styled } from "../styles/themes"
import { formatDate } from "../common/helpers"
import { IBlogPostNode } from "../dtos/blog.dto"

interface INewestPostProps {
  node: IBlogPostNode
}

const Container = styled.div`
  margin-bottom: 6rem;
  img {
    width: 100%;
    margin-bottom: 3rem;
    aspect-ratio: 1.7 / 1;
    object-fit: cover;
  }
`

const Desc = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  h3 {
    line-height: 1.5em;
    font-size: 3rem;
    margin-bottom: 1em;
    a {
      text-underline-position: under;
      &:hover {
        text-decoration: underline solid 2px;
      }
    }
  }
  span {
    font-size: 1.2rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: 1.2rem;
    line-height: 2em;
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
