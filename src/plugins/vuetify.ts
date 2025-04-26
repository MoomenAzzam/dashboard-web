/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";

// Composables
import { createVuetify } from "vuetify";

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  theme: {
    defaultTheme: "light",
    themes: {
      light: {
        // <-- Note the 'light' theme object
        colors: {
          background: "#E5E5E5",
          surface: "#FFFFFF",
          "surface-bright": "#FFFFFF",
          "surface-light": "#EEEEEE",
          "surface-variant": "#424242",
          "on-surface-variant": "#EEEEEE",
          primary: "#1867C0",
          "primary-darken-1": "#1F5592",
          secondary: "#48A9A6",
          "secondary-darken-1": "#018786",
          error: "#B00020",
          info: "#2196F3",
          success: "#4CAF50",
          warning: "#FB8C00",
          "custom-purple": "#605BFF",
          "custom-purple-hover": "#5853f7",
          "custom-orange": "#FF8F6B",
          "custom-sky": "#26C0E2",
          "custom-green": "#3A974C",
          "custom-backgorund": "#E5E5E5",
          "custom-background-light": "#FFFFFF",
        },
      },
    },
  },
});
