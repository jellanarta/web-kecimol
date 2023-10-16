import Parentnotfound from "@/components/notfound/parentnotfound";
import { cekjamrequestjadwal } from "../../../../lib/fnc";
import { jadwalWithKategori } from "../../../../lib/jadwal/fnc";
import { KapitalTeks } from "../../../../lib/public/fnc";
import Parent from "./parent";

export async function generateMetadata({ params }) {
    const datajadwal = await jadwalWithKategori(params.kategorijadwal, cekjamrequestjadwal())
    const hakmumcari = { nama: null }
    if (params.kategorijadwal) {
        hakmumcari.nama = params.kategorijadwal.split("-").join(" ")
    }
    if (datajadwal && datajadwal.status === 200) {
        const title = KapitalTeks(`jadwal ${hakmumcari.nama} dari semua kecimol terbaru hari ini`)
        const description = KapitalTeks(`dapatkan semua jadwal ${hakmumcari.nama} terbaru hari ini dari semua kecimol yang ada di lombok nusa tenggara barat`)
        const keywords = `jadwal ${hakmumcari.nama}, informasi jadwal ${hakmumcari.nama}, ${hakmumcari.nama} kecimol lombok, lokasi ${hakmumcari.nama} kecimol ntb, lokasi acara ${hakmumcari.nama}, informasi ${hakmumcari.nama} kecimol lombok, kecimol ntb ${hakmumcari.nama}`
        return {
            title,
            description,
            keywords,
            robots: {
                index: true,
                follow: true,
                nocache: true
            },
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal/${params.kategorijadwal}`,
                languages: {
                    'id-ID': '/id-ID',
                },
            },
            openGraph: {
                title,
                description,
                images: `/jadwal.jpg`,
                url: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal/${params.kategorijadwal}`,
                type: 'article',
                locale: 'id_ID',
                authors: process.env.NEXT_PUBLIC_AUTHOR
            },
        }
    } else {
        return {
            title: KapitalTeks(`404 : Jadwal ${hakmumcari.nama} tidak ditemukan`),
            description: KapitalTeks(`jadwal ${hakmumcari.nama} tidak tersedia saat ini`),
            robots: {
                index: false,
                nocache: true
            }
        }
    }
}
export default async function Page({ params }) {
    const datajadwal = await jadwalWithKategori(params.kategorijadwal, cekjamrequestjadwal())
    return (
        <>
            {
                datajadwal && datajadwal.status === 200 ?
                    <Parent jadwal={datajadwal.data} />
                    :
                    <Parentnotfound teks={'jadwal'} />
            }
        </>
    )
}
