import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
import { IContext, IContextQuery } from "../dtos/context.dto"
import path from "path"

export const onCreateNode = ({ node, getNode, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath as string, ".md")
    const type = createFilePath({ node, getNode, basePath: "posts" }).split(
      "/"
    )[1]
    createNodeField({ node, name: "slug", value: slug })
    createNodeField({ node, name: "type", value: type })
  }
}

const CONTEXTS_QUERY = `
query ContextsQuery {
  allMarkdownRemark {
    edges {
      node {
        frontmatter{
          title
        }
        timeToRead
        fields {
          slug
          type
        }
      }
    }
  }
}
`

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.tsx")
  const { data, errors } = await graphql<IContextQuery>(CONTEXTS_QUERY)

  if (errors || !data) {
    throw new Error("Failed fetching posts")
  }

  data.allMarkdownRemark.edges
    .filter(edge => edge.node.fields.type === "blog")
    .forEach((edge, i, edges) => {
      const { slug, type } = edge.node.fields
      const prevNode = i === 0 ? null : edges[i - 1].node
      const nextNode = i === edges.length - 1 ? null : edges[i + 1].node
      const context: IContext = { slug, type, prevNode, nextNode }

      createPage({
        component: blogTemplate,
        path: `/${type}/${slug}`,
        context,
      })
    })
}
