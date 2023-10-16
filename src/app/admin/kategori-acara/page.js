import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks('kategori jadwal untuk para kecimol'),
    description: KapitalTeks('daftar kategori acara untuk para kecimol membuat sebuah jadwal'),
    keywords: 'kategori acara, acara kecimol, kecimol nyongkolan, kecimol bejogetan'
}
export const metadata = {
    title: dataoke.title,
    description: dataoke.description,
    keywords: dataoke.keywords,
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/admin/kategori-acara`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    robots: {
        index: false,
        follow: false,
        nocache: true,
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/kategoriacara.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/admin/kategori-acara`,
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
