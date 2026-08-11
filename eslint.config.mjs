import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/*
  Flat config (ESLint 9). `eslint-config-next/core-web-vitals` already exports
  a flat array, so it spreads in directly — no FlatCompat shim needed.

  Note that the Next preset does NOT enable `no-unused-vars`, which is why four
  unused `Head` imports sat in pages/ unnoticed. It's switched on below, as a
  warning so it never blocks a build.
*/
const config = [
  {
    ignores: [
      '.next/**',
      'out/**',
      'node_modules/**',
      'assets/**',        // gitignored image sources
      'public/**',
    ],
  },

  ...nextCoreWebVitals,

  {
    rules: {
      'no-unused-vars': [
        'warn',
        {
          args: 'after-used',
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],

      /*
        Apostrophes and quotes in prose are valid JSX text and render
        correctly. Escaping them to &apos;/&quot; only makes the copy harder
        to read and edit, with no user-visible benefit.
      */
      'react/no-unescaped-entities': 'off',

      /*
        Downgraded from error to warn, deliberately.

        The remaining hits are all the same shape: reading a browser API on
        mount (matchMedia, ontouchstart, router.pathname) and storing the
        result. That needs an effect in a statically exported app, because
        none of those exist at prerender time. Converting them properly means
        useSyncExternalStore and a behavioural rewrite of Navbar,
        ResearchGraph and the homepage — worth doing, but not as part of
        adding a linter. Left visible so it isn't forgotten.
      */
      'react-hooks/set-state-in-effect': 'warn',
    },
  },

  {
    // Build and maintenance scripts run in Node, not the browser.
    files: ['scripts/**/*.js', '*.config.js'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { require: 'readonly', module: 'writable', process: 'readonly', __dirname: 'readonly', console: 'readonly' },
    },
  },
]

export default config
