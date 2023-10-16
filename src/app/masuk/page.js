import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: KapitalTeks('masuk akun kecimol.com'),
    description: KapitalTeks('Yuk masuk dulu ke akun mu untuk melihat apa yang baru di kecimol.com'),
    keywords: 'masuk keicmol.com, masuk akun kecimol.com, kecimol masuk, masuk kecimol, masuk dalam akun kecimol.com, cara masuk akun kecimol.com',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/masuk`,
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
        title: KapitalTeks('masuk akun kecimol.com'),
        images: '/masuk.jpg',
        description: KapitalTeks('Yuk masuk dulu ke akun mu untuk melihat apa yang baru di kecimol.com'),
        url: `${process.env.NEXT_PUBLIC_CLIENT}/masuk`,
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
