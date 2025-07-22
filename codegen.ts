import type { CodegenConfig } from '@graphql-codegen/cli'

const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer `,
          'User-Agent': 'github-search',
        },
      },
    },
  ],
  documents: 'src/graphql/**/*.graphql',
  generates: {
    'src/app/api/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        {
          'typescript-rtk-query': {
            importBaseApiFrom: './baseApi',
            exportHooks: true,
          },
        },
      ],
      config: {
        exportHooks: true,
      },
    },
  },
}
export default config
