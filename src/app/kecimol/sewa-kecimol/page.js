import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks('sewa kecimol untuk acara anda'),
    description: KapitalTeks('cari kecimol untuk di gunakan pada acara anda. Masukan tanggal acara agar sistem kami bisa menampilkan kecimol yang jadwalnya kosong pada tanggal acara yang sudah anda tetapkan'),
    keywords: 'sewa kecimol, tanggep kecimol, tampah kecimol, kecimol lombok, kecimol ntb, kecimol'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: true,
        follow: true,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/sewa-kecimol`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/sewakecimol.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/sewa-kecimol`,
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
