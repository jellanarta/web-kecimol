import { KapitalTeks } from "../../../lib/public/fnc"
import Parent from "./parent"
import { cookies } from 'next/headers'
import { headers } from "next/headers"
import { redirect } from 'next/navigation'

const dataoke = {
    title: KapitalTeks('daftar pengelola kecimol anda'),
    description: KapitalTeks('kelola daftar pengelola kecimol anda. tambahkan, edit atau hapus pengelola yang sudah anda tambahkan sebelumnya'),
    keywords: 'pengelola kecimol, kelola kecimol, tambahkan pengelola kecimol'
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
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/pengelola-kecimol`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    themeColor: process.env.NEXT_PUBLIC_WARNA_WEB,
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/daftar.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/pengelola-kecimol`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

async function userGetAllKecimol(token, agent) {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/kecimol/user-get-all-kecimol`, {
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
    const datakecimol = await userGetAllKecimol(tokennya, agentnya)
    // if (!datakecimol || datakecimol.status !== 200) {
    //     redirect('/')
    // }
    const hasildata = { datakecimol: [] }
    if (datakecimol && datakecimol.status === 200) {
        const jarinah = await datakecimol.json()
        if (!jarinah.length) {
            redirect('/')
        } else {
            hasildata.datakecimol = jarinah
        }
    } else {
        redirect('/')
    }
    return (
        <>
            {
                hasildata.datakecimol.length ?
                    <Parent kecimol={hasildata.datakecimol} />
                    : null
            }
        </>
    )
}
