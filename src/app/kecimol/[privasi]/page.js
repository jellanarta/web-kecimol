import Parentnotfound from "@/components/notfound/parentnotfound";
import { KapitalTeks, pageprivasi } from "../../../../lib/public/fnc";
import Parent from "./parent";

export async function generateMetadata({ params }) {
    let hasilakhir = false
    const privasi = params.privasi
    let jarimodok = ''
    if (privasi) {
        const rbh = pageprivasi().map(dt => dt.split(" ").join("-"))
        if (rbh.includes(privasi)) {
            jarimodok = privasi.split("-").join(" ")
            hasilakhir = true
        }
    }
    if (hasilakhir) {
        const dataoke = {
            title: KapitalTeks(`halaman ${jarimodok} kecimol lombok nusa tenggara barat`),
            description: KapitalTeks(`dapatkan informasi tentang ${jarimodok} dari kecimol lombok nusa tenggara barat`),
            keywords: jarimodok
        }
        return {
            ...dataoke,
            alternates: {
                canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/${privasi}`,
                languages: {
                    'id-ID': '/id-ID',
                },
            },
            robots: {
                index: true,
                follow: true,
                nocache: true
            },
            openGraph: {
                title: dataoke.title,
                description: dataoke.description,
                images: '/halamankecimol.jpg',
                url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/${privasi}`,
                type: 'article',
                locale: 'id_ID',
                authors: process.env.NEXT_PUBLIC_AUTHOR
            },
        }
    } else {
        return {
            title: KapitalTeks(`404 : halaman privasi tidak di temukan`),
            description: KapitalTeks('halaman privasi yang anda cari tidak di temukan'),
            robots: {
                index: false,
                nocache: true
            }
        }
    }
}
export default function Page({ params }) {
    let hasilakhir = false
    const privasi = params.privasi
    let jarimodok = ''
    if (privasi) {
        const rbh = pageprivasi().map(dt => dt.split(" ").join("-"))
        if (rbh.includes(privasi)) {
            jarimodok = privasi.split("-").join(" ")
            hasilakhir = true
        }
    }
    return (
        <>
            {
                hasilakhir ?
                    <Parent />
                    :
                    <Parentnotfound teks={'halaman privasi'} />
            }
        </>
    )
}
