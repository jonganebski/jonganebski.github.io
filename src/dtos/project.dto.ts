import { FluidObject } from "gatsby-image"

export interface IProjectNode {
  id: string
  frontmatter: {
    title: string
    techs: string[]
    href: string
    featuredImage: {
      childImageSharp: {
        fluid: FluidObject
      }
    }
  }
  fields: {
    slug: string
  }
  html: string
}

export interface IProjectMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: IProjectNode
    }[]
  }
}
