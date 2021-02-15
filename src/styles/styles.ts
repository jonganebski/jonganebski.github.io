import { createGlobalStyle } from "styled-components"

export const CLASSNAMES = {
  ACTIVE_LINK: "active-link",
}

export const GlobalStyle = createGlobalStyle`
    *{
      box-sizing:border-box;
    }
    a{
      text-decoration:none;
      color: black;
    }
    .${CLASSNAMES.ACTIVE_LINK}{
      color: rgba(0, 0, 0, 0.9)
    }
  `
