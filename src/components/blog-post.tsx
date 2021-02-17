import { Link } from "gatsby"
import React from "react"
import { IBlogPostNode } from "../dtos/allMarkdownRemark.dto"
import { styled } from "../styles/themes"

const Post = styled.li`
  height: 10rem;
  display: flex;
  justify-content: space-between;
  border: 1px solid;
  border-color: ${({ theme }) => theme.borderColor.base};
  transition: border-color 0.15s ease-in-out;
  color: ${({ theme }) => theme.textColor.base};
  &:hover {
    border-color: ${({ theme }) => theme.borderColor.hover};
  }
`

const PostTitle = styled.h2`
  font-size: 1.3rem;
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
`

const TimeToRead = styled.span`
  font-size: 0.9rem;
`

const CoverImage = styled.img`
  height: 100%;
  width: 40%;
  object-fit: cover;
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
          <div>
            <PostDate>{node.frontmatter.date} • </PostDate>
            <TimeToRead>{node.timeToRead} min read</TimeToRead>
          </div>
        </PostInfo>
        {node.frontmatter.coverUrl && (
          <CoverImage src={node.frontmatter.coverUrl} />
        )}
      </Post>
    </Link>
  )
}
