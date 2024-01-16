import "@ahhachul/design-system/themes.css";
import "./style.css";

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    rootAttributesTooltip: true,
    rootAttributes: [
      {
        root: "body",
        attribute: "class",
        defaultState: {
<<<<<<< HEAD
          name: "dark",
          value: "theme-dark",
        },
        states: [
          {
            name: "light",
            value: "theme-light",
=======
          name: "light",
          value: "theme-light",
        },
        states: [
          {
            name: "dark",
            value: "theme-dark",
>>>>>>> main
          },
        ],
      },
    ],
  },
};

const initTheme = () => {
  const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (isDarkTheme) {
    document.body.classList.add("theme-dark");
  }

  const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

  mediaQueryList.addEventListener("change", (e) => {
    if (e.matches) {
      document.body.classList.add("theme-dark");
    } else {
      document.body.classList.remove("theme-dark");
    }
  });
};

<<<<<<< HEAD
initTheme();
=======
// initTheme();
>>>>>>> main

export default preview;
