import { RemarkConfig } from "gatsby-transformer-remark"
import { FileSystemConfig } from "gatsby-source-filesystem"

const GATSBY_PLUGIN_STYLED_COMPONENTS = "gatsby-plugin-styled-components"
const GATSBY_PLUGIN_REACT_HELMET = `gatsby-plugin-react-helmet`
const GATSBY_PLUGIN_SHARP = "gatsby-plugin-sharp"
const GATSBY_PLUGIN_OFFLINE = `gatsby-plugin-offline`

const GATSBY_PLUGIN_MAIFEST = {
  resolve: `gatsby-plugin-manifest`,
  options: {
    name: `Jon Ganebski의 기술블로그`,
    short_name: `Jon Ganebski`,
    start_url: `/`,
    background_color: `#f7f0eb`,
    theme_color: `#a2466c`,
    display: `standalone`,
    icon: "./static/favicon.png",
  },
}

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
        },
      },
      {
        resolve: `gatsby-remark-vscode`,
        options: {
          theme: {
            default: "Abyss",
            parentSelector: {
              ".wrapper[data-theme=light]": "Solarized Light",
              ".wrapper[data-theme=dark]": "Dark+ (default dark)",
            },
          },
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
    GATSBY_PLUGIN_MAIFEST,
    GATSBY_PLUGIN_WEB_FONT_LOADER,
    GATSBY_PLUGIN_REACT_HELMET,
    GATSBY_PLUGIN_STYLED_COMPONENTS,
    GATSBY_SOURCE_FILESYSTEM,
    GATSBY_PLUGIN_SHARP,
    GATSBY_TRANSFORMER_REMARK,
    // GATSBY_PLUGIN_OFFLINE
  ],
}
