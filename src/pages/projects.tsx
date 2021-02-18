import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Helmet } from "react-helmet"
import { Layout } from "../components/layout"
import { Project } from "../components/project"
import { IProjectMarkdownsQuery } from "../dtos/project.dto"
import { styled } from "../styles/themes"

const PROJECT_MARKDOWNS = graphql`
  query ProjectMarkdowns {
    allMarkdownRemark(
      filter: { fields: { type: { eq: "projects" } } }
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            techs
          }
          fields {
            slug
          }
          html
        }
      }
    }
  }
`

const Main = styled.main`
  width: 100%;
  padding: 8rem 0;
  max-width: 1000px;
`

const ProjectsList = styled.ul`
  width: 100%;
  display: grid;
  place-items: center;
  gap: 10rem;
`

const ProjectsPage = () => {
  const data = useStaticQuery<IProjectMarkdownsQuery>(PROJECT_MARKDOWNS)

  return (
    <Layout>
      <Helmet title="Projects | JonGanebski" />
      <Main>
        <ProjectsList>
          {data.allMarkdownRemark.edges.map(edge => {
            return <Project node={edge.node} key={edge.node.id} />
          })}
        </ProjectsList>
      </Main>
    </Layout>
  )
}

export default ProjectsPage
