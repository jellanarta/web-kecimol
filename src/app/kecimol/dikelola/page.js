import { redirect } from "next/navigation"
import { KapitalTeks } from "../../../../lib/public/fnc"
import { cookies } from "next/headers"
import { headers } from "next/headers"
import Parent from "./parent"
const dataoke = {
    title: KapitalTeks('daftar kecimol yang di kelola'),
    description: KapitalTeks('kecimol yang anda kelola beserta undangan yang di kirimkan ke akun anda untuk menjadi pengelola dari sebuah kecimol'),
    keywords: 'pengelola kecimol, undangan pengelola kecimol, cara jadi pengelola kecimol, daftar pengelola kecimol'
}
export const metadata = {
    title: dataoke.title,
    description: dataoke.description,
    keywords: dataoke.keywords,
    robots: {
        index: false,
        follow: false,
        nocache: true
    },
    alternates: {
        canonical: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/dikelola`,
        languages: {
            'id-ID': '/id-ID',
        },
    },
    openGraph: {
        title: dataoke.title,
        description: dataoke.description,
        images: '/dikelola.jpg',
        url: `${process.env.NEXT_PUBLIC_CLIENT}/kecimol/dikelola`,
        type: 'article',
        locale: 'id_ID',
        authors: process.env.NEXT_PUBLIC_AUTHOR
    },
}

async function userMengambilKecimolYangDiKelola(token, agent) {
    return fetch(`${process.env.NEXT_PUBLIC_SERVER}/pengelola-kecimol/user`, {
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
    const hasil = await userMengambilKecimolYangDiKelola(tokennya, agentnya)

    const hasildata = { datakecimol: [] }
    if (hasil && hasil.status === 200) {
        const jarinah = await hasil.json()
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
                    <Parent dikelola={hasildata.datakecimol} />
                    : null
            }
        </>
    )
}
