import ReduxProvider from '@/redux/provider'
import './globals.css'
import { Roboto } from 'next/font/google'
import 'react-calendar/dist/Calendar.css';
import '@splidejs/splide/dist/css/splide.min.css';
import { KapitalTeks } from '../../lib/public/fnc';

const inter = Roboto({
  subsets: ['latin'],
  weight: ['400']
})
const dataoke = {
  title: KapitalTeks('kecimol lombok nusa tenggara barat'),
  description: KapitalTeks('kumpulan semua kecimol lombok nusa tenggara barat. dapatkan informasi terbaru seputar kecimol hanya di kecimol.com'),
  keywords: 'kecimol lombok, kumpulan kecimol, daftar kecimol lombok, informasi kecimol, berita kecimol, data kecimol, jadwal kecimol, layanan kecimol, lombok kecimol, website kecimol'
}
export const metadata = {
  ...dataoke,
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_CLIENT}/`,
    languages: {
      'id-ID': '/id-ID',
    },
  },
  robots: {
    index: true,
    follow: true,
    nocache: true
  },
  openGraph: {
    title: dataoke.title,
    description: dataoke.description,
    images: '/kecimol-lombok-nusa-tenggara-barat.png',
    url: `${process.env.NEXT_PUBLIC_CLIENT}/`,
    type: 'article',
    locale: 'id_ID',
    authors: process.env.NEXT_PUBLIC_AUTHOR
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <ReduxProvider>
        <body className={inter.className + ' bg-gray-50'}>
          {children}
        </body>
      </ReduxProvider>
    </html>
  )
}
