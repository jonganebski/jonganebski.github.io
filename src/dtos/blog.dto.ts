export interface IBlogPostNode {
  id: string
  timeToRead: number
  excerpt: string
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
