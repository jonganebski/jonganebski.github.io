export interface IProjectNode {
  id: string
  frontmatter: {
    title: string
    techs: string[]
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
