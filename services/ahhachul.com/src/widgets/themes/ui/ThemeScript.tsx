export const ThemeScript = () => {
  const initDarkTheme = `
          (() => {
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
          })();
        `;

  return <script dangerouslySetInnerHTML={{ __html: initDarkTheme }} />;
};
