import Image from "next/image"
import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

export const metadata = {
    title: KapitalTeks('daftarkan kecimol anda di kecimol.com'),
    description: KapitalTeks('Daftarkan kecimol anda di kecimol.com agar semua orang dan penggemar anda bisa melihat jadwal dan lokasi main kecimol anda.'),
    keywords: 'daftarkan kecimol, kecimol lombok nusa tenggara barat, kumpulan kecimol lombok nusa tenggara barat, kecimol ntb',
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/daftarkan-kecimol`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
    openGraph: {
        title: KapitalTeks('daftarkan kecimol anda di kecimol.com'),
        images: '/daftarkankecimol.jpg',
        description: KapitalTeks('Daftarkan kecimol anda di kecimol.com agar semua orang dan penggemar anda bisa melihat jadwal dan lokasi main kecimol anda.'),
        url: `${process.env.NEXT_PUBLIC_CLIENT}/daftarkan-kecimol`,
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