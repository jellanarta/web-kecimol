import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks('jadwal semua kecimol terbaru hari ini'),
    description: KapitalTeks('daftar semua jadwal kecimol lombok nusa tenggara barat hari ini'),
    keywords: 'jadwal kecimol hari ini, jadwal kecimol, job kecimol, daftar jadwal kecimol, kecimol jadwal, kecimol lombok nusa tenggara barat'
}
export const metadata = {
    title: dataoke.title,
    description: dataoke.description,
    keywords: dataoke.keywords,
    robots: {
        index: true,
        follow: true,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/jadwal.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal`,
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
