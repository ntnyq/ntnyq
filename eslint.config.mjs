// @ts-check

import { defineESLintConfig } from '@ntnyq/eslint-config'

export default defineESLintConfig({
  specials: {
    overridesScriptsRules: {
      'antfu/top-level-function': 'error',
    },
  },
})
