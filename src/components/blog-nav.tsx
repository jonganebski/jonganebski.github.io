import React from "react"
import { IContext } from "../dtos/context.dto"
import { styled } from "../styles/themes"
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti"
import { Link } from "gatsby"

interface IBlogNavProps {
  pageContext: IContext
}

const NavItem = styled.div`
  cursor: pointer;
  span {
    font-size: 0.9rem;
    font-weight: 300;
  }
  h5 {
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.5rem;
    word-break: keep-all;
    margin: 1rem 0;
  }
`

const NodeDivCore = styled.div`
  height: 100%;
  display: grid;
  grid-auto-flow: column;
  place-items: center;
  gap: 1rem;
  svg {
    font-size: 2rem;
  }
  &:hover {
    svg {
      fill: #da3633;
    }
  }
`
const Nav = styled.nav`
  min-height: 5rem;
  margin: 7rem 0;
  display: grid;
  grid-template: "prev next" 1fr / 1fr 1fr;
  gap: 1rem;
`

const PrevNode = styled(NodeDivCore)`
  text-align: start;
`
const NextNode = styled(NodeDivCore)`
  text-align: end;
`

const PrevLink = styled(Link)`
  grid-area: prev;
`
const NextLink = styled(Link)`
  grid-area: next;
`

export const BlogNav: React.FC<IBlogNavProps> = ({
  pageContext: { prevNode, nextNode },
}) => {
  return (
    <Nav>
      {prevNode && (
        <PrevLink to={`/blog/${prevNode.fields.slug}`}>
          <PrevNode>
            <TiArrowLeftOutline />
            <NavItem>
              <span>Previous Post</span>
              <h5>{prevNode.frontmatter.title}</h5>
              <span>{prevNode.timeToRead} min read</span>
            </NavItem>
          </PrevNode>
        </PrevLink>
      )}
      {nextNode && (
        <NextLink to={`/blog/${nextNode.fields.slug}`}>
          <NextNode>
            <NavItem>
              <span>Next Post</span>
              <h5>{nextNode.frontmatter.title}</h5>
              <span>{nextNode.timeToRead} min read</span>
            </NavItem>
            <TiArrowRightOutline />
          </NextNode>
        </NextLink>
      )}
    </Nav>
  )
}
