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

export interface IBlogMarkdownQuery {
  markdownRemark: {
    frontmatter: {
      title: string
      data: string
      coverUrl: string
    }
    html: string
    timeToRead: number
  }
}
