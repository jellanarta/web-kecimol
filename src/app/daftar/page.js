import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: 'Buat Akun Baru Di Website Kecimol',
    description: KapitalTeks('buat akun baru di website kecimol.com untuk mengikuti kecimol favorit anda'),
    keywords: 'daftar kecimol.com, buat akun baru kecimol.com, register kecimol.com',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/daftar`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
    robots: {
        index: true,
        follow: true,
        nocache: true,
        noimageindex: true,
    },
    openGraph: {
        title: 'Buat Akun Baru Di Website Kecimol',
        images: '/daftar.jpg',
        description: KapitalTeks('buat akun baru di website kecimol.com untuk mengikuti kecimol favorit anda'),
        url: `${process.env.NEXT_PUBLIC_CLIENT}/daftar`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    }
}
export default function Page() {
    return (
        <Parent />
    )
}
