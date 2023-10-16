import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks(`daftar kecimol yang di ikuti`),
    description: KapitalTeks('daftar semua kecimol yang anda ikuti di kecimol.com'),
    keywords: 'ikuti kecimol, kecimol lombok, lombok kecimol, ikuti kecimol lombok'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: true,
        follow: true,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/diikuti`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/diikuti.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/diikuti`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}
export default function Page() {
    return (
        <Parent />
    )
}
