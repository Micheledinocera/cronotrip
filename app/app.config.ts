// Semantic colors of the design system "Atlante": the scales are in assets/css/main.css.
export default defineAppConfig({
  ui: {
    colors: {
      primary: 'atlante',
      secondary: 'terracotta',
      neutral: 'carta',
      success: 'green',
      info: 'atlante',
      warning: 'amber',
      error: 'red',
    },
    button: {
      defaultVariants: {size: 'md'},
    },
  },
});
