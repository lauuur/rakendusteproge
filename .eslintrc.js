module.exports = {
    "env": {
        "browser": true,
        "node": true,
        "es6": true
    },
    "extends": [
        "eslint:recommended", 
        "plugin:react/recommended"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 2019,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "semi": ["error", "always"],
        "quotes": ["error", "double"],
        "no-unused-vars": "off",
    },
    "settings": {
        "react": {
          "version": "detect"
        }
      },
};