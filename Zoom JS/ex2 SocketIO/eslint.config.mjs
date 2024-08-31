import globals from 'globals';
import pluginJs from '@eslint/js';

export default [
  {
    ...pluginJs.configs.recommended, // 추천 설정을 펼칩니다.
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      // 사용되지 않는 변수를 경고로 설정
      'no-unused-vars': 'warn',

      // 엄격한 동등성 체크 강제
      eqeqeq: ['warn', 'always', { null: 'ignore' }],

      // 불필요한 부울 캐스트 방지
      'no-extra-boolean-cast': 'warn',

      // 암묵적인 형 변환 방지
      'no-implicit-coercion': ['warn', { boolean: false, number: true, string: true, allow: [] }],

      // eslint-plugin-no-null 플러그인을 사용할 경우
      // 다음 줄의 주석을 해제하여 null 사용을 경고하도록 설정
      // 'no-null/no-null': 'warn',
    },
  },
];
