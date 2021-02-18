import React from "react"
import { IContext } from "../dtos/context.dto"
import { styled } from "../styles/themes"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti"
import { Link } from "gatsby"
import { keyframes } from "styled-components"

interface IBlogNavProps {
  pageContext: IContext
}

const Nav = styled.nav`
  height: 5rem;
  margin: 7rem 0;
  display: grid;
  grid-template: "prev next" 1fr / 1fr 1fr;
  gap: 1rem;
`

const NavItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const light = keyframes`
    0%{
        fill: red;
    }
    5%{
        fill: inherit;
    }
    10%{
        fill: red;
    }
    15%{
        fill: inherit;
    }
    20%{
        fill: red;
    }
    25%{
        fill: inherit;
    }
    30%{
        fill: red;
    }
    35%{
        fill: inherit;
    }
    100%{
        fill: inherit;
    }
    
`

const PrevNode = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  h5 {
    line-height: 1.5rem;
    word-break: keep-all;
  }
  span {
    margin-left: 3rem;
    font-size: 0.9rem;
    font-weight: 300;
  }
  &:hover {
    ${NavItem} {
      svg {
        animation: ${light} 1s linear;
        fill: red;
      }
    }
  }
`

const PrevLink = styled(Link)`
  grid-area: prev;
`

const NextLink = styled(Link)`
  grid-area: next;
`

const NextNode = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  h5 {
    line-height: 1.5rem;
    word-break: keep-all;
  }
  span {
    margin-right: 3rem;
    font-size: 0.9rem;
    font-weight: 300;
  }
  &:hover {
    ${NavItem} {
      svg {
        animation: ${light} 1s linear;
        fill: red;
      }
    }
  }
`

const StyledTiArrowLeftOutline = styled(TiArrowLeftOutline)`
  margin-right: 1rem;
  font-size: 2rem;
`

const StyledTiArrowRightOutline = styled(TiArrowRightOutline)`
  margin-left: 1rem;
  font-size: 2rem;
`

export const BlogNav: React.FC<IBlogNavProps> = ({
  pageContext: { prevNode, nextNode },
}) => {
  return (
    <Nav>
      {prevNode && (
        <PrevLink to={`/blog/${prevNode.fields.slug}`}>
          <PrevNode>
            <span>Previous Post</span>
            <NavItem>
              <StyledTiArrowLeftOutline />
              <h5>{prevNode.frontmatter.title}</h5>
            </NavItem>
            <span>{prevNode.timeToRead} min read</span>
          </PrevNode>
        </PrevLink>
      )}
      {nextNode && (
        <NextLink to={`/blog/${nextNode.fields.slug}`}>
          <NextNode>
            <span>Next Post</span>
            <NavItem>
              <h5>{nextNode.frontmatter.title}</h5>
              <StyledTiArrowRightOutline />
            </NavItem>
            <span>{nextNode.timeToRead} min read</span>
          </NextNode>
        </NextLink>
      )}
    </Nav>
  )
}
