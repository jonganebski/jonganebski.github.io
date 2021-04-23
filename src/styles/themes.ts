import baseStyled, { ThemedStyledInterface } from "styled-components"

// ------------------------
//    Interfaces
// ------------------------

interface IFontSizes {
  xxl: string
  xl: string
  lg: string
  md: string
  sm: string
  xs: string
}

export interface IMyTheme {
  bgColor: {
    background: string
    pre: string
    code: string
    switch: string
    alter: string
  }
  textColor: {
    rare: string
    base: string
    shade: string
    linkHover: string
  }
  borderColor: {
    base: string
    hover: string
    switch: string
  }
  fontSize: IFontSizes
  fontSizeClamp: IFontSizes
}

// ------------------------
//    Constants
// ------------------------

const BACKGROUND_COLOR = {
  LIGHT: "white",
  DARK: "#0d1117",
}

const FONT_SIZE: IFontSizes = {
  xxl: "3rem",
  xl: "2.5rem",
  lg: "1.5rem",
  md: "1.1rem",
  sm: "1rem",
  xs: "0.9rem",
}

const FONT_SIZE_CLAMP: IFontSizes = {
  xxl: "clamp(3rem, 10vw, 6rem)",
  xl: "clamp(2.5rem, 9vw, 3rem)",
  lg: "clamp(1.5rem, 7vw, 2rem)",
  md: "clamp(1.1rem, 5vw, 1.3rem)",
  sm: "clamp(1rem, 3vw, 1.2rem)",
  xs: "clamp(0.9rem, 1vw, 1.1rem)",
}

// ------------------------
//    Themes
// ------------------------

const sharedTheme = { fontSize: FONT_SIZE, fontSizeClamp: FONT_SIZE_CLAMP }

export const lightTheme: IMyTheme = {
  ...sharedTheme,
  bgColor: {
    background: BACKGROUND_COLOR.LIGHT,
    pre: "rgb(235, 235, 235)",
    code: "rgb(235, 235, 235)",
    switch: "#da3633",
    alter: BACKGROUND_COLOR.DARK,
  },
  textColor: {
    rare: "black",
    base: "rgb(30, 30, 30)",
    shade: "rgb(200, 200, 200)",
    linkHover: "#1f6feb",
    // linkHover: "#0366d6",
  },
  borderColor: {
    base: "rgb(220, 220, 220)",
    hover: "rgb(150, 150, 150)",
    switch: "#ffa198",
  },
}

export const darkTheme: IMyTheme = {
  ...sharedTheme,
  bgColor: {
    background: BACKGROUND_COLOR.DARK,
    pre: "rgb(22 27 34)",
    code: "#23241f",
    switch: BACKGROUND_COLOR.DARK,
    alter: BACKGROUND_COLOR.DARK,
  },
  textColor: {
    rare: "white",
    base: "#c9d1d9",
    shade: "rgb(80, 80, 80)",
    linkHover: "#388bfd",
    // linkHover: "#58a6ff",
  },
  borderColor: {
    base: "rgb(50, 50, 50)",
    hover: "rgb(150, 150, 150)",
    switch: "#8b949e",
  },
}

// ---------------------------
//    Extended Base Styled
// ---------------------------

export const styled = baseStyled as ThemedStyledInterface<IMyTheme>
