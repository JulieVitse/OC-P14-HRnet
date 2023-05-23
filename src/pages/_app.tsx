import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { AppWrapper } from '@/contexts/AppContext'
import 'julie-react-ts-modal/dist/index.css' // modal styles

const poppins = Poppins({
  subsets: ['latin'],
  weight: '400',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <main className={poppins.className}>
        <Component {...pageProps} />
      </main>
    </AppWrapper>
  )
}
