import { cookies, headers } from "next/headers"
import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"
import { redirect } from "next/navigation"

const dataoke = {
    title: KapitalTeks('Kirim jadwal kecimol anda'),
    description: KapitalTeks('kirim jadwal kecimol anda untuk di tampilkan ke publik agar semua orang bisa melihat jadwal ini'),
    keywords: 'kategori acara, acara kecimol, kecimol nyongkolan, kecimol bejogetan'
}
export const metadata = {
    title: dataoke.title,
    description: dataoke.description,
    keywords: dataoke.keywords,
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal/new-jadwal`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    robots: {
        index: true,
        follow: true,
        nocache: true,
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/newjadwal.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/jadwal/new-jadwal`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

const ambillagikecimol = async (token, agent) => {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/user/kecimol-dan-dikelola`, {
        method: "GET",
        cache: 'no-store',
        headers: {
            'Authorization': token,
            'User-Agent': agent
        }
    })
}
export default async function Page() {
    const cookieuser = cookies()
    const dataheaders = headers()
    const tokenkecimol = cookieuser.get('tokenkecimolntb')
    if (!tokenkecimol) {
        redirect('/masuk')
    }
    const tokennya = tokenkecimol.value
    const agentnya = dataheaders.get('user-agent')
    // carikecimol aktiv atau yang dikelola disetujui dan aktiv
    const hasil = await ambillagikecimol(tokennya, agentnya)
    const jarinoke = { data: [] }
    if (!hasil || hasil.status !== 200) {
        redirect('/')
    } else {
        const jarin = await hasil.json()
        if (!jarin.length) {
            redirect('/')
        } else {
            jarinoke.data = jarin
        }
    }
    return (
        <>
            {
                hasil && hasil.status === 200 && jarinoke.data.length ?
                    <Parent semuakecimol={jarinoke.data} />
                    : null
            }
        </>
    )
}
