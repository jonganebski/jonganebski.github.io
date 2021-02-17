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
    99%{
        fill: inherit;
    }
    100%{
        fill: red;
    }
    
`

const PrevNode = styled.div`
  height: 100%;
  grid-area: prev;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const NextNode = styled.div`
  grid-area: next;
`

const StyledTiArrowLeftOutline = styled(TiArrowLeftOutline)`
  margin-right: 1rem;
  font-size: 2rem;
`

const StyledTiArrowRightOutline = styled(TiArrowRightOutline)`
  font-size: 2rem;
`

export const BlogNav: React.FC<IBlogNavProps> = ({
  pageContext: { prevNode, nextNode },
}) => {
  return (
    <Nav>
      {prevNode && (
        <Link to={`/blog/${prevNode.fields.slug}`}>
          <PrevNode>
            <span>Previous Post</span>
            <NavItem>
              <StyledTiArrowLeftOutline />
              <h5>{prevNode.frontmatter.title}</h5>
            </NavItem>
            <span>sss</span>
          </PrevNode>
        </Link>
      )}
      {nextNode && (
        <NextNode>
          <StyledTiArrowRightOutline />
          <span>Next Post</span>
          <h5>{nextNode.frontmatter.title}</h5>
        </NextNode>
      )}
    </Nav>
  )
}
