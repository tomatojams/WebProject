import globals from "globals";
import pluginJs from "@eslint/js";
import pluginImport from "eslint-plugin-import";

export default [
  {
    ...pluginJs.configs.recommended,
    languageOptions: {
      globals: globals.browser,
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      "no-unused-vars": "warn",
      "import/no-unresolved": "error", // 정의되지 않은 임포트가 있을 때 오류
      "import/named": "error", // 명명된 임포트가 잘못된 경우 오류
      "import/default": "error", // 기본 임포트가 잘못된 경우 오류
      "import/namespace": "error", // 네임스페이스 임포트가 잘못된 경우 오류
    },
  },
];
