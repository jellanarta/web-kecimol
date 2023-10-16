import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: KapitalTeks('Profile user'),
    description: KapitalTeks('Halaman akun user kecimol.com'),
    keywords: 'akun kecimol.com, halaman profil kecimol.com, user kecimol.com',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/user`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
    robots: {
        index: false,
        follow: false,
        nocache: true,
        noimageindex: true,
    },
    openGraph: {
        title: KapitalTeks('Profile user'),
        images: '/masuk.jpg',
        description: KapitalTeks('Halaman akun user kecimol.com'),
        url: `${process.env.NEXT_PUBLIC_CLIENT}/user`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    }
}

export default async function Page() {
    return (
        <Parent />
    )
}
