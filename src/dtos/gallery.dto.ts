export interface IGalleryNode {
  id: string
  frontmatter: {
    title: string
    date: string
    coverUrl: string
  }
  html: string
}

export interface IGalleryMarkdownsQuery {
  allMarkdownRemark: {
    edges: {
      node: IGalleryNode
    }[]
  }
}
