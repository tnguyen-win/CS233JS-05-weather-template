import globals from "globals";
import pluginJs from "@eslint/js";


export default [
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,

    {
        rules: {
            "import/no-duplicates": "off",
            "multiline-ternary": "off",
            "space-before-function-paren": "off",
            "no-undef": "off",
            "no-tabs": "warn",
            "no-case-declarations": "off",
            "indent": [
                "warn",
                4,
                {
                    "SwitchCase": 1
                }
            ],
            "quotes": [
                "warn",
                "single"
            ],
            "semi": [
                "warn",
                "always"
            ],
            "no-array-constructor": "warn",
            "no-unused-vars": "warn",
            "eqeqeq": "warn",
            "no-console": "warn"
        }
    }
];
