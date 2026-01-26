import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default defineConfig([
  // Next.js Core Web Vitals rules
  ...nextVitals,

  // Disable ESLint rules that conflict with Prettier
  prettierConfig,

  // Run Prettier as an ESLint rule
  {
    plugins: {
      prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // Ignore build output
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
