import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import { Poppins } from 'next/font/google'
import { useState } from 'react'
import { FormDataProvider } from '@/contexts/formDataContext'


const poppins = Poppins({
  subsets: ['latin'],
  weight: '400'
})

export default function App({ Component, pageProps }: AppProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    startDate: '',
    street: '',
    city: '',
    state: '',
    selectState: '',
    zipCode: '',
    selectDepartment: '',
    department: ''
  })

  return (
    <FormDataProvider value={{ formData, setFormData }}>
    <main className={poppins.className}>
      <Component {...pageProps} />
    </main>
    </FormDataProvider>
  )
}
