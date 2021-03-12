import React, { useEffect, useRef } from "react"
import { styled } from "../styles/themes"
import { IProjectNode } from "../dtos/project.dto"

// ------------------------
//    Interfaces
// ------------------------

interface IProjectProps {
  node: IProjectNode
}

// ------------------------
//    Styled Components
// ------------------------

const ProjectLi = styled.li`
  width: 100%;
  max-width: 750px;
`

const Title = styled.h2`
  font-size: 2.2rem;
`

const Article = styled.article`
<<<<<<< HEAD
=======
  margin-bottom: 2rem;
  span {
    margin: 2rem 0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
      0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }
>>>>>>> main
  p {
    font-family: "Nanum Gothic", sans-serif;
    line-height: 1.7rem;
  }
`

const TechsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, max-content));
  gap: 1rem;
  font-weight: 300;
`

// ------------------------
//    Main Component
// ------------------------

export const Project: React.FC<IProjectProps> = ({ node }) => {
  const projectRef = useRef<HTMLLIElement | null>(null)

  useEffect(() => {
    let prevRatio = 0
    const getThresholds = () => {
      const thresholds = []
      const steps = 20
      for (let i = 1; i <= steps; i++) {
        const ratio = i / steps
        thresholds.push(ratio)
      }
      thresholds.push(0)
      return thresholds
    }

    const intersectionObserverCallback: IntersectionObserverCallback = (
      entries: IntersectionObserverEntry[]
    ) => {
      entries.forEach(entry => {
        if (projectRef.current) {
          if (entry.intersectionRatio > prevRatio) {
            projectRef.current.style.opacity = entry.intersectionRatio * 2 + ""
          } else {
          }
          prevRatio = entry.intersectionRatio
        }
      })
    }

    if (projectRef.current) {
      const intersactionObserver = new IntersectionObserver(
        intersectionObserverCallback,
        { threshold: getThresholds() }
      )
      intersactionObserver.observe(projectRef.current)
    }
  }, [])

  return (
    <ProjectLi ref={projectRef}>
      <Title>{node.frontmatter.title}</Title>
<<<<<<< HEAD
      <OutboundLink href={node.frontmatter.href} target="_blank" rel="noopener">
        <GatsbyImg
          fluid={node.frontmatter.featuredImage?.childImageSharp.fluid}
          style={{
            boxShadow:
              "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
        />
      </OutboundLink>
=======
>>>>>>> main
      <Article dangerouslySetInnerHTML={{ __html: node.html }} />
      <TechsList>
        {node.frontmatter.techs.map((tech, i) => (
          <li key={i}>{tech}</li>
        ))}
      </TechsList>
    </ProjectLi>
  )
}
