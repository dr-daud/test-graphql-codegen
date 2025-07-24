'use client'

import { Provider } from 'react-redux'

import { store } from '@/store/store'
import { CssBaseline } from '@mui/material'

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <main>
          <Provider store={store}>
            {children}
            <CssBaseline />
          </Provider>
        </main>
      </body>
    </html>
  )
}
