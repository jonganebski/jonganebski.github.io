import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import { createFilePath } from "gatsby-source-filesystem"
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

interface ISlugQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string
          type: "blog" | "projects"
        }
      }
    }[]
  }
}

const SLUG = `
query SlugQuery {
  allMarkdownRemark {
    edges {
      node {
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
  const projectTemplate = path.resolve("./src/templates/projects.tsx")
  const { data, errors } = await graphql<ISlugQuery>(SLUG)

  if (errors || !data) {
    throw new Error("Failed fetching posts")
  }

  data.allMarkdownRemark.edges.forEach(edge => {
    const { slug, type } = edge.node.fields
    createPage({
      component: type === "projects" ? projectTemplate : blogTemplate,
      path: `/${type}/${slug}`,
      context: { slug, type },
    })
  })
}
