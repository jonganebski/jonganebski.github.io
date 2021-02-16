import { RemarkConfig, RemarkOptions } from "gatsby-transformer-remark"
import { FileSystemConfig } from "gatsby-source-filesystem"

const GATSBY_PLUGIN_STYLED_COMPONENTS = "gatsby-plugin-styled-components"

const GATSBY_TRANSFORMER_REMARK: RemarkConfig = {
  resolve: `gatsby-transformer-remark`,
  options: {},
}

const GATSBY_SOURCE_FILESYSTEM: FileSystemConfig = {
  resolve: `gatsby-source-filesystem`,
  options: {
    name: "posts",
    path: `${__dirname}/../posts`,
  },
}

export default {
  siteMetadata: {},
  plugins: [
    {
      resolve: "gatsby-plugin-web-font-loader",
      options: {
        google: {
          families: ["Droid Sans", "Nanum Gothic"],
        },
      },
    },
    GATSBY_PLUGIN_STYLED_COMPONENTS,
    GATSBY_SOURCE_FILESYSTEM,
    GATSBY_TRANSFORMER_REMARK,
  ],
}
