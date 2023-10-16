import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: KapitalTeks('Lupa Password Akun Kecimol'),
    description: KapitalTeks('kembalikan password akun kecimol anda di sini'),
    keywords: 'akun kecimol.com, halaman profil kecimol.com, user kecimol.com',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/user/lupa-password`,
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
        title: KapitalTeks('Lupa Password Akun Kecimol'),
        description: KapitalTeks('kembalikan password akun kecimol anda di sini'),
        images: '/lupapassword.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/user/lupa-password`,
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
