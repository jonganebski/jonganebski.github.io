import { RemarkConfig, RemarkOptions } from "gatsby-transformer-remark"
import { FileSystemConfig } from "gatsby-source-filesystem"

const GATSBY_PLUGIN_STYLED_COMPONENTS = "gatsby-plugin-styled-components"

const GATSBY_PLUGIN_SHARP = "gatsby-plugin-sharp"

const GATSBY_PLUGIN_WEB_FONT_LOADER = {
  resolve: "gatsby-plugin-web-font-loader",
  options: {
    google: {
      families: ["Inconsolata", "Nanum Gothic"],
    },
  },
}

const GATSBY_TRANSFORMER_REMARK: RemarkConfig = {
  resolve: `gatsby-transformer-remark`,
  options: {
    plugins: [
      "gatsby-remark-relative-images",
      {
        resolve: "gatsby-remark-images",
        options: {
          maxWidth: 750,
          linkImagesToOriginal: false,
        },
      },
    ],
  },
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
    GATSBY_PLUGIN_WEB_FONT_LOADER,
    GATSBY_PLUGIN_STYLED_COMPONENTS,
    GATSBY_SOURCE_FILESYSTEM,
    GATSBY_PLUGIN_SHARP,
    GATSBY_TRANSFORMER_REMARK,
  ],
}
