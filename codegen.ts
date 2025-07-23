import type { CodegenConfig } from '@graphql-codegen/cli'
import dotenv from 'dotenv'

dotenv.config({ path: './.env.local' })

const token = process.env.NEXT_PUBLIC_API_TOKEN

const config: CodegenConfig = {
  schema: [
    {
      'https://api.github.com/graphql': {
        headers: {
          Authorization: `Bearer ${token}`,
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
