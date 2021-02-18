import { Link } from "gatsby"
import React from "react"
import { IBlogPostNode } from "../dtos/blog.dto"
import { styled } from "../styles/themes"
import { formatDate } from "../common/helpers"

const Post = styled.li`
  min-height: 10rem;
  display: grid;
  grid-template-columns: 1fr 0px;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderColor.base};
  transition: border-color 0.15s ease-in-out;
  color: ${({ theme }) => theme.textColor.base};
  font-family: "Nanum Gothic", sans-serif;
  &:hover {
    border-color: ${({ theme }) => theme.borderColor.hover};
  }
  @media only screen and (min-width: 700px) {
    grid-template-columns: 3fr 1fr;
  }
`

const PostTitle = styled.h2`
  font-size: 1.2rem;
  line-height: 2rem;
  font-weight: 600;
  word-break: keep-all;
`

const Excerpt = styled.p`
  margin: 1rem 0;
  font-size: 0.9rem;
  line-height: 1.5rem;
`

const PostInfo = styled.div`
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const PostDate = styled.span`
  font-size: 0.9rem;
  font-weight: 300;
`

const TimeToRead = styled.span`
  font-size: 0.9rem;
  font-weight: 300;
`

const CoverImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  /* @media only screen and (min-width: 700px) {
    height: 100%;
    width: 100%;
  } */
`

interface IBlogPostProps {
  node: IBlogPostNode
}

export const BlogPost: React.FC<IBlogPostProps> = ({ node }) => {
  return (
    <Link to={`blog/${node.fields.slug}`}>
      <Post>
        <PostInfo>
          <PostTitle>{node.frontmatter.title}</PostTitle>
          <Excerpt>{node.excerpt}</Excerpt>
          <div>
            <PostDate>{formatDate(node.frontmatter.date)} • </PostDate>
            <TimeToRead>{node.timeToRead} min read</TimeToRead>
          </div>
        </PostInfo>
        {node.frontmatter.coverUrl && (
          <div>
            <CoverImage src={node.frontmatter.coverUrl} />
          </div>
        )}
      </Post>
    </Link>
  )
}
