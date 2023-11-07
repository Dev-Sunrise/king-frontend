import Header from '@/components/Header'
import { Manrope } from 'next/font/google'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import ProvidersTheme from './ProvidersTheme'
import './globals.scss'

const manrope = Manrope({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin']
})

export const metadata = {
  title: 'King'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={manrope.className}>
        <ProvidersTheme>
          <Header></Header>
          <div className="container-page">{children}</div>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover={false}
            theme="light"
          />
        </ProvidersTheme>
      </body>
    </html>
  )
}
