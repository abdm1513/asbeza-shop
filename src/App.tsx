// App.tsx
import { BrowserRouter } from 'react-router-dom'
import { Providers } from './app/providers'
import { AppRoutes } from './app/routes'
import { Layout } from './components/layout/Layout'
import { ScrollToTop } from './components/wrappers/ScrollToTop'

function App() {
  return (
    <BrowserRouter>
     <ScrollToTop />
      <Providers>
        <Layout>
          <AppRoutes />
        </Layout>
      </Providers>
    </BrowserRouter>
  )
}

export default App