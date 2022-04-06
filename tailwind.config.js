module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./projects/soundcore-ngx/**/*.{html,ts,scss,css}",
    "./node_modules/soundcore-ngx/**/*.{html,ts,scss,css}"
  ],
  theme: {
    extend: {
      colors: {
        body: {
          light: "#2d2d2d",
          DEFAULT: "#191919",
          dark: "#000000"
        },
        accent: {
          DEFAULT: "#ffbf50"
        },
        font: {
          secondary: "#7b7b7b",
          DEFAULT: "#d4d4d4",
          tertiary: "#434343"
        },
        error: {
          light: "#D25D5D",
          DEFAULT: "#c75151",
          dark: "#B94848"
        },
        warn: {
          light: "#FBC06E",
          DEFAULT: "#f0ad4e",
          dark: "#DE9939"
        },
        success: {
          light: "#66A55B",
          DEFAULT: "#538d4a",
          dark: "#497E40"
        },
        info: {
          light: "#378FC2",
          DEFAULT: "#277cad",
          dark: "#23719E"
        }
      }
    },
    fontSize: {
      xs: ["10px", { lineHeight: "0.96rem" }],
      sm: ["13px", { lineHeight: "1.2rem" }],
      base: ["15px", { lineHeight: "1.5rem" }],
      md: ["20px", { lineHeight: "1.8rem" }],
      lg: ["25px", { lineHeight: "2.2rem" }],
      xl: ["31px", { lineHeight: "2.8rem" }],
      "2xl": ["39px", { lineHeight: "3.5rem" }],
      "3xl": ["48px", { lineHeight: "4.3rem" }],
      "4xl": ["56px", { lineHeight: "5.0rem" }],
    },
    fontWeight: {
      light: 400,
      normal: 500,
      semi: 600,
      bold: 700
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp")
  ]
}
