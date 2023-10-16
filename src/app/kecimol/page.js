import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"

const dataoke = {
    title: KapitalTeks(`Daftar semua kecimol lombok nusa tenggara barat NTB`),
    description: KapitalTeks("daftar semua kecimol lombok nusa tenggara barat yang sudah bergabung di kecimol.com. Temukan dan ikuti kecimol favorit anda"),
    keywords: 'daftarkan kecimol, kecimol lombok, lombok kecimol, kumpulan kecimol lombok, daftar kecimol lombok, kecimol lombok terbaru, kecimol hari ini'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: true,
        follow: true,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/halamankecimol.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}
const ambilsemuakecimoldong = async () => {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/all-kecimol`, {
        method: "GET",
        cache: 'no-store',
    })
}
export default async function Page() {
    const datahasil = await ambilsemuakecimoldong()
    const dataokeni = await datahasil.json()
    return (
        <Parent datakecimol={{ status: datahasil.status, kecimol: dataokeni }} />
    )
}
