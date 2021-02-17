export interface IBlogPostNode {
  id: string
  timeToRead: number
  frontmatter: {
    title: string
    date: string
    coverUrl: string
  }
  fields: {
    slug: string
  }
}

export interface IBlogMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: IBlogPostNode
    }[]
  }
}

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
