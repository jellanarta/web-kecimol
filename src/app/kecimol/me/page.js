import { cookies, headers } from "next/headers"
import { KapitalTeks } from "../../../../lib/public/fnc"
import Parent from "./parent"
import { redirect } from "next/navigation"

const dataoke = {
    title: KapitalTeks(`kecimol anda yang sudah terdaftar di kecimol.com`),
    description: KapitalTeks("lihat semua kecimol yang anda daftarkan di kecimol.com"),
    keywords: 'daftarkan kecimol, kecimol lombok, lombok kecimol, kecimol ntb, daftar kecimol'
}
export const metadata = {
    ...dataoke,
    robots: {
        index: false,
        follow: false,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/me`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/dikelola.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/me`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

async function userAmbilSemuaKecimolDong(token, agent) {
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
    const okebaru = await userAmbilSemuaKecimolDong(tokennya, agentnya)
    const hasildata = { datakecimol: [] }
    if (okebaru && okebaru.status === 200) {
        const jarinah = await okebaru.json()
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
                okebaru && okebaru.status === 200 ?
                    <Parent kecimol={hasildata.datakecimol} />
                    : null
            }
        </>
    )
}
