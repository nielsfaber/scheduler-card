import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "no-unsafe-optional-chaining": "off",
      "no-prototype-builtins": "off",
      "no-cond-assign": "off",
      "no-useless-escape": "off",
      "no-case-declarations": "off",
      "no-duplicate-case": "off",
      "no-empty": "off",
    },
  },
  {
    ignores: ["dist/", "node_modules/", "rollup.config.mjs", "stats.html"],
  }
);
