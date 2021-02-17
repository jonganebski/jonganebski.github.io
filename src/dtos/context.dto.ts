type NodeType = "blog" | "projects"

export interface IContextQueryNode {
  frontmatter: {
    title: string
  }
  timeToRead: number
  fields: {
    slug: string
    type: NodeType
  }
}

export interface IContextQuery {
  allMarkdownRemark: {
    edges: {
      node: IContextQueryNode
    }[]
  }
}

export interface IContext {
  slug: string
  type: NodeType
  prevNode: IContextQueryNode | null
  nextNode: IContextQueryNode | null
}
