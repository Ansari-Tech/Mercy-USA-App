module.exports = {
    "parser": "babel-eslint",
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "linebreak-style": 0,
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "no-use-before-define": ["error", { "functions": true, "classes": true, "variables": false }], // disable the rule for variables, but enable it for functions and classes
    }
};
