module.exports = {
  "extends": [
    "../../.eslintrc.js", 
    "next/core-web-vitals" 
  ],
  "rules": {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        "argsIgnorePattern": "^_",
        "varsIgnorePattern": "^React$"
      }
    ],
    "react/display-name": "off",
    "@next/next/no-img-element": "off",
    "import/no-anonymous-default-export": "off"
  }
}