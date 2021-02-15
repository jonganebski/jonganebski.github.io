import { CreateNodeArgs, CreatePagesArgs } from "gatsby"
import path from "path"

export const onCreateNode = ({ node, actions }: CreateNodeArgs) => {
  const { createNodeField } = actions
  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath as string, ".md")
    createNodeField({
      node,
      name: "slug",
      value: slug,
    })
  }
}

interface ISlugQuery {
  allMarkdownRemark: {
    edges: {
      node: {
        fields: {
          slug: string
        }
      }
    }[]
  }
}

const SLUG = `
query {
  allMarkdownRemark {
    edges {
      node {
        fields {
          slug
        }
      }
    }
  }
}
`

export const createPages = async ({ graphql, actions }: CreatePagesArgs) => {
  const { createPage } = actions
  const blogTemplate = path.resolve("./src/templates/blog.tsx")
  const { data, errors } = await graphql<ISlugQuery>(SLUG)

  if (errors || !data) {
    throw new Error("Failed fetching posts")
  }

  data.allMarkdownRemark.edges.forEach(edge => {
    createPage({
      component: blogTemplate,
      path: `/blog/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    })
  })
}
